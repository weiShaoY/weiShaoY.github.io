import type { RouteLocationNormalized, Router } from 'vue-router'

import { useBlogStore } from '@/stores'

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

    // 优化：只在真正需要时才更新状态
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
  catch {
    window.$notification.error('打开博客工作选项卡失败')
  }
}

/**
 * 创建博客路由守卫
 * @param router - Vue Router 实例
 */
export function blogRouteGuard(router: Router): void {
  // 全局后置守卫
  router.afterEach((to, from) => {
    // 优化：只在真正需要时才执行守卫逻辑
    if (to.path.includes(VITE_ROUTER_BLOG_PATH) && to.path !== from.path) {
      handleBlogWorkTabGuard(to)
    }
  })
}
