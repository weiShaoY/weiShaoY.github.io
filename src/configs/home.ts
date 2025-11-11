/**
 *  首页配置类型
 */
type HomeConfigType = {

  /**
   *  头部路由列表
   */
  headerRouterList: HomeType.HeaderRouter[]
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
      value: '/admin',
      label: 'Admin',
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
      value: '/blog/',
      label: 'Blog',
      isPCOnly: true,
      isDevelopmentOnly: true,
      isAnchorLink: true,
    },
    {
      value: '/police-login',
      label: 'Police',
      isPCOnly: true,
      isDevelopmentOnly: true,
    },
    {
      value: '/test',
      label: 'Test',
      isDevelopmentOnly: true,
    },
  ],
}
