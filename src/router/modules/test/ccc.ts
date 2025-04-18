const ccc: RouterType.BlogRouteRecordRaw = {
  path: 'ccc',
  name: 'ccc',
  meta: {
    title: '首页',
    icon: 'blog-menu-workbench',
    textBadge: 'new',
    order: 4,
  },
  children: [
    {
      path: 'index',
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

export default ccc
