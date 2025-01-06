import type { RouteRecordRaw } from 'vue-router'

import { SIMPLE_Layout } from '@/router/layout'

/**
 *  错误页面路由
 */
const errorRouter: RouteRecordRaw[] = [
  {
    path: '/403',
    component: SIMPLE_Layout,
    children: [
      {
        path: '', // 空路径，作为默认子路由
        name: '403', // 移动 name 到子路由
        component: () => import('@/pages/error/403/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: SIMPLE_Layout,
    children: [
      {
        path: '', // 空路径
        name: '404', // 移动 name 到子路由
        component: () => import('@/pages/error/404/index.vue'),
      },
    ],
  },
  {
    path: '/500',
    component: SIMPLE_Layout,
    children: [
      {
        path: '', // 空路径
        name: '500', // 移动 name 到子路由
        component: () => import('@/pages/error/500/index.vue'),
      },
    ],
  },
]

export default errorRouter
