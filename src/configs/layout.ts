/**
 *  布局配置
 */
export const layoutConfig: {
  default: LayoutConfigType.Default
  police: LayoutConfigType.Police
} = {
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
        value: '/emoji',
        label: 'Emoji',
      },
      {
        value: '/police',
        label: 'Police',
        isPCOnly: true,
      },
      {
        value: '/admin',
        label: 'Admin',
        isPCOnly: true,
      },
      {
        value: '/test',
        label: 'Test',
        isDevelopmentOnly: true,
      },
      {
        value: '/tool',
        label: 'Tool',
        isPCOnly: true,
        isDevelopmentOnly: true,
      },
    ],
  },
  police: {
    headerHeight: 80,
  },
}
