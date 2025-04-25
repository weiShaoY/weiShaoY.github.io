import type { App } from 'vue'

import type { RouteRecordNormalized } from 'vue-router'

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { createRouterGuard } from './guard'

import { fallbackRouter } from './modules/fallback'

import {
  checkDuplicateRoutes,
  formatModules,
  recursiveNormalizeRoutesPath,
  recursiveSetRoutesRedirect,
} from './utils'

const appModules = import.meta.glob('./modules/*/index.ts', {
  eager: true,
})

/**
 *  获取路由列表
 */
export const formatModulesList: RouteRecordNormalized[] = formatModules(appModules, [])

const normalizeRoutesWithFullPathList = recursiveNormalizeRoutesPath(formatModulesList)

const routeList = recursiveSetRoutesRedirect(normalizeRoutesWithFullPathList)

// 检查路由路径和路由名称是否存在重复
checkDuplicateRoutes(routeList)

console.log('%c Line:33 🍕 routeList', 'color:#f5ce50', routeList)

//  延迟3s
setTimeout(() => {
  console.log('%c Line:36 🍕 routeList', 'color:#f5ce50', routeList)
  checkDuplicateRoutes(routeList)
}, 3000)

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
}

/**
 * 创建并配置路由器
 */
export const router = createRouter({
  /**
   *    路由模式
   */
  history: routerMode[import.meta.env.VITE_ROUTER_MODE](),

  routes: [
    {
      name: 'Root',
      path: '/',
      redirect: import.meta.env.VITE_ROUTER_ROOT_PATH || routeList[0].path,
    },

    ...routeList,

    ...fallbackRouter,
  ],
})

/**
 * 设置 Vue Router
 *
 * @param app Vue 应用实例
 */
export async function setupRouter(app: App) {
  // 在 Vue 应用中使用路由
  app.use(router)

  // 创建并应用路由守卫
  createRouterGuard(router)
}
