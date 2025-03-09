import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { createRouteGuard } from './guard/index'

import { routeList } from './utils'

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
}

/**
 * 创建并配置路由器
 */
const router = createRouter({
  /**
   *    路由模式
   */
  history: routerMode[import.meta.env.VITE_APP_ROUTER_MODE](),

  routes: [
    {
      name: 'Root',
      path: '/',
      redirect: {
        name: 'Home',
      },
    },

    ...routeList,

    {
      path: '/test',
      component: () => import('@/pages/test/index.vue'),
    },
  ],
})

/**
 *  设置路由守卫
 */
createRouteGuard (router)

export default router
