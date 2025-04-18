import type { Router } from 'vue-router'

import { blogRouteGuard } from './blogRouteGuard'

import { documentTitleGuard } from './documentTitleGuard'

import { progressGuard } from './progressGuard'

export function createRouterGuard(router: Router) {
  // 创建进度条守卫
  progressGuard(router)

  // 创建文档标题守卫
  documentTitleGuard(router)

  // 创建博客路由守卫
  blogRouteGuard(router)
}
