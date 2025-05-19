/**
 *  测试页面路由
 */
const loveRouter: WxChatType.RouteRecordRaw[] = [

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
