import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  工作路由
 */
const WorkRouter: RouteRecordRaw = {
  path: '/work',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '', // 空路径，作为默认子路由
      name: 'Work', // 移动 name 到子路由
      component: () => import('@/views/work/index.vue'),
      meta: {
        documentTitle: '我的工作!',
      },
    },
  ],
}

export default WorkRouter
