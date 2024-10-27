import type { RouteRecordRaw } from 'vue-router'

import config from '@/config'

import { codeRoutes } from '../code'

/**
 *  codingRouter (代码路由)
 */
const codingRouter: RouteRecordRaw[] = [
  {
    path: '/code',
    name: 'Code',
    redirect: {
      name: config.code.defaultRouteName,
    },
    children: [
      ...codeRoutes,
    ],
  },

]

export default codingRouter
