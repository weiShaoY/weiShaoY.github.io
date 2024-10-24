import type { RouteRecordRaw } from 'vue-router'

/**
 *  commandRouter (指挥台路由)
 */
const commandRouter: RouteRecordRaw[] = [
  {
    path: '/command',
    name: 'Command',
    component: () => import('@/pages/command/index.vue'),
    meta: {
      title: '403页面',
    },
  },

]

export default commandRouter
