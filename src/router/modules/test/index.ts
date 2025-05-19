/**
 *  测试页面路由
 */
const testRouter: WxChatType.RouteRecordRaw[] = [

  {
    path: '/test',
    name: 'Test',
    component: () => import('@/pages/test/index.vue'),
    meta: {
      title: '测试',
    },
  },

]

export default testRouter
