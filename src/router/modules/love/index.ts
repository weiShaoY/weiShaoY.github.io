/**
 *  测试页面路由
 */
const loveRouter: RouterType.RouteRecordRaw[] = [

  {
    path: '/love',
    name: 'Love',
    component: () => import('@/pages/love/index.vue'),
    meta: {
      title: 'love',
    },
  },
]

export default loveRouter
