import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import createRouteGuard from './guard/index'

import { appRoutes } from './utils'

console.log('%c Line:10 🥖 appRoutes', 'color:#4fff4B', appRoutes)

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
      path: '/',
      redirect: {
        name: 'Home',
      },
    },

    ...appRoutes,

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
