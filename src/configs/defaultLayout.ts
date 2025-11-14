/**
 *  默认布局配置
 */
export const defaultLayoutConfig: LayoutType.DefaultLayoutConfig = {
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
      value: '/police',
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
