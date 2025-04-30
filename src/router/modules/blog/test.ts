const Test: RouterType.BlogRouteRecordRaw = {
  path: 'blog-test',
  name: 'BlogTest',
  meta: {
    title: '测试',
    icon: 'blog-menu-test',
    order: 999,
  },

  children: [
    {
      path: 'api',
      name: 'Api',
      meta: {
        title: '接口',
        icon: 'blog-menu-api',
      },
      component: () => import('@/pages/blog/test/api/index.vue'),
    },
    {
      path: 'component',
      name: 'Component',
      meta: {
        title: '组件',
        icon: 'blog-menu-component',
      },
      component: () => import('@/pages/blog/test/component/index.vue'),
    },

  ],
}

export default Test
