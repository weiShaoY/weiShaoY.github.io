import type { RouteRecordNormalized } from 'vue-router'

/**
 * 递归遍历路由树，执行自定义处理逻辑
 * @param route 当前路由对象
 * @param handler 处理函数
 */
export function walkRoutesTree<T extends { children?: T[] }>(
  route: T,
  handler: (node: T) => void,
) {
  handler(route)

  if (Array.isArray(route.children)) {
    route.children.forEach(child => walkRoutesTree(child, handler))
  }
}

/**
 * 路由设置默认重定向
 * @param route 路由对象
 */
export function setRouteDefaultRedirect(route: RouterType.BlogRouteRecordRaw) {
  if (!route.redirect) {
    if (route.children?.length) {
      route.redirect = route.children[0].path
    }
  }
}

/**
 * 博客模块按 meta.order 对子路由排序
 * @param route 路由对象
 */
export function sortBlogRouteChildren(route: RouterType.BlogRouteRecordRaw) {
  if (Array.isArray(route.children)) {
    route.children.sort((a: RouterType.BlogRouteRecordRaw, b: RouterType.BlogRouteRecordRaw) => {
      return (a.meta?.order || 0) - (b.meta?.order || 0)
    })
  }
}

/**
 *  格式化modules模块(将modules模块转化为数组)
 *  @param  _modules - modules模块
 *  @param  result - 格式化后的数组
 */
export function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  // 遍历_modules对象的属性
  Object.keys(_modules).forEach((key) => {
    /**
     *  获取当前属性的默认模块
     */
    const defaultModule = _modules[key].default

    // 如果当前模块不存在，则直接返回
    if (!defaultModule) {
      return
    }

    /**
     *  将defaultModule转化为数组
     */
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]

    // / / ////////////////////////  blog 模块  2025-04-18---18:00---星期五  ////////////////////////
    const processedRoutes: RouterType.BlogRouteRecordRaw[] = moduleList

    // 统一应用处理逻辑
    processedRoutes.forEach((route) => {
      walkRoutesTree(route, sortBlogRouteChildren)

      walkRoutesTree(route, setRouteDefaultRedirect)
    })

    // 将所有模块添加到result数组中
    result.push(...processedRoutes as any[])
  })

  /**
   *  返回格式化后的result数组
   */
  return result
}
