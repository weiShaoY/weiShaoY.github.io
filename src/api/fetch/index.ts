const baseUrl = 'url地址'

/**
 * 将参数对象转换为查询字符串
 * @param {Record<string, any>} params - 需要转换的参数对象
 * @returns {string} - 生成的查询字符串
 */
function queryString(params: Record<string, any>): string {
  return `?${Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')}`
}

/**
 * 通用请求函数
 * @param {string} partialUrl - 请求的部分 URL
 * @param {Record<string, any>} [query] - 查询参数
 * @param {any} [body] - 请求体数据
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} [method] - HTTP 请求方法
 * @param {'cors' | 'no-cors' | 'same-origin' | undefined} [mode] - 跨域模式
 * @param {string} [contentType] - 请求的内容类型
 * @returns {Promise<any>} - 返回解析后的响应 JSON
 */
function request(
  partialUrl: string,
  query?: Record<string, any>,
  body?: any,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  mode: 'cors' | 'no-cors' | 'same-origin' | undefined = 'cors',
  contentType: string = 'application/json',
) {
  const needContentType = ['POST', 'PUT'].includes(method.toUpperCase())

  const url = baseUrl + partialUrl + (query ? queryString(query) : '')

  return new Promise((resolve, reject) =>
    fetch(url, {
      method,
      mode: mode as RequestMode,
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
      headers: {
        ...(needContentType ? { 'Content-Type': contentType } : {}),
      },
    })
      .then(response => response.json().then(resolve))
      .catch(reject),
  )
}

/**
 * Fetch 类，用于处理请求前后拦截器和发送请求
 */
class Fetch {
  before: (partialUrl: string, query?: Record<string, any>, body?: any) => void
  after: (partialUrl: string, query?: Record<string, any>, body?: any) => void

  constructor(
    before: (
      partialUrl: string,
      query?: Record<string, any>,
      body?: any,
    ) => void = () => {},
    after: (
      partialUrl: string,
      query?: Record<string, any>,
      body?: any,
    ) => void = () => {},
  ) {
    this.before = before
    this.after = after
  }

  _request(
    partialUrl: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    contentType: string = 'application/json',
    query?: Record<string, any>,
    body?: any,
    mode: 'cors' | 'no-cors' | 'same-origin' | undefined = 'cors',
  ) {
    if (this.before) {
      this.before(partialUrl, query, body)
    }

    const promise = request(partialUrl, query, body, method, mode, contentType)

    promise.finally(() => {
      if (this.after) {
        this.after(partialUrl, query, body)
      }
    })
    return promise
  }

  get(
    partialUrl: string,
    query?: Record<string, any>,
    contentType: string = 'application/json',
  ) {
    return this._request(partialUrl, 'GET', contentType, query)
  }

  delete(partialUrl: string, query?: Record<string, any>) {
    return this._request(partialUrl, 'DELETE', undefined, query)
  }

  post(
    partialUrl: string,
    query?: Record<string, any>,
    body?: any,
    contentType: string = 'application/json',
  ) {
    return this._request(partialUrl, 'POST', contentType, query, body)
  }

  put(
    partialUrl: string,
    query?: Record<string, any>,
    body?: any,
    contentType: string = 'application/json',
  ) {
    return this._request(partialUrl, 'PUT', contentType, query, body)
  }
}

/**
 * FetchApi 提供了一系列封装好的 HTTP 请求方法
 */
const FetchApi = {

  get(
    partialUrl: string,
    query?: Record<string, any>,
  ) {
    return new Fetch().get(partialUrl, query)
  },

  delete(partialUrl: string, query?: Record<string, any>) {
    return new Fetch().delete(partialUrl, query)
  },

  post(partialUrl: string, body?: any, query?: Record<string, any>) {
    return new Fetch().post(partialUrl, query, body)
  },

  put(partialUrl: string, body?: any) {
    return new Fetch().put(partialUrl, undefined, body)
  },
}

// GET 请求示例
FetchApi.get('/users', { page: 1, size: 10 })
  .then((response) => {
    console.log('GET 请求返回的数据:', response)
  })
  .catch((error) => {
    console.error('GET 请求失败:', error)
  })

// POST 请求示例
FetchApi.post('/users', { name: 'John', age: 30 })
  .then((response) => {
    console.log('POST 请求返回的数据:', response)
  })
  .catch((error) => {
    console.error('POST 请求失败:', error)
  })

// PUT 请求示例
FetchApi.put('/users/123', { active: true })
  .then((response) => {
    console.log('PUT 请求返回的数据:', response)
  })
  .catch((error) => {
    console.error('PUT 请求失败:', error)
  })

export default FetchApi
