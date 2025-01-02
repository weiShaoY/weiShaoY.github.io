import type { Router } from 'vue-router'

import { NProgress } from '@/config'

import BlogGuard from './blogGuard'

/**
 * 设置页面守卫
 * @param {Router} router - 路由器实例
 */
function setupPageGuard(router: Router) {
  /**
   *  @description 路由跳转前
   */
  router.beforeEach(async (to) => {
    /**
     *  开始进度条
     */
    NProgress.start()

    /**
     *  代码模块触发路由变更事件
     */
    BlogGuard.emitRouteChange(to)
  })

  /**
   *  @description 路由跳转结束
   */
  router.afterEach(() => {
    /**
     *  结束进度条
     */
    NProgress.done()
  })

  /**
   *  @description 路由跳转错误
   */
  router.onError(() => {
    // 错误时也结束进度条
    NProgress.done()
  })
}

/**
 * 创建并设置路由守卫
 * @param router - 路由器实例
 */
export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
}

export {

  // 导出代码模块的路由发射器
  BlogGuard,
}
