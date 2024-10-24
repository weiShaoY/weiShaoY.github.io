import type { RouteRecordRaw } from 'vue-router'

/**
 *  errorRouter (错误页面路由)
 */
const errorRouter: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/error/403.vue'),
    meta: {
      title: '403页面',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error/404.vue'),
    meta: {
      title: '404页面',
    },
  },
  {
    path: '/500',
    name: '',
    component: () => import('@/pages/error/500.vue'),
    meta: {
      title: '500页面',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/error/404.vue'),
  },

]

export default errorRouter
