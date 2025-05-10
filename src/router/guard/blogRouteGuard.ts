import type { RouteLocationNormalized, Router } from 'vue-router'

import { useBlogStore } from '@/store'

/**
 *  路由-博客模块路径
 */
const VITE_ROUTER_BLOG_PATH = import.meta.env.VITE_ROUTER_BLOG_PATH

/**
 * 处理博客工作标签守卫
 * @param to - 目标路由信息
 */
function handleBlogWorkTabGuard(to: RouteLocationNormalized): void {
  try {
    const blogStore = useBlogStore()

    const { meta, path, name, params, query } = to

    if (!meta.isHideTab) {
      blogStore.openTab({
        meta,
        path,
        name,
        params,
        query,
      } as any)
    }
  }
  catch (error) {
    console.error('打开博客工作选项卡失败:', error)
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
    if (to.path.includes(VITE_ROUTER_BLOG_PATH)) {
      handleBlogWorkTabGuard(to)
    }
  })
}
