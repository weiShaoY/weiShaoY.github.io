import type { RouteRecordRaw } from 'vue-router'

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
    name: 'Redirect',
    component: () => import('@/pages/error/redirect/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/error/404/index.vue'),
  },

]

export default baseRouter
