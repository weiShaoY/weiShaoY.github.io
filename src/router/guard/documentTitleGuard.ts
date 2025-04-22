import type { Router } from 'vue-router'

import { useTitle } from '@vueuse/core'

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
      useTitle(to.meta.documentTitle as string)
    }
    else if (to.meta.title) {
      const documentTitle = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`

      useTitle(documentTitle)
    }
    else if (import.meta.env.VITE_APP_NODE_ENV === 'development') {
      useTitle('Vue-实现')
    }
    else {
      useTitle(import.meta.env.VITE_APP_DESC)
    }
  })
}
