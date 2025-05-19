import { router } from '@/router'

/**
 * 递归查找包含目标路径的第一级父路由项
 * @param {string} path - 要查找的完整路径
 * @param {WxChatType.BlogRouteRecordRaw[]} routes - 路由列表
 * @returns {WxChatType.BlogRouteRecordRaw | undefined} 匹配到的第一级路由项
 */
export function findTopRouteByPath(
  path: string,
  routes: WxChatType.BlogRouteRecordRaw[],
): WxChatType.BlogRouteRecordRaw | undefined {
  // 使用 Map 缓存已查找的路由，避免重复查找
  const routeCache = new Map<string, WxChatType.BlogRouteRecordRaw>()

  for (const route of routes) {
    // 检查缓存
    if (routeCache.has(route.path)) {
      return routeCache.get(route.path)
    }

    // 如果是顶级路径，直接匹配
    if (route.path === path) {
      routeCache.set(route.path, route)
      return route
    }

    // 如果有子路由，递归查找
    if (route.children?.length) {
      // 先查找直接子路由
      const found = route.children.find(child => child.path === path)

      if (found) {
        routeCache.set(route.path, route)
        return route
      }

      // 进一步递归查找更深层级
      const deepMatch = findTopRouteByPath(path, route.children)

      if (deepMatch) {
        routeCache.set(route.path, route)
        return route
      }
    }
  }

  return undefined
}

/**
 * 博客模块菜单跳转
 * @param {WxChatType.BlogRouteRecordRaw} item - 菜单项
 * @param {boolean} jumpToFirst - 是否跳转到第一个子菜单
 * @returns {Promise<void>}
 */
export async function blogMenuJump(
  item: WxChatType.BlogRouteRecordRaw,
  jumpToFirst: boolean = false,
): Promise<void> {
  if (!item?.path) {
    return
  }

  try {
    // 处理外部链接
    if (item.meta?.externalUrl) {
      const url = new URL(item.meta.externalUrl)

      window.open(url.toString(), '_blank', 'noopener,noreferrer')
      return
    }

    // 如果不需要跳转到第一个子菜单，或者没有子菜单，直接跳转当前路径
    if (!jumpToFirst || !item.children?.length) {
      await router.push(item.path)
      return
    }

    // 获取第一个可见的子菜单，如果没有则取第一个子菜单
    const firstChild = item.children.find(child => !child.meta?.isHideInMenu) || item.children[0]

    if (!firstChild?.path) {
      return
    }

    // 如果第一个子菜单是外部链接，打开外部链接
    if (firstChild.meta?.externalUrl) {
      const url = new URL(firstChild.meta.externalUrl)

      window.open(url.toString(), '_blank', 'noopener,noreferrer')
      return
    }

    // 跳转到子菜单路径
    await router.push(firstChild.path)
  }
  catch (error) {
    console.error('Menu jump failed:', error)
  }
}
