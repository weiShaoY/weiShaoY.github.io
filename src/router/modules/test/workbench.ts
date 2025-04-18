const workbench: RouterType.BlogRouteRecordRaw = {
  path: 'workbench',
  name: 'Workbench',
  component: () => import('@/pages/test/workbench/index.vue'),
  meta: {
    title: '工作台',
    icon: 'blog-menu-workbench',
    textBadge: 'a',
    order: 0,
  },

}

export default workbench
