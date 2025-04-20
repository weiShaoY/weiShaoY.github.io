import { BLOG_IFRAME_LAYOUT } from '@/layouts'

/**
 * 基础递归路由处理函数
 * @param routes 路由数组
 * @param handler 路由处理回调
 * @param parentPath 父路径（用于路径处理）
 * @returns 处理后的新路由数组
 */
function recursiveWalkRoutes<T extends { path: string, children?: T[] }>(
  routes: T[],
  handler: (route: T, parentPath?: string) => void,
  parentPath: string = '',
): T[] {
  return routes.map((route) => {
    const newRoute = {
      ...route,
    } // 创建副本避免修改原对象

    handler(newRoute, parentPath) // 执行处理逻辑

    // 递归处理子路由
    if (newRoute.children) {
      newRoute.children = recursiveWalkRoutes(
        newRoute.children,
        handler,
        newRoute.path, // 传递当前路径作为子路由的父路径
      )
    }

    return newRoute
  })
}

/**
 * 递归规范化路由完整路径
 * @param routes 路由配置数组
 * @returns 带完整路径的新路由数组
 */
export function recursiveNormalizeRoutesPath(routes: any[], parentPath = ''): any[] {
  return recursiveWalkRoutes(routes, (route, _parentPath = parentPath) => {
    if (!route.path.startsWith('/')) {
      route.path = `${_parentPath}${_parentPath.endsWith('/') ? '' : '/'}${route.path}`
        .replace(/\/+/g, '/')
    }
  }, parentPath)
}

/**
 * 递归设置路由默认重定向
 * @param routes 路由数组
 * @returns 带默认重定向的新路由数组
 */
export function recursiveSetRoutesRedirect(routes: any[]): any[] {
  return recursiveWalkRoutes(routes, (route) => {
    if (!route.redirect && route.children?.length) {
      const firstChild = route.children[0]

      route.redirect = firstChild.path.startsWith('/')
        ? firstChild.path
        : `${route.path}/${firstChild.path}`.replace(/\/+/g, '/')
    }
  })
}

/**
 * 递归按order排序路由（修复版）
 * @param routes 路由数组
 * @returns 排序后的新路由数组
 */
export function recursiveSortRoutesByOrder(routes: any[]): any[] {
  // 1. 对当前层级路由排序
  const sorted = [...routes].sort((a, b) => {
    const aOrder = a.meta?.order ?? Number.MAX_SAFE_INTEGER

    const bOrder = b.meta?.order ?? Number.MAX_SAFE_INTEGER

    return aOrder - bOrder
  })

  // 2. 递归排序子路由
  return sorted.map((route) => {
    if (!route.children) {
      return route
    }

    return {
      ...route,
      children: recursiveSortRoutesByOrder(route.children),
    }
  })
}

/**
 *  递归处理 iframe 路由
 * @param routes 路由数组
 * @returns 处理后的新路由数组
 */
export function recursiveHandleIframeRoutes(routes: any[]): any[] {
  return recursiveWalkRoutes(routes, (route) => {
    if (route.meta?.iframeUrl) {
      route.component = BLOG_IFRAME_LAYOUT
    }
  })
}
