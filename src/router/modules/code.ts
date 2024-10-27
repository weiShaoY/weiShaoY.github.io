import type { RouteRecordRaw } from 'vue-router'

import { codeRoutes } from '../code'

/**
 *  codingRouter (代码路由)
 */
const codingRouter: RouteRecordRaw[] = [
  {
    path: '/code',
    name: 'Code',
    redirect: {
      name: 'Blog',
    },
    children: [
      ...codeRoutes,
    ],
  },

]

export default codingRouter
