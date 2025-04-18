const one: RouterType.BlogRouteRecordRaw = {
  path: 'bbb',
  name: 'bbb',
  component: () => import('@/pages/test/home/index.vue'),
  meta: {
    title: '一级单页',
    icon: 'blog-menu-react',
    textBadge: 'new',
    order: 3,
  },

}

export default one
