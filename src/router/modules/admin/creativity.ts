const creativityRoute: RouterType.AdminRoute = {
  path: 'creativity',
  name: 'Creativity',
  meta: {
    title: '创意',
    icon: 'admin-menu-creativity',
    keepAlive: false,
    order: 10,
  },
  children: [
    {
      path: 'clock',
      name: 'Clock',
      component: () => import('@/pages/admin/creativity/clock/index.vue'),
      meta: {
        title: '时钟',
        keepAlive: true,
        icon: 'admin-menu-clock',
      },
    },
    {
      path: 'muYu',
      name: 'MuYu',
      component: () => import('@/pages/admin/creativity/muYu/index.vue'),
      meta: {
        title: '木鱼',
        keepAlive: true,
        icon: 'admin-menu-muYu',
      },
    },
    {
      path: 'calendar',
      name: 'Calendar',
      component: () => import('@/pages/admin/creativity/calendar/index.vue'),
      meta: {
        title: '日历',
        keepAlive: true,
        icon: 'admin-menu-calendar',
      },
    },
  ],
}

export default creativityRoute
