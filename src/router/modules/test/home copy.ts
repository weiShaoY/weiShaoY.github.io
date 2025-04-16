const one: RouterType.BlogRouteRecordRaw = {
  path: '/blog/one',
  name: 'one',
  component: () => import('@/pages/test/home/index.vue'),
  meta: {
    title: '一级单页',
    icon: 'blog-menu-react',
    textBadge: 'new',
    order: 0,
  },

}

export default one
