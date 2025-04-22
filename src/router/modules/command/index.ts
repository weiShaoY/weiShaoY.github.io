/**
 *  指挥台路由
 */
const commandRouter: RouterType.RouteRecordRaw[] = [

  {
    path: '/command',
    name: 'Command',
    meta: {
      title: '指挥台',
    },
    children: [
      {
        path: 'command-login',
        name: 'CommandLogin',
        component: () => import('@/pages/command/login/index.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: 'command-largeScreen',
        name: 'CommandLargeScreen',
        component: () => import('@/pages/command/largeScreen/index.vue'),
        meta: {
          title: '登录',
        },
      },
    ],
  },
]

export default commandRouter
