const Test: RouterType.AdminRoute = {
  path: 'admin-test',
  name: 'AdminTest',
  meta: {
    title: '测试',
    icon: 'admin-menu-test',
    order: 999,
  },

  children: [
    {
      path: 'api',
      name: 'Api',
      meta: {
        title: '接口',
        icon: 'admin-menu-api',
        fastMenuOrder: 10,
      },
      component: () => import('@/pages/admin/test/api/index.vue'),
    },
    {
      path: 'component',
      name: 'Component',
      meta: {
        title: '组件',
        icon: 'admin-menu-component',
      },
      component: () => import('@/pages/admin/test/component/index.vue'),
    },

  ],
}

export default Test
