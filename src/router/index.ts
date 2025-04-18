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
  formatModules,
  normalizeRoutesWithFullPath,
  setRouteDefaultRedirect,
} from './utils'

const appModules = import.meta.glob('./modules/*/index.ts', {
  eager: true,
})

/**
 *  获取路由列表
 */
export const formatModulesList: RouteRecordNormalized[] = formatModules(appModules, [])

const aaa = normalizeRoutesWithFullPath(formatModulesList)

const routeList = setRouteDefaultRedirect(aaa) // aaa

console.log('%c Line:33 🍪 routeList', 'color:#33a5ff', routeList)

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
