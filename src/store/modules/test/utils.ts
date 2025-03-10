/**
 *  使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 *  @param  menuList 菜单列表
 */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param  menuList 菜单列表
 * @param  parent 父级菜单
 * @param  result 处理后的结果
 */
export function getAllBreadcrumbList(menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {
}) {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children) {
      getAllBreadcrumbList(item.children, result[item.path], result)
    }
  }

  return result
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param  menuList 菜单列表
 */
export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}
