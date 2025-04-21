const aaa: RouterType.BlogRouteRecordRaw = {
  path: 'aaa',
  name: 'Aaa',
  meta: {
    title: 'aa',
    icon: 'blog-menu-vue',
    textBadge: 'new',
    order: 2,
  },
  children: [
    {
      path: 'index1',
      name: 'AaaIndex',
      component: () => import('@/pages/blog/home/index.vue'),
      meta: {
        title: 'aaa-1',
        icon: 'blog-menu-vue',
        textBadge: 'new',
        order: 0,
      },
    },
    {
      path: 'index2',
      name: 'AaaIndex2',
      meta: {
        title: 'aaa-2',
        icon: 'blog-menu-vue',
        textBadge: 'new',
        order: 0,
      },
      children: [
        {
          path: 'index3',
          name: 'AaaIndex3',
          component: () => import('@/pages/blog/aaa/index.vue'),
          meta: {
            title: 'aaa-3',
            icon: 'blog-menu-vue',
            textBadge: 'new',
            order: 6,
          },
        },
        {
          path: 'index4',
          name: 'AaaIndex4',
          component: () => import('@/pages/blog/aaa/index.vue'),
          meta: {
            title: 'aaa-4',
            icon: 'blog-menu-vue',
            textBadge: 'new',
            order: 1,
          },
        },
      ],
    },
  ],
}

export default aaa
