/**
 * 默认布局类型
 */
declare namespace LayoutConfigType {

  /**
   *  默认布局配置
   */
  type Default = {

    /**
     *  头部高度
     */
    headerHeight: number

    /**
     *  头部路由列表
     */
    headerRouterList: CommonType.Option<string, {

      /**
       *  是否只在PC端显示
       */
      isPCOnly?: boolean

      /**
       *  是否只在开发环境显示
       */
      isDevelopmentOnly?: boolean

    }>[]

  }

  /**
   *  指挥台布局配置
   */
  type Police = {

    /**
     *  头部高度
     */
    headerHeight: number
  }
}
