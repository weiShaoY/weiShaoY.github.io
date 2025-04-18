import type { RouteLocationNormalized, Router } from 'vue-router'

import { useTestStore } from '@/store'

function handleBlogWorkTabGuard(to: RouteLocationNormalized) {
  const testStore = useTestStore()

  const { meta, path, name, params, query } = to

  if (!meta.isHideTab) {
    testStore.openTab({
      title: meta.title as string,
      path,
      name: name as string,
      keepAlive: meta.keepAlive as boolean,
      params,
      query,
    })
  }
}

/**
 * 创建博客路由守卫
 * @param router - Vue Router 实例
 */
export function blogRouteGuard(router: Router): void {
  // 全局前置守卫
  // router.beforeEach(async (to, from, next) => {
  //   // 如果目标路径包含博客路径，执行博客菜单守卫逻辑
  //   // if (to.path.includes(BLOG_PATH)) {
  //   //   await handleBlogMenuGuard(to, from, next, router)
  //   // }
  //   // else {
  //   //   // 否则，直接放行
  //   //   next()
  //   // }
  // })
  // 全局后置守卫
  router.afterEach((to) => {
    // 如果目标路径包含博客路径，执行工作标签和主题守卫逻辑
    if (to.path.includes('/blog')) {
      handleBlogWorkTabGuard(to)
    }
  })
}
