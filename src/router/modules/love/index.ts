import type { RouteRecordRaw } from 'vue-router'

/**
 *  测试页面路由
 */
const loveRouter: RouteRecordRaw[] = [

  {
    path: '/love',
    name: 'Love',
    component: () => import('@/views/love/index.vue'),
    meta: {
      documentTitle: 'I Love You!',
    },
  },
]

export default loveRouter
