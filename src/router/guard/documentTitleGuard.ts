import type { Router } from 'vue-router'

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

    if (to.meta.documentTitle) {
    // 设置文档标题
      useTitle(to.meta.documentTitle as string)
    }
    else {
      const documentTitle = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`

      // 设置文档标题
      useTitle(documentTitle)
    }
  })
}
