/**
 * HTTP 类型
 */
declare namespace HttpType {

  /**
   *  基础接口返回的数据结构
   */
  type BaseResult<T = any> = {

    /**
     *  状态码
     */
    code: number

    /**
     *  消息
     */
    message: string

    /**
     *  数据
     */
    data: T

    /**
     *  可选字段，用于返回 token
     */
    token?: string
  }

}
