import { Police_LAYOUT } from '@/layouts'

/**
 *  指挥台路由
 */
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
      meta: {
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
    {
      path: 'monitorSystem',
      meta: {
        documentTitle: '监控系统',
      },
      component: Police_LAYOUT,
      children: [
        {
          path: '', // 空路径，作为默认子路由
          name: 'PoliceMonitorSystem', // 移动 name 到子路由
          component: () => import('@/pages/police/monitorSystem/index.vue'),
          meta: {
            documentTitle: '监控系统',
          },
        },
      ],
    },
    {
      path: 'archiveSystem',
      meta: {
        documentTitle: '档案系统',
      },
      component: Police_LAYOUT,
      children: [
        {
          path: '', // 空路径，作为默认子路由
          name: 'PoliceArchiveSystem', // 移动 name 到子路由
          component: () => import('@/pages/police/archiveSystem/index.vue'),
          meta: {
            documentTitle: '档案系统',
          },
        },
      ],
    },
    {
      path: 'statisticalAnalysis',
      meta: {
        documentTitle: '统计分析',
      },
      component: Police_LAYOUT,
      children: [
        {
          path: '', // 空路径，作为默认子路由
          name: 'PoliceStatisticalAnalysis', // 移动 name 到子路由
          component: () => import('@/pages/police/statisticalAnalysis/index.vue'),
          meta: {
            documentTitle: '统计分析',
          },
        },
      ],
    },
    {
      path: 'spaceControl',
      meta: {
        documentTitle: '空间管控',
      },
      component: Police_LAYOUT,
      children: [
        {
          path: '', // 空路径，作为默认子路由
          name: 'PoliceSpaceControl', // 移动 name 到子路由
          component: () => import('@/pages/police/spaceControl/index.vue'),
          meta: {
            documentTitle: '空间管控',
          },
        },
      ],
    },
  ],

}

export default policeRouter
