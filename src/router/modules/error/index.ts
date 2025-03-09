import type { RouteRecordRaw } from 'vue-router'

import { SIMPLE_Layout } from '@/layouts'

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
        meta: {
          documentTitle: '403! 没有权限!',
        },
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
        meta: {
          documentTitle: '404! 页面未找到!',
        },
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
        meta: {
          documentTitle: '500! 内部服务器错误!',
        },
      },
    ],
  },
]

export default errorRouter
