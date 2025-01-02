import { Notification } from '@arco-design/web-vue'

// 定义接口响应类型
type ApiResponse<T = any> = {
  code?: number | string
  status?: number | string
  message?: string
  data?: T
}

// 定义 fetchHttp 函数参数类型
type FetchHttpOptions = {
  timeout?: number
} & RequestInit

/**
 * 通用 fetch 请求封装
 * @param {string} url - 请求的 URL
 * @param {FetchHttpOptions} [options] - 可选的 fetch 配置选项
 * @returns {Promise<any>} 返回解析后的数据
 * @throws 如果发生 HTTP 错误或接口响应码无效
 */
export async function fetchHttp(
  url: string,
  options: FetchHttpOptions = {
  },
): Promise<any> {
  const { timeout = 5000, ...fetchOptions } = options

  const controller = new AbortController()

  const id = setTimeout(() => controller.abort(), timeout)

  fetchOptions.signal = controller.signal

  try {
    const response = await fetch(url, fetchOptions)

    // 清除超时定时器
    clearTimeout(id)

    // 检查响应状态是否正常
    if (!response.ok) {
      throw new Error(`HTTP 错误！状态码: ${response.status}`)
    }

    // 解析 JSON 数据（如果无法解析则返回原始内容）
    const result: ApiResponse = await response.json().catch(() => response)

    if (result) {
      // 检查接口响应码是否有效

      if (result.data) {
        return result.data
      }

      return result
    }
    else {
      throw new Error('接口响应数据无效')
    }
  }
  catch (error: any) {
    // 检查是否为跨域错误
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('跨域请求错误:', error)

      Notification.error({
        title: '跨域请求错误,请检查当前接口',
        content: `接口地址为${url}`,
        duration: 10000,
      })
    }
    else {
      console.error('接口请求错误:', error)
      Notification.error(`接口请求失败: ${error.message || '未知错误'}`)
    }

    throw error // 确保调用方可以捕获到错误
  }
}
