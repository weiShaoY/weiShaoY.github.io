/**
 * 首页模块类型
 */
declare namespace HomeType {

  /**
   *  头部路由
   */
  type HeaderRouter = CommonType.Option<string, {

    /**
     *  是否只在PC端显示
     */
    isPCOnly?: boolean

    /**
     *  是否只在开发环境显示
     */
    isDevelopmentOnly?: boolean

  }>

  /**
   *  首页配置
   */
  type Config = {

    /**
     *  头部高度
     */
    headerHeight: number

    /**
     *  头部路由列表
     */
    headerRouterList: HeaderRouter[]
  }
}
