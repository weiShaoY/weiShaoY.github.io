import type { RouteRecordRaw } from 'vue-router'

import config from '@/config'

/**
 *  baseRouter (基础路由)
 */
const baseRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'Home',
    },
  },

  // 重定向路由
  {
    path: '/redirect/:path(.*)',
    name: config.redirectRouteName,
    component: () => import('@/pages/error/redirect/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: config.notFoundRouteName,
    component: () => import('@/pages/error/404/index.vue'),
  },

]

export default baseRouter
