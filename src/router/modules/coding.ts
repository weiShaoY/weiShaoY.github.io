import type { RouteRecordRaw } from 'vue-router'

/**
 *  codingRouter (代码路由)
 */
const codingRouter: RouteRecordRaw[] = [
  {
    path: '/coding',
    name: 'Coding',
    component: () => import('@/pages/coding/index.vue'),
  },
]

export default codingRouter
