/**
 * 接口响应类型
 */
type ApiResponse<T = any> = {
  code?: number | string
  status?: number
  message?: string
  data?: T
}

/**
 * 请求配置类型
 */
type RequestOptions = {

  /**
   * 是否显示错误提示
   */
  showError?: boolean
} & RequestInit

/**
 * 检查接口响应码是否有效
 * @param {ApiResponse} result - 接口返回的结果
 * @returns {boolean} 是否为有效响应码
 */
// function isValidResponseCode(result: ApiResponse): boolean {
//   const validCodes = [200, '200', 1, 0]

//   const errorCodes = [500]

//   const code = result?.code

//   const status = result?.status

//   return (
//     (code !== undefined && validCodes.includes(code))
//     || (status !== undefined && (validCodes.includes(status) || errorCodes.includes(status)))
//   )
// }

/**
 * 通用 fetch 请求封装
 * @param {string} url - 请求的 URL
 * @param {RequestOptions} [options] - 可选的请求配置
 * @returns {Promise<T>} 返回解析后的数据
 * @throws {Error} 当请求失败或响应无效时抛出错误
 */
export async function fetchHttp<T = any>(
  url: string,
  options: RequestOptions = {
  },
): Promise<T> {
  const { showError = true, ...fetchOptions } = options

  try {
    // 发起请求
    const response = await fetch(url, fetchOptions)

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP 错误！状态码: ${response.status}`)
    }

    // 解析响应数据
    const result = await response.json().catch(() => response) as ApiResponse<T>

    // 检查响应码
    // if (!isValidResponseCode(result)) {
    //   const errorMessage = result.message || `接口响应码错误: ${result.code || '未知'}`

    //   if (showError) {
    //     window.$notification.error(errorMessage)
    //   }

    //   throw new Error(errorMessage)
    // }

    // 返回数据
    return (result.data || result) as T
  }
  catch (error) {
    console.error('接口请求错误:', error)

    if (showError && error instanceof Error) {
      window.$notification.error(`请求失败: ${error.message || error}`)
    }

    throw error
  }
}
