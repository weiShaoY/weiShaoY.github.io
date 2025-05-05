import type {
  AxiosError,

  AxiosRequestConfig,
  AxiosResponse,

} from 'axios'

import axios from 'axios'

/**
 * 比较两个字符串是否相等，不区分大小写
 * @param  str1 - 第一个字符串
 * @param  str2 - 第二个字符串
 * @returns   如果相等返回 true，否则返回 false
 */
export function isCaseInsensitiveEqual(str1?: any, str2?: any) {
  if (!str1 || !str2) {
    return false
  }

  return str1.toLowerCase() === str2.toLowerCase()
}

/**
 * 检查响应代码是否表示错误
 * @param  resCode - 响应代码
 * @returns  如果是 404 或 403，返回 true，否则返回 false
 */
export function isErrorCode(resCode: number) {
  return [404, 403].includes(resCode)
}

/**
 * 定义常用的正则表达式枚举
 */
export const regEnum = {
  subtitle: /(中文|字幕|subtitle)/,
  leakage: /(无码|無碼|泄漏|Uncensored)/,
}

// 保持原样的 TResponse 类型
type TResponse = {

  /**
   *  响应头信息，以字符串形式表示，每个头信息占一行。
   */
  readonly responseHeaders: string

  /**
   *  请求的状态码，具体值取决于底层实现。
   */
  readonly readyState: 0 | 1 | 2 | 3 | 4

  /**
   *  响应数据，可能是字符串、JSON 对象或其他格式。
   */
  readonly response: any

  /**
   *  响应文本，通常是字符串形式的响应内容。
   */
  readonly responseText: string

  /**
   *  响应的 XML 文档对象，仅当响应内容是 XML 时可用。
   */
  readonly responseXML: Document | null

  /**
   *  响应的状态码，通常是 HTTP 状态码。
   */
  readonly status: number

  /**
   *  响应的状态文本，通常是 HTTP 状态码的描述。
   */
  readonly statusText: string

  /**
   *  最终的 URL，可能是重定向后的 URL。
   */
  readonly finalUrl: string
}

/**
 * 转换 axios 响应为 GM_xmlhttpRequest 格式
 */
function transformAxiosResponse(axiosResponse: AxiosResponse): TResponse {
  console.log('%c Line:58 🍑 axiosResponse', 'color:#2eafb0', axiosResponse)

  // 尝试解析 XML（如果响应内容是 XML）
  const parseXML = (text: string): Document | null => {
    if (typeof DOMParser === 'undefined' || !text || !text.trim().startsWith('<')) {
      return null
    }

    try {
      const parser = new DOMParser()

      return parser.parseFromString(text, 'text/xml')
    }
    catch {
      return null
    }
  }

  const responseText = typeof axiosResponse.data === 'string'
    ? axiosResponse.data
    : JSON.stringify(axiosResponse.data)

  return {
    responseHeaders: Object
      .entries(axiosResponse.headers)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\r\n'),
    readyState: 4,
    response: axiosResponse.data,
    responseText,
    responseXML: parseXML(responseText),
    status: axiosResponse.status,
    statusText: axiosResponse.statusText,
    finalUrl: axiosResponse.request?.responseURL || axiosResponse.config.url || '',
  }
}

/**
 * 转换 axios 错误为 GM_xmlhttpRequest 格式
 */
function transformAxiosError(error: AxiosError): TResponse {
  if (error.response) {
    const transformed = transformAxiosResponse(error.response)

    return {
      ...transformed,
      readyState: 4, // 服务器有响应，所以 readyState 是 4
    }
  }

  return {
    responseHeaders: '',
    readyState: 0,
    response: error.message,
    responseText: error.message,
    responseXML: null,
    status: 0,
    statusText: error.message || 'Network Error',
    finalUrl: error.config?.url || '',
  }
}

/**
 * 发送 GET 请求 (axios 实现)
 * @param params - 请求参数对象
 * @param params.url - 请求的 URL
 * @returns 返回包含响应的 Promise 对象
 */
export async function gmGet({ url }: { url: string }): Promise<TResponse> {
  const config: AxiosRequestConfig = {
    transformResponse: [data => data], // 防止自动转换
    validateStatus: () => true, // 不根据状态码拒绝 promise
    responseType: 'text', // 确保获取原始响应数据
  }

  /**
   *  CORS-Anywhere
   *  (先访问其主页并点击授权按钮，才能临时启用代理功能) (https://cors-anywhere.herokuapp.com/)
   */
  // const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`

  /**
   *  AllOrigins
   */
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`

  /**
   *  ThingProxy  (最快)
   */
  // const proxyUrl = `https://thingproxy.freeboard.io/fetch/${url}`

  return await axios.get(proxyUrl, config)
    .then(transformAxiosResponse)
    .catch((error) => {
    // 确保总是抛出 TResponse 类型的错误
      throw transformAxiosError(error)
    })
}

export function tagsQuery({
  leakageText,
  subtitleText,
}: {
  leakageText: string
  subtitleText: string
}) {
  const hasLeakage = regEnum.leakage.test(leakageText)

  const hasSubtitle = regEnum.subtitle.test(subtitleText)

  const tags = []

  if (hasLeakage) {
    tags.push('无码')
  }

  if (hasSubtitle) {
    tags.push('字幕')
  }

  return tags.join(' ')
}
