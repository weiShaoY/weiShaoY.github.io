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
        meta: {
          title: '身份查询',
        },
        children: [
          {
            path: 'command-identity-search',
            name: 'CommandIdentitySearch',
            component: () => import('@/pages/command/identity/search/index.vue'),
            meta: {
              title: '身份查询-搜索',
            },
          },
          {
            path: 'command-identity-result',
            name: 'CommandIdentityResult',
            component: () => import('@/pages/command/identity/result/index.vue'),
            meta: {
              title: '身份查询-详情',
            },
          },
          {
            path: 'command-identity-detail',
            name: 'CommandIdentityDetail',
            component: () => import('@/pages/command/identity/detail/index.vue'),
            meta: {
              title: '身份查询-详情',
            },
          },
        ],
      },
    ],
  },

]

export default commandRouter
