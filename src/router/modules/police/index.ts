import { Police_LAYOUT } from '@/layouts'

/**
 *  指挥台路由
 */
// const policeRouter: RouterType.RouteRecordRaw[] = [
//   {
//     path: 'police-login',
//     name: 'policeLogin',
//     component: () => import('@/pages/police/login/index.vue'),
//     meta: {
//       documentTitle: '登录',
//     },
//   },
//   {
//     path: '/police',
//     name: 'police',
//     meta: {
//       title: '指挥台',
//     },
//     component: Police_LAYOUT,
//     children: [
//       {
//         path: 'identityQuery',
//         name: 'IdentityQuery',
//         meta: {
//           title: '身份查询',
//         },
//         children: [
//           {
//             path: 'identity-query-search',
//             name: 'IdentityQuerySearch',
//             component: () => import('@/pages/police/identityQuery/search/index.vue'),
//             meta: {
//               title: '身份查询-搜索',
//             },
//           },
//           {
//             path: 'identity-query-result',
//             name: 'IdentityQueryResult',
//             component: () => import('@/pages/police/identityQuery/result/index.vue'),
//             meta: {
//               title: '身份查询-结果列表',
//             },
//           },
//           {
//             path: 'identity-query-detail',
//             name: 'IdentityQueryDetail',
//             component: () => import('@/pages/police/identityQuery/detail/index.vue'),
//             meta: {
//               title: '身份查询-详情',
//             },
//           },
//         ],
//       },
//     ],
//   },

// ]

const policeRouter: RouterType.RouteRecordRaw = {
  path: '/police',
  name: 'Police',
  meta: {
    documentTitle: '指挥台',
  },
  redirect: '/police/login',
  children: [
    {
      path: 'login',
      name: 'PoliceLogin',
      component: () => import('@/pages/police/login/index.vue'),
      meta: { // 修改这里
        documentTitle: '登录',
      },
    },
    {
      path: 'identityQuery',
      name: 'PoliceIdentityQuery',
      meta: {
        documentTitle: '身份查询',
      },
      redirect: '/police/identityQuery/search',
      component: Police_LAYOUT,
      children: [
        {
          path: 'search',
          name: 'PoliceIdentityQuerySearch',
          component: () => import('@/pages/police/identityQuery/search/index.vue'),
          meta: {
            documentTitle: '身份查询-搜索',
          },
        },
        {
          path: 'result',
          name: 'PoliceIdentityQueryResult',
          component: () => import('@/pages/police/identityQuery/result/index.vue'),
          meta: {
            documentTitle: '身份查询-结果列表',
          },
        },
        {
          path: 'detail',
          name: 'PoliceIdentityQueryDetail',
          component: () => import('@/pages/police/identityQuery/detail/index.vue'),
          meta: {
            documentTitle: '身份查询-详情',
          },
        },
      ],
    },
  ],

}

export default policeRouter
