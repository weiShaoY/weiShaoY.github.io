/**
 *  错误页面路由
 */
const garageRouter: RouterType.RouteRecordRaw[] = [

  {
    path: '/garage',
    name: 'Garage',
    component: () => import('@/pages/garage/index.vue'),
    meta: {
      title: '车库',
    },
  },

]

export default garageRouter
