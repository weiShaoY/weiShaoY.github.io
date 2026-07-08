/**
 * 配置模块命名类型
 */
declare namespace ConfigType {

  /**
   *  全局配置
   */
  type Setting = {

    /**
     *  是否暗黑模式
     */
    isDark: boolean

  }

  /**
   * 布局配置
   */
  type Layout = {

    /**
     *  默认布局配置
     */
    default: {

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

        /**
         *  是否在新标签页打开
         */
        isNewTab?: boolean

      }>[]
    }

    /**
     *  指挥台布局配置
     */
    police: {

      /**
       *  头部高度
       */
      headerHeight: number
    }
  }

}
