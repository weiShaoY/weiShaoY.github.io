/**
 * 规范化路由配置，为每个路由生成完整路径（包含所有父级路径）
 * @param routes - 待处理的路由配置数组
 * @param parentPath - 父级路径（用于递归调用时传递）
 * @returns 处理后的新路由数组（包含完整路径）
 */
export function normalizeRoutesWithFullPath(routes: any[], parentPath = ''): any[] {
  // 使用map遍历路由数组，对每个路由对象进行处理
  return routes.map((route) => {
    // 保留原始路径（后续会修改）
    let fullPath = route.path

    // if (fullPath.startsWith('/test/aaa')) {
    //   debugger
    // }

    // 判断路径是否需要拼接父级路径：
    // 1. 不以斜杠开头的路径视为相对路径
    // 2. 绝对路径（以/开头）不需要处理
    if (!fullPath.startsWith('/')) {
      // 拼接父级路径和当前路径：
      // - 如果父路径以/结尾，直接拼接（避免双斜杠）
      // - 否则添加/作为分隔符
      fullPath = parentPath + (parentPath.endsWith('/') ? '' : '/') + fullPath
    }

    // 创建新的路由对象（避免直接修改原始对象）
    // 使用展开运算符复制所有原有属性
    const normalizedRoute = {
      ...route, // 复制原有属性
      path: fullPath, // 覆盖为完整路径
    }

    // 递归处理子路由（如果存在）
    if (route.children) {
      // 对子路由同样进行规范化处理：
      // - 使用当前路由的完整路径作为子路由的父路径
      // - 结果赋值给新路由对象的children
      normalizedRoute.children = normalizeRoutesWithFullPath(
        route.children,
        fullPath, // 将当前完整路径作为子路由的父路径
      )
    }

    // 返回处理后的新路由对象
    return normalizedRoute
  })
}
