/**
 *  未找到和重定向路由
 */
export const fallbackRouter: RouterType.RouteRecordRaw[] = [
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
