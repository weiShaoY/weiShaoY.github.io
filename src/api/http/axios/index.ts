import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import type { Result } from './type'

import axios from 'axios'

import { ResultEnum } from './type'

// 定义错误类型
type HttpError = {
  status?: number
  code?: string | number
  data?: any
} & Error

// 定义请求配置类型
type RequestConfig = {
  showError?: boolean // 是否显示错误提示
  retry?: number // 重试次数
  retryDelay?: number // 重试延迟
} & AxiosRequestConfig

/**
 *  创建 axios 实例
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/**
 * 错误处理函数
 * @param {AxiosError<Result>} error - 错误对象
 * @returns {HttpError} - 自定义错误对象
 */
function handleError(error: AxiosError<Result>): HttpError {
  const { response, message } = error || {
  }

  const errMsg = response?.data?.message || message || '操作失败,系统异常!'

  const status = response?.status

  // 创建自定义错误对象
  const httpError: HttpError = new Error(errMsg)

  httpError.status = status
  httpError.code = response?.data?.code // 修复后不会报错
  httpError.data = response?.data

  // 显示错误通知
  window.$notification.error({
    title: '错误',
    message: errMsg,
  })

  // 处理特定状态码
  if (status === 401) {
    // userStore.getState().actions.clearUserInfoAndToken();
  }

  return httpError
}

/**
 * 请求拦截器：在请求被发送之前执行一些操作
 * @param {AxiosRequestConfig} config - 请求配置对象
 * @returns {AxiosRequestConfig} - 修改后的请求配置对象
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求被发送之前做些什么
    config.headers.Authorization = 'Bearer Token'
    return config
  },
  (error) => {
    // 请求错误时做些什么
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器：处理响应数据和错误
 * @param {AxiosResponse<Result>} res - 响应对象
 * @returns {any} - 处理后的响应数据
 * @throws {Error} - 请求失败或业务逻辑错误
 */
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) {
      throw new Error('请求出错,请稍后再试')
    }

    const { status, data, message } = res.data

    // 业务请求成功
    const hasSuccess = data && Reflect.has(res.data, 'status') && status === ResultEnum.SUCCESS

    if (hasSuccess) {
      return data
    }

    // 业务请求错误
    throw new Error(message || '请求出错,请稍后再试')
  },

  /**
   * 错误处理：处理 HTTP 错误
   * @param {AxiosError<Result>} error - 错误对象
   * @returns {Promise<never>} - 被拒绝的 Promise
   */
  (error: AxiosError<Result>) => Promise.reject(handleError(error)),
)

/**
 * API 客户端类，封装常用的 HTTP 请求方法
 */
class AxiosHttp {
  /**
   * 发送请求
   * @template T - 响应数据类型
   * @param {RequestConfig} config - 请求配置
   * @returns {Promise<T>} - 响应数据
   */
  private async request<T = any>(config: RequestConfig): Promise<T> {
    const { retry = 0, retryDelay = 1000, showError = true } = config

    try {
      const response = await axiosInstance.request<any, AxiosResponse<Result>>(config)

      return response as unknown as T
    }
    catch (error) {
      // 重试逻辑
      if (retry > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        return this.request({
          ...config,
          retry: retry - 1,
        })
      }

      // 错误处理
      if (showError && error instanceof Error) {
        window.$notification.error({
          title: '请求失败',
          message: error.message,
        })
      }

      throw error
    }
  }

  /**
   * 发送 GET 请求
   * @template T - 响应数据类型
   * @param {RequestConfig} config - 请求配置
   * @returns {Promise<T>} - 响应数据
   */
  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET',
    })
  }

  /**
   * 发送 POST 请求
   * @template T - 响应数据类型
   * @param {RequestConfig} config - 请求配置
   * @returns {Promise<T>} - 响应数据
   */
  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST',
    })
  }

  /**
   * 发送 PUT 请求
   * @template T - 响应数据类型
   * @param {RequestConfig} config - 请求配置
   * @returns {Promise<T>} - 响应数据
   */
  put<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PUT',
    })
  }

  /**
   * 发送 DELETE 请求
   * @template T - 响应数据类型
   * @param {RequestConfig} config - 请求配置
   * @returns {Promise<T>} - 响应数据
   */
  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE',
    })
  }
}

export default new AxiosHttp()
