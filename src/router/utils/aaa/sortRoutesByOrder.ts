/**
 *  递归按 meta.order 对子路由排序
 */
export function sortRoutesByOrder(routes: any[], level = 0) {
  const sorted = [...routes].sort((a, b) => {
    const aOrder = a.meta?.order ?? Number.MAX_SAFE_INTEGER

    const bOrder = b.meta?.order ?? Number.MAX_SAFE_INTEGER

    return aOrder - bOrder
  })

  sorted.forEach((route) => {
    if (route.children?.length) {
      route.children = sortRoutesByOrder(route.children, level + 1)
    }
  })

  return sorted
}
