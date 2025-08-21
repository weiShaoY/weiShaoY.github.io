import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router'

import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { createRouterGuard } from './guard'

import {
  checkDuplicateRoutes,
  formatModules,
  recursiveNormalizeRoutesPath,
  recursiveSetRoutesRedirect,
} from './utils'

// 路由模块加载配置
const appModules = import.meta.glob<{ default: RouteRecordRaw[] }>('./modules/*/index.ts', {
  eager: true,
})

/**
 * 初始化路由配置
 */
function initRoutes() {
  const routes = formatModules(appModules, []) as RouteRecordRaw[]

  const normalizedRoutes = recursiveNormalizeRoutesPath(routes)

  return recursiveSetRoutesRedirect(normalizedRoutes)
}

const routeList = initRoutes()

/**
 * 延迟检查重复路由
 */
setTimeout(() => {
  requestAnimationFrame(() => {
    try {
      checkDuplicateRoutes(routeList)
    }
    catch {
      window.$notification.error('路由检查失败')
    }
  })
}, 3000)

/**
 * 创建路由实例
 */
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 根路由
    {
      name: 'Root',
      path: '/',
      redirect: import.meta.env.VITE_ROUTER_ROOT_PATH || routeList[0]?.path || '/home',
    },

    // 业务路由
    ...routeList,

    // 404 路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],

  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
})

/**
 * 设置 Vue Router
 * @param app Vue 应用实例
 */
export async function setupRouter(app: App) {
  try {
    // 在 Vue 应用中使用路由
    app.use(router)

    // 创建并应用路由守卫
    createRouterGuard(router)

    // 等待路由准备就绪
    await router.isReady()
  }
  catch (error) {
    window.$notification.error('Router setup failed:')
    throw error
  }
}
