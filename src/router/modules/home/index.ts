import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  首页路由
 */
const homeRouter: RouteRecordRaw = {
  path: '/home',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('@/pages/home/index.vue'),
    },

  ],
}

export default homeRouter
