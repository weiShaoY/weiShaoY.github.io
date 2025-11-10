import type { Router } from 'vue-router'

import { adminRouteGuard } from './adminRouteGuard'

import { documentTitleGuard } from './documentTitleGuard'

import { progressGuard } from './progressGuard'

/**
 *  创建路由守卫
 *  @param router 路由实例
 */
export function createRouterGuard(router: Router) {
  // 创建进度条守卫
  progressGuard(router)

  // 创建文档标题守卫
  documentTitleGuard(router)

  // 创建博客路由守卫
  adminRouteGuard(router)
}
