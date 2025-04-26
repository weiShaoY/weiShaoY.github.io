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

/**
 * 查找路由的父路由对象
 * @param routes 路由配置数组
 * @param currentPath 当前路由路径 (如 '/blog/document/ui/tDesign')
 * @returns 父路由对象 | undefined (未找到时)
 */
export function findParentRoute(
  routes: RouterType.BlogRouteRecordRaw[],
  currentPath: string,
): RouterType.BlogRouteRecordRaw | undefined {
  // 标准化路径：移除末尾斜杠
  const normalizedPath = currentPath.replace(/\/$/, '')

  // 递归查找函数
  function find(routes: RouterType.BlogRouteRecordRaw[], parent?: RouterType.BlogRouteRecordRaw): RouterType.BlogRouteRecordRaw | undefined {
    for (const route of routes) {
      // 检查当前路由是否匹配
      if (route.path.replace(/\/$/, '') === normalizedPath) {
        return parent // 返回父路由
      }

      // 检查子路由
      if (route.children) {
        const found = find(route.children, route)

        if (found) {
          return found
        }
      }
    }

    return undefined
  }

  return find(routes)
}

/**
 * 查找包含目标路径的顶级路由项（优化版）
 * @param path 要查找的完整路径
 * @param routes 路由列表
 * @returns 匹配到的顶级路由项
 */
// export function findTopRouteByPath(
//   path: string,
//   routes: RouterType.BlogRouteRecordRaw[],
// ): RouterType.BlogRouteRecordRaw | undefined {
//   const normalizedPath = path.replace(/\/$/, '')

//   for (const route of routes) {
//     // 检查当前路由是否匹配
//     if (route.path.replace(/\/$/, '') === normalizedPath) {
//       return route
//     }

//     // 检查子路由
//     if (route.children?.length) {
//       // 先检查直接子路由
//       const directChild = route.children.find(
//         child => child.path.replace(/\/$/, '') === normalizedPath,
//       )

//       if (directChild) {
//         return route
//       }

//       // 递归查找更深层级
//       const foundInChildren = findTopRouteByPath(normalizedPath, route.children)

//       if (foundInChildren) {
//         return route
//       }
//     }
//   }

//   return undefined
// }

/**
 * 查找包含目标路径的顶级路由项（优化修正版）
 * @param path 要查找的完整路径
 * @param routes 路由列表
 * @returns 匹配到的第一级父路由项
 */
export function findTopRouteByPath(
  path: string,
  routes: RouterType.BlogRouteRecordRaw[],
): RouterType.BlogRouteRecordRaw | undefined {
  const normalizedPath = path.replace(/\/$/, '')

  // 使用栈来跟踪当前父路由
  const stack: { route: RouterType.BlogRouteRecordRaw, parent?: RouterType.BlogRouteRecordRaw }[]
    = routes.map(route => ({
      route,
    }))

  while (stack.length > 0) {
    const { route, parent } = stack.pop()!

    // 检查当前路由是否匹配
    if (route.path.replace(/\/$/, '') === normalizedPath) {
      // 如果是顶级路由，返回自身；否则返回父路由
      return parent || route
    }

    // 将子路由加入栈（反向加入以保证顺序）
    if (route.children) {
      for (let i = route.children.length - 1; i >= 0; i--) {
        stack.push({
          route: route.children[i],
          parent: parent || route, // 第一个有children的route作为父级
        })
      }
    }
  }

  return undefined
}
