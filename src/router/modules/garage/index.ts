import type { RouteRecordRaw } from 'vue-router'

/**
 *  错误页面路由
 */
const garageRouter: RouteRecordRaw[] = [

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
