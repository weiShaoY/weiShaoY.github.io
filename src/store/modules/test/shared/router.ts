/**
 * 获取缓存路由名
 *
 * @param routes Vue 路由数组（两级）
 * @returns 缓存路由名
 */
export function getCacheRouteNames(routes: RouterType.BlogRouteRecordRaw[]) {
  const cacheNames: string[] = []

  routes.forEach((route) => {
    // 仅获取具有组件的最后两级路由
    route.children?.forEach((child) => {
      if (child.component && child.meta?.keepAlive) {
        cacheNames.push(child.name as string)
      }
    })
  })

  return cacheNames
}

/**
 * 递归查找与目标路径匹配的路由
 *
 * @param routeList 路由数组
 * @param routePath 要匹配的目标路径
 * @returns 返回匹配到的路由对象，未找到则返回undefined
 */
export function findBlogRouteByPath(
  routeList: RouterType.BlogRouteRecordRaw[],
  routePath: string,
): RouterType.BlogRouteRecordRaw | undefined {
  // 路径标准化处理：去除末尾斜杠，确保格式统一
  const normalizePath = (path: string) => path.replace(/\/+$/, '')

  // 遍历路由数组
  for (const route of routeList) {
    // 检查当前路由路径是否匹配
    if (route.path && normalizePath(route.path) === normalizePath(routePath)) {
      return route
    }

    // 如果当前路由不匹配，递归检查其子路由
    if (route.children) {
      const foundInChildren = findBlogRouteByPath(route.children, routePath)

      if (foundInChildren) {
        return foundInChildren
      }
    }
  }

  // 未找到匹配路由
  return undefined
}
