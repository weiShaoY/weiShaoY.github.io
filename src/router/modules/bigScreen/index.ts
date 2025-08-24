// import { COMMAND_LAYOUT } from '@/layouts'

/**
 *  指挥台路由
 */
const BigScreenRouter: RouterType.RouteRecordRaw[] = [
  {
    path: '/bigScreen',
    name: 'BigScreen',
    meta: {
      title: '大屏',
    },
    component: () => import('@/pages/bigScreen/index.vue'),
  },
]

export default BigScreenRouter
