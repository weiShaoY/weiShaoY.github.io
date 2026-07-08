import type { RouteRecordRaw } from 'vue-router'

/**
 *  大屏路由
 */
const BigScreenRouter: RouteRecordRaw[] = [
  {
    path: '/bigScreen',
    name: 'BigScreen',
    meta: {
      title: '大屏',
    },
    component: () => import('@/views/bigScreen/index.vue'),
  },
]

export default BigScreenRouter
