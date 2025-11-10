const workbench: RouterType.AdminRoute = {
  path: 'workbench',
  name: 'Workbench',
  component: () => import('@/pages/admin/workbench/index.vue'),
  meta: {
    title: '工作台',
    icon: 'admin-menu-workbench',
    order: 0,
    textBadge: 'Beta',
  },

}

export default workbench
