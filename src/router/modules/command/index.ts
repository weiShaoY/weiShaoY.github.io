/**
 *  指挥台路由
 */
const commandRouter: RouterType.RouteRecordRaw[] = [

  {
    path: '/command',
    name: 'Command',
    component: () => import('@/pages/command/index.vue'),
    meta: {
      title: '指挥台',
    },
  },
]

export default commandRouter
