import { COMMAND_LAYOUT } from '@/layouts'

/**
 *  指挥台路由
 */
const commandRouter: RouterType.RouteRecordRaw[] = [
  {
    path: 'command-login',
    name: 'CommandLogin',
    component: () => import('@/pages/command/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: 'command-search',
    name: 'CommandSearch',
    component: () => import('@/pages/command/search/index.vue'),
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/command',
    name: 'Command',
    meta: {
      title: '指挥台',
    },
    component: COMMAND_LAYOUT,
    children: [

      {
        path: 'command-identity',
        name: 'CommandIdentity',
        component: () => import('@/pages/command/identity/index.vue'),
        meta: {
          title: '身份查询',
        },
      },
    ],
  },

]

export default commandRouter
