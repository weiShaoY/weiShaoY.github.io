/**
 *  布局配置
 */
export const layoutConfig: ConfigType.Layout = {
  default: {
    headerHeight: 80,
    headerRouterList: [
      {
        value: '/home',
        label: 'Home',
      },
      {
        value: '/work',
        label: 'Work',
      },
      {
        value: '/contact',
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
        value: '/police',
        label: 'Police',
        isPCOnly: true,
      },

      {
        value: '/test',
        label: 'Test',
        isDevelopmentOnly: true,
      },
    ],
  },
  police: {
    headerHeight: 80,
  },
}
