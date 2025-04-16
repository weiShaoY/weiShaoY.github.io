const home: RouterType.BlogRouteRecordRaw = {
  path: '/blog/home',
  name: 'Home',

  // component: () => import('@/pages/test/home/index.vue'),
  meta: {
    title: '首页',
    icon: 'blog-menu-workbench',
    textBadge: 'new',
    order: 0,
  },
  children: [
    {
      path: '/blog/home/index',
      name: 'HomeIndex',
      component: () => import('@/pages/test/home/index.vue'),
      meta: {
        title: '首页-1',
        icon: 'blog-menu-workbench',
        textBadge: 'new',
        order: 0,
      },
    },
  ],
}

export default home
