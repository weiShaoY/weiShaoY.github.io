import type { App } from 'vue'

import type { RouteRecordNormalized } from 'vue-router'

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { createRouterGuard } from './guard'

import { formatModules } from './utils/index'

const appModules = import.meta.glob('./modules/*/index.ts', {
  eager: true,
})

/**
 *  获取路由列表
 */
export const routeList: RouteRecordNormalized[] = formatModules(appModules, [])

console.log('%c Line:23 🍉 总路由', 'color:#3f7cff', routeList)

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
      redirect: {
        name: 'Home',
      },
    },

    ...routeList,

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
