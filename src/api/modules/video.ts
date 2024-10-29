import { FetchRequest } from '@/api'

/**
 * videoApi
 */
const videoApi = {

  get(
    partialUrl: string,
    query?: Record<string, any>,
  ) {
    return FetchRequest.get(partialUrl, query)
  },

  delete(partialUrl: string, query?: Record<string, any>) {
    return FetchRequest.delete(partialUrl, query)
  },

  post(partialUrl: string, body?: any, query?: Record<string, any>) {
    return FetchRequest.post(partialUrl, query, body)
  },

  put(partialUrl: string, body?: any) {
    return FetchRequest.put(partialUrl, undefined, body)
  },
}

export default videoApi
