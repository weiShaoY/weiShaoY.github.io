/**
 * 博客模块命名类型
 */
declare namespace BlogType {

  /**
   *  标签类型
   */
  type Tab = {

    /** 标签页标题 */
    title: string

    /** 路由路径 */
    path: string

    /** 路由名称 */
    name: string

    /** 是否保持页面状态 */
    keepAlive: boolean

    /** 路由参数 */
    params?: Record<string, any>

    /** 路由查询参数 */
    query?: Record<string, any>
  }
}
