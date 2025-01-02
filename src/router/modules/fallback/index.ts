import type { RouteRecordRaw } from 'vue-router'

/**
 *  未找到和重定向路由
 */
const fallbackRouter: RouteRecordRaw[] = [
  {
    // 重定向
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/pages/error/redirect/index.vue'),
  },
  {
    // 未找到路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export default fallbackRouter
