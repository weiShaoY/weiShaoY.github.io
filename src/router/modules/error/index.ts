import type { RouteRecordRaw } from 'vue-router'

import { SIMPLE_Layout } from '@/router/layout'

/**
 *  错误页面路由
 */
const errorRouter: RouteRecordRaw[] = [

  {
    path: '/403',
    name: '403',
    component: SIMPLE_Layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/error/403/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: SIMPLE_Layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/error/404/index.vue'),
      },
    ],
  },
  {
    path: '/500',
    name: '500',
    component: SIMPLE_Layout,
    children: [
      {
        path: '',
        component: () => import('@/pages/error/500/index.vue'),
      },
    ],
  },
]

export default errorRouter
