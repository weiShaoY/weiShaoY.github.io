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
        path: 'identityQuery',
        name: 'IdentityQuery',
        meta: {
          title: '身份查询',
        },
        children: [
          {
            path: 'identity-query-search',
            name: 'IdentityQuerySearch',
            component: () => import('@/pages/command/identityQuery/search/index.vue'),
            meta: {
              title: '身份查询-搜索',
            },
          },
          {
            path: 'identity-query-result',
            name: 'IdentityQueryResult',
            component: () => import('@/pages/command/identityQuery/result/index.vue'),
            meta: {
              title: '身份查询-结果列表',
            },
          },
          {
            path: 'identity-query-detail',
            name: 'IdentityQueryDetail',
            component: () => import('@/pages/command/identityQuery/detail/index.vue'),
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
