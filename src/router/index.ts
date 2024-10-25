import { NProgress } from '@/config'

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { appRoutes } from './routerUtils'

console.log('%c Line:10 🌰 appRoutes', 'color:#f5ce50', appRoutes)

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
  history: routerMode[import.meta.env.VITE_ROUTER_MODE](),

  routes: [

    ...appRoutes,
    {
      path: '/test',
      component: () => import('@/pages/test/index.vue'),
    },
  ],

})

/**
 *  @description 路由跳转开始
 *  @description 路由拦截
 */
router.beforeEach(() => {
  NProgress.start()
})

/**
 *  @description 路由跳转错误
 */
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 *  @description 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done()
})

export default router
