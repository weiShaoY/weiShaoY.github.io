/**
 *  首页配置类型
 */
type HomeConfigType = {

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

export const homeConfig: HomeConfigType = {
  headerRouterList: [
    {
      value: '/home/about',
      label: 'About',
    },
    {
      value: '/home/work',
      label: 'Work',
    },
    {
      value: '/home/contact',
      label: 'Contact',
    },
    {
      value: '/blog',
      label: 'Blog',
    },

    {
      value: '/garage',
      label: 'Garage',
    },
    {
      value: '/bigScreen',
      label: 'BigScreen',
    },
    {
      value: '/command-login',
      label: 'Command',
      isPCOnly: true,
    },
    {
      value: '/test',
      label: 'Test',
      isDevelopmentOnly: true,
    },
  ],
}
