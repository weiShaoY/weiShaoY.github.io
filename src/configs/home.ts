/**
 *  默认布局配置
 */
export const defaultLayoutConfig: LayoutType.DefaultLayoutConfig = {
  headerHeight: 80,
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
      value: '/admin',
      label: 'Admin',
      isPCOnly: true,
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
