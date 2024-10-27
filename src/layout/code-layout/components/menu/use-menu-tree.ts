import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

import { codeRoutes } from '@/router/code'

import { cloneDeep } from 'lodash'

import { computed } from 'vue'

/**
 *  克隆 appRoutes 数组
 */
const mixinRoutes = [...codeRoutes]

/**
 * 将路由配置映射到客户端菜单
 */
const codeMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el

  return {
    name,
    path,
    meta,
    redirect,
    children,
  }
})

// 导出 useMenuTree 函数
export default function useMenuTree() {
  /**
   *  菜单树
   */
  const menuTree = computed(() => {
    /**
     *  创建一个 appRoute 的深度副本以避免突变
     */
    const copyRouter = cloneDeep(codeMenus) as RouteRecordNormalized[]

    /**
     *  根据元数据中的 order 对路由进行排序
     */
    copyRouter.sort((a: any, b: any) => {
      return (a.meta.order || 0) - (b.meta.order || 0)
    })

    /**
     *  创建一个递归函数，返回菜单树结构
     */
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) {
        return null
      }

      /**
       *  映射每个路由以创建新数组
       */
      const collector: any = _routes.map((element) => {
        // 检查路由是否为叶节点或需要在菜单中隐藏其子项
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []

          return element
        }

        // 根据是否需要在菜单中隐藏将子项过滤出来
        element.children = element.children.filter(
          x => x.meta?.hideInMenu !== true,
        )

        /**
         *  递归调用 travel 函数以创建子项
         */
        const subItem = travel(element.children, layer + 1)

        // 检查子项是否存在，如果存在，则将其添加到子节点数组中
        if (subItem.length) {
          element.children = subItem

          return element
        }

        // 检查层级是否大于1，并在条件成立时添加子项
        if (layer > 1) {
          element.children = subItem

          return element
        }

        // 检查路由是否应在菜单中隐藏
        if (element.meta?.hideInMenu === false) {
          return element
        }

        return null
      })

      // 过滤掉收集器数组中的任何空值
      return collector.filter(Boolean)
    }

    // 为根路由调用 travel 函数
    return travel(copyRouter, 0)
  })

  return {
    /**
     *  菜单树
     */
    menuTree,
  }
}
