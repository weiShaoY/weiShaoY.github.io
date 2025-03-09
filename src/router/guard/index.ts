import type { Router } from 'vue-router'

import { NProgress } from '@/config'

import BlogGuard from './blogGuard'

/**
 * 创建进度条守卫
 *
 * @param router - 路由实例
 */
function progressGuard(router: Router) {
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
 * 创建文档标题守卫
 *
 * @param router - 路由实例
 */
export function documentTitleGuard(router: Router) {
  router.afterEach((to) => {
    /**
     * 路由元信息中的文档标题
     */
    const { documentTitle } = to.meta

    if (documentTitle) {
    // 设置文档标题
      useTitle(documentTitle as string)
    }
  })
}

/**
 * 创建并设置路由守卫
 * @param router - 路由器实例
 */
export function createRouteGuard(router: Router) {
  // 创建进度条守卫
  progressGuard(router)

  // 创建文档标题守卫
  documentTitleGuard(router)
}

export {

  /**
   *  @description 博客模块路由发射器
   */
  BlogGuard,
}
