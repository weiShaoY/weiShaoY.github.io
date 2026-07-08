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
        isNewTab: true,
      },
      {
        value: '/bigScreen',
        label: 'BigScreen',
        isNewTab: true,
      },

      {
        value: '/police',
        label: 'Police',
        isPCOnly: true,
        isNewTab: true,
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
