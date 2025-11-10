import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

import axios from 'axios'

/**
 * API 请求结果接口
 * @template T 返回数据的类型，默认为 `any`
 */
export type Result<T = any> = {

  /**
   * 状态码
   */
  status: ResultEnum

  /**
   * 响应消息
   */
  message: string

  /**
   * 响应数据（可选）
   */
  data?: T

  code: number | string
}

/**
 * @enum {number} ResultEnum
 * @description 请求结果枚举，用于表示请求的返回状态
 */
export enum ResultEnum {

  /**
   * 成功
   */
  SUCCESS = 0,

  /**
   * 错误
   */
  ERROR = -1,

  /**
   * 超时（未授权或登录失效）
   */
  TIMEOUT = 401,
}

// 定义更详细的错误类型
export type HttpError = {
  status?: number
  code?: string | number
  data?: any
  isAxiosError?: boolean
  isBusinessError?: boolean
  isNetworkError?: boolean
  isServerError?: boolean
} & Error

// 业务错误码枚举
export enum BusinessErrorCode {
  SUCCESS = 0,
  ERROR = -1,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

// 错误消息映射
const ERROR_MESSAGES: Record<number | string, string> = {
  [BusinessErrorCode.UNAUTHORIZED]: '请重新登录',
  [BusinessErrorCode.FORBIDDEN]: '没有权限执行此操作',
  [BusinessErrorCode.SERVER_ERROR]: '服务器开小差了，请稍后再试',
  NETWORK_ERROR: '网络连接超时或服务器无响应',
  REQUEST_ERROR: '请求发送失败',
}

// 定义请求配置类型
export type RequestConfig = {
  showError?: boolean // 是否显示错误提示
  retry?: number // 重试次数
  retryDelay?: number // 重试延迟
} & AxiosRequestConfig

// 常量与配置
const DEFAULT_TIMEOUT = 60000 // 默认超时时间

const DEFAULT_RETRY_COUNT = 0

const DEFAULT_RETRY_DELAY = 1000

// 创建取消令牌的 Map
const pendingRequests = new Map<string, AbortController>()

// 生成请求的唯一 key
function generateRequestKey(config: InternalAxiosRequestConfig) {
  const { url, method, params, data } = config

  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 创建 HTTP 错误对象
function createHttpError(message: string, options: Partial<HttpError> = {
}): HttpError {
  const error = new Error(message) as HttpError

  Object.assign(error, options)
  return error
}

// 请求重试策略
function getRetryDelay(retryCount: number, retryDelay: number): number {
  return retryDelay * 2 ** retryCount // 指数退避
}

/**
 * 获取动态认证 Token 的函数类型
 * 你需要实现这个函数来从你的状态管理或其他地方获取 token
 */
type GetAuthorizationToken = () => string | null

// 假设的 getToken 函数, 你需要替换成你的实际实现
const getAuthToken: GetAuthorizationToken = () => {
  // 例如: return localStorage.getItem('authToken') || userStore.token
  return 'Bearer HardcodedTokenForNow' // 示例: 先用硬编码的 token
}

/**
 * 创建 Axios 实例
 */
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })

  // --- 拦截器 ---
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const requestKey = generateRequestKey(config)

      // 如果存在相同的请求，取消之前的
      if (pendingRequests.has(requestKey)) {
        const controller = pendingRequests.get(requestKey)

        controller?.abort()
        pendingRequests.delete(requestKey)
      }

      // 创建新的取消令牌
      const controller = new AbortController()

      config.signal = controller.signal
      pendingRequests.set(requestKey, controller)

      const token = getAuthToken()

      if (token && config.headers) {
        config.headers.Authorization = token
      }

      return config
    },
    (error: AxiosError) => {
      window.$notification.error('Request Error:')
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (response: AxiosResponse<Result>) => {
      const resData = response.data

      if (!resData) {
        throw createHttpError('响应数据为空', {
          status: response.status,
        })
      }

      const { code, data, message } = resData

      if (code === BusinessErrorCode.SUCCESS) {
        return data || {
        }
      }

      // 业务错误处理
      const error = createHttpError(message || '业务处理失败', {
        code,
        status: response.status,
        data,
        isBusinessError: true,
      })

      // 特殊业务错误码处理
      if (code === BusinessErrorCode.UNAUTHORIZED) {
        // 可以在这里处理登出逻辑
        // store.dispatch('user/logout')
      }

      throw error
    },
    (error: AxiosError<Result>) => {
      const httpError = createHttpError(
        error.message || '网络请求失败',
        {
          status: error.response?.status,
          code: error.response?.data?.code,
          data: error.response?.data,
          isAxiosError: true,
        },
      )

      if (error.response) {
        const { status, data: errorData } = error.response

        httpError.message = errorData?.message || ERROR_MESSAGES[status] || error.message

        if (status >= 500) {
          httpError.isServerError = true
        }
      }
      else if (error.request) {
        httpError.message = ERROR_MESSAGES.NETWORK_ERROR
        httpError.isNetworkError = true
      }

      return Promise.reject(httpError)
    },
  )

  return instance
}

const axiosInstance = createAxiosInstance()

/**
 * API 客户端类，封装常用的 HTTP 请求方法
 */
class AxiosHttp {
  /**
   * 内部通用请求方法，包含重试逻辑
   * @template T - 响应数据中 `data` 字段的类型
   * @param {RequestConfig} config - 请求配置
   * @returns {Promise<T>} - 成功时返回业务数据 (res.data.data)
   */
  private async request<T = any>(config: RequestConfig): Promise<T> {
    const { retry = DEFAULT_RETRY_COUNT, retryDelay = DEFAULT_RETRY_DELAY, showError = true, ...axiosConfig } = config

    try {
      const responseData = await axiosInstance.request<any, T>(axiosConfig)

      return responseData
    }
    catch (error) {
      const castError = error as HttpError

      // 重试逻辑
      if (retry > 0) {
        const delay = getRetryDelay(retry, retryDelay)

        await new Promise(resolve => setTimeout(resolve, delay))
        return this.request<T>({
          ...config,
          retry: retry - 1,
        })
      }

      if (showError) {
        window.$notification?.error({
          title: '请求处理失败',
          message: castError.message || '未知错误',
        })
      }

      throw castError
    }
  }

  /**
   * 发送 GET 请求
   * @template T - 响应数据类型 (res.data.data)
   * @param {string} url - 请求 URL
   * @param {object} [params] - URL 查询参数
   * @param {RequestConfig} [config] - 其他 Axios 配置 (如 headers, showError, retry)
   * @returns {Promise<T>} - 业务数据
   * @example
   * // 同时传递 params 和其他 config
   * http.get('/users', { status: 'active' }, { showError: false });
   */
  public get<T = any>(url: string, params?: object, config?: Omit<RequestConfig, 'params' | 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      url,
      params,
      ...config,
      method: 'GET',
    })
  }

  /**
   * 发送 POST 请求
   * @template T - 响应数据类型 (res.data.data)
   * @param {string} url - 请求 URL
   * @param {object} [data] - 请求体数据
   * @param {object} [params] - URL 查询参数 (可选, POST 请求通常不带 query params, 但 Axios 支持)
   * @param {RequestConfig} [config] - 其他 Axios 配置
   * @returns {Promise<T>} - 业务数据
   * @example
   * // 同时传递 data (body) 和 params (query)
   * http.post('/users', { name: 'John' }, { role: 'police' }, { headers: { 'X-Custom': 'value' } });
   */
  public post<T = any>(url: string, data?: object, params?: object, config?: Omit<RequestConfig, 'data' | 'params' | 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      url,
      data,
      params,
      ...config,
      method: 'POST',
    })
  }

  /**
   * 发送 PUT 请求
   * @template T - 响应数据类型 (res.data.data)
   * @param {string} url - 请求 URL
   * @param {object} [data] - 请求体数据
   * @param {object} [params] - URL 查询参数
   * @param {RequestConfig} [config] - 其他 Axios 配置
   * @returns {Promise<T>} - 业务数据
   */
  public put<T = any>(url: string, data?: object, params?: object, config?: Omit<RequestConfig, 'data' | 'params' | 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      url,
      data,
      params,
      ...config,
      method: 'PUT',
    })
  }

  /**
   * 发送 DELETE 请求
   * @template T - 响应数据类型 (res.data.data)
   * @param {string} url - 请求 URL
   * @param {object} [params] - URL 查询参数
   * @param {RequestConfig} [config] - 其他 Axios 配置
   * @returns {Promise<T>} - 业务数据
   */
  public delete<T = any>(url: string, params?: object, config?: Omit<RequestConfig, 'params' | 'url' | 'method'>): Promise<T> {
    return this.request<T>({
      url,
      params,
      ...config,
      method: 'DELETE',
    })
  }

  /**
   * 上传文件
   * @template T - 响应数据类型
   * @param {string} url - 上传 URL
   * @param {FormData} formData - 表单数据，通常包含文件
   * @param {RequestConfig} [config] - 其他 Axios 配置，会自动覆盖 Content-Type
   * @returns {Promise<T>} - 业务数据
   */
  public upload<T = any>(url: string, formData: FormData, config?: Omit<RequestConfig, 'data' | 'url' | 'method' | 'headers'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
  }

  /**
   * 并发请求
   * @param requests 请求配置数组
   * @returns Promise<Array<T>>
   */
  public all<T = any>(requests: RequestConfig[]): Promise<T[]> {
    return Promise.all(requests.map(config => this.request<T>(config)))
  }

  /**
   * 带超时的请求
   * @param config 请求配置
   * @param timeout 超时时间(ms)
   */
  public timeout<T = any>(config: RequestConfig, timeout: number): Promise<T> {
    return this.request<T>({
      ...config,
      timeout,
    })
  }

  /**
   * 带进度监控的上传
   * @param url 上传地址
   * @param formData 表单数据
   * @param onProgress 进度回调
   * @param config 其他配置
   */
  public uploadWithProgress<T = any>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void,
    config?: Omit<RequestConfig, 'data' | 'url' | 'method' | 'headers'>,
  ): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)

          onProgress(progress)
        }
      },
      ...config,
    })
  }

  /**
   * 取消请求
   * @param config 请求配置
   */
  public cancelRequest(config: RequestConfig): void {
    const requestKey = generateRequestKey(config as InternalAxiosRequestConfig)

    const controller = pendingRequests.get(requestKey)

    if (controller) {
      controller.abort()
      pendingRequests.delete(requestKey)
    }
  }

  /**
   * 取消所有请求
   */
  public cancelAllRequests(): void {
    pendingRequests.forEach(controller => controller.abort())
    pendingRequests.clear()
  }
}

export default new AxiosHttp()

// 并发请求
// const [users, posts] = await http.all([
//   { url: '/users', method: 'GET' },
//   { url: '/posts', method: 'GET' }
// ])

// // 带进度监控的上传
// await http.uploadWithProgress(
//   '/upload',
//   formData,
//   (progress) => {
//     console.log(`上传进度: ${progress}%`)
//   }
// )

// // 带超时的请求
// const data = await http.timeout(
//   { url: '/api/data', method: 'GET' },
//   5000 // 5秒超时
// )

// // 取消请求
// http.cancelRequest({ url: '/api/data', method: 'GET' })

// // 取消所有请求
// http.cancelAllRequests()
