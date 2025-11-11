/**
 * 首页模块命名类型
 */
declare namespace HomeType {

  /**
   *  标签类型
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

    /**
     *  是否通过a标签跳转
     */
    isAnchorLink?: boolean
  }>
}
