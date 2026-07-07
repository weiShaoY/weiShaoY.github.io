/**
 *  测试页面路由
 */
const loveRouter: RouterType.RouteRecordRaw[] = [

  {
    path: '/love',
    name: 'Love',
    component: () => import('@/pages/love/index.vue'),
    meta: {
      documentTitle: 'I Love You!',
    },
  },
]

export default loveRouter
