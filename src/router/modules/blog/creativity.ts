const creativityRoute: RouterType.BlogRouteRecordRaw = {
  path: 'creativity',
  name: 'Creativity',
  meta: {
    title: '创意',
    icon: 'blog-menu-creativity',
    keepAlive: false,
    order: 10,
  },
  children: [
    {
      path: 'clock',
      name: 'Clock',
      component: () => import('@/pages/blog/creativity/clock/index.vue'),
      meta: {
        title: '时钟',
        keepAlive: true,
        icon: 'blog-menu-clock',
      },
    },
    {
      path: 'muYu',
      name: 'MuYu',
      component: () => import('@/pages/blog/creativity/muYu/index.vue'),
      meta: {
        title: '木鱼',
        keepAlive: true,
        icon: 'blog-menu-muYu',
      },
    },
    {
      path: 'calendar',
      name: 'Calendar',
      component: () => import('@/pages/blog/creativity/calendar/index.vue'),
      meta: {
        title: '日历',
        keepAlive: true,
        icon: 'blog-menu-calendar',
      },
    },
  ],
}

export default creativityRoute
