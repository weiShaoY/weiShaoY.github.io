const workbench: RouterType.BlogRouteRecordRaw = {
  path: 'workbench',
  name: 'Workbench',
  component: () => import('@/pages/blog/workbench/index.vue'),
  meta: {
    title: '工作台',
    icon: 'blog-menu-workbench',
    order: 0,
    textBadge: 'Beta',
  },

}

export default workbench
