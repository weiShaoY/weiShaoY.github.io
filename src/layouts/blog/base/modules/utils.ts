import { router } from '@/router'

/**
 * 递归查找包含目标路径的第一级父路由项
 * @param {string} path - 要查找的完整路径
 * @param {RouterType.BlogRouteRecordRaw[]} routes - 路由列表
 * @returns {RouterType.BlogRouteRecordRaw | undefined} 匹配到的第一级路由项
 */
export function findTopRouteByPath(
  path: string,
  routes: RouterType.BlogRouteRecordRaw[],
): RouterType.BlogRouteRecordRaw | undefined {
  for (const route of routes) {
    // 如果是顶级路径，直接匹配
    if (route.path === path) {
      return route
    }

    // 如果有子路由，递归查找
    if (route.children?.length) {
      const found = route.children.find(child => child.path === path)

      if (found) {
        return route
      }

      // 进一步递归查找更深层级
      const deepMatch = findTopRouteByPath(path, route.children)

      if (deepMatch) {
        return route
      }
    }
  }

  return undefined
}

/**
 *  打开外部链接
 */
function openExternalLink(link: string) {
  window.open(link, '_blank')
}

/**
 * 博客模块菜单跳转
 * @param item 菜单项
 * @param jumpToFirst 是否跳转到第一个子菜单
 */
export function blogMenuJump(
  item: RouterType.BlogRouteRecordRaw,
  jumpToFirst: boolean = false,
) {
  // 处理外部链接
  const { externalUrl } = item.meta

  if (externalUrl) {
    return openExternalLink(externalUrl)
  }

  // 如果不需要跳转到第一个子菜单，或者没有子菜单，直接跳转当前路径
  if (!jumpToFirst || !item.children?.length) {
    return router.push(item.path)
  }

  // 获取第一个可见的子菜单，如果没有则取第一个子菜单
  const firstChild
    = item.children.find(child => !child.meta.isHideInMenu) || item.children[0]

  // 如果第一个子菜单是外部链接 并且不是 iframe，打开外部链接
  if (firstChild.meta?.externalUrl) {
    return openExternalLink(firstChild.meta.externalUrl)
  }

  // 跳转到子菜单路径
  router.push(firstChild.path)
}
