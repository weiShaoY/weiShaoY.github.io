import { COMMAND_LAYOUT } from '@/layouts'

/**
 *  指挥台路由
 */
const adminRouter: RouterType.RouteRecordRaw[] = [
  {
    path: 'admin-login',
    name: 'AdminLogin',
    component: () => import('@/pages/admin/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
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
            component: () => import('@/pages/admin/identityQuery/search/index.vue'),
            meta: {
              title: '身份查询-搜索',
            },
          },
          {
            path: 'identity-query-result',
            name: 'IdentityQueryResult',
            component: () => import('@/pages/admin/identityQuery/result/index.vue'),
            meta: {
              title: '身份查询-结果列表',
            },
          },
          {
            path: 'identity-query-detail',
            name: 'IdentityQueryDetail',
            component: () => import('@/pages/admin/identityQuery/detail/index.vue'),
            meta: {
              title: '身份查询-详情',
            },
          },
        ],
      },
    ],
  },

]

export default adminRouter
