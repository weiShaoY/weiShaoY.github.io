import type { RouteRecordRaw } from 'vue-router'

/**
 *  baseRouter (基础路由)
 */
const baseRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'Home',
    },
  },
]

export default baseRouter
