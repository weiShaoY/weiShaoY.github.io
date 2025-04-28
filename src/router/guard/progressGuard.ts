import type { Router } from 'vue-router'

/**
 * 创建进度条守卫
 * @param router - 路由实例
 */
export function progressGuard(router: Router) {
  /**
   *  @description 路由跳转前
   */
  router.beforeEach(async () => {
    /**
     *  开始进度条
     */
    window.NProgress?.start?.()
  })

  /**
   *  @description 路由跳转结束
   */
  router.afterEach(() => {
    /**
     *  结束进度条
     */
    window.NProgress?.done()
  })

  /**
   *  @description 路由跳转错误
   */
  router.onError(() => {
    // 错误时也结束进度条
    window.NProgress?.done()
  })
}
