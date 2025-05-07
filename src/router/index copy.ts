import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router'

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

// 路由模块加载配置
const appModules = import.meta.glob<{ default: RouteRecordRaw[] }>('./modules/*/index.ts', {
  eager: true,
})

/**
 * 路由模式配置
 */
const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
} as const

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
    catch (error) {
      console.error('Route check failed:', error)
    }
  })
}, 3000)

/**
 * 创建路由实例
 */
export const router = createRouter({
  history: routerMode[import.meta.env.VITE_ROUTER_MODE as keyof typeof routerMode](),
  routes: [
    {
      name: 'Root',
      path: '/',
      redirect: import.meta.env.VITE_ROUTER_ROOT_PATH || routeList[0]?.path || '/home',
    },
    ...routeList,

    {
      // 重定向
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/pages/error/redirect/index.vue'),
    },
    {
      // 未找到路由
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],

  // 添加路由配置选项
  scrollBehavior(to, from, savedPosition) {
    // 1. 如果有保存的滚动位置（比如用户点击浏览器的前进/后退按钮）
    if (savedPosition) {
      return savedPosition
    }

    // 2. 如果目标路由有 hash（比如 #section-1）
    if (to.hash) {
      return {
        el: to.hash, // 滚动到 hash 对应的元素
        behavior: 'smooth', // 使用平滑滚动效果
      }
    }

    // 3. 默认情况：滚动到页面顶部
    return {
      top: 0, // 滚动到顶部
      behavior: 'smooth', // 使用平滑滚动效果
    }
  },
})

/**
 * 设置 Vue Router
 * @param app Vue 应用实例
 */
export async function setupRouter(app: App) {
  try {
    // 在 Vue 应用中使用路由
    app.use(router)

    // 等待路由准备就绪
    await router.isReady()

    // 创建并应用路由守卫
    createRouterGuard(router)
  }
  catch (error) {
    console.error('Router setup failed:', error)
    throw error
  }
}
