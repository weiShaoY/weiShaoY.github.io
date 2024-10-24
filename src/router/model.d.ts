import type { defineComponent } from 'vue'

import type { NavigationGuard, RouteMeta } from 'vue-router'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export type AppRouteRecordRaw = {

  /**
   *  路由路径
   */
  path: string

  /**
   *   路由名称
   */
  name?: string | symbol

  /**
   *   路由元信息
   */
  meta?: RouteMeta & {

    /**
     *   不显示面包屑
     */
    noShowBreadcrumb?: boolean

    /**
     *   不显示Footer
     */
    noShowFooter?: boolean
  }

  /**
   *   路由重定向
   */
  redirect?: string | { name: string }

  /**
   *   路由组件
   */
  component?: Component | string

  /**
   *   子路由
   */
  children?: AppRouteRecordRaw[]

  /**
   *   路由别名
   */
  alias?: string | string[]

  /**
   *   路由参数
   */
  props?: Record<string, any>

  /**
   *   路由守卫
   */
  beforeEnter?: NavigationGuard | NavigationGuard[]

  /**
   *   路由完整路径
   */
  fullPath?: string

  /**
   *   菜单中是否显示
   */
  hideInMenu?: boolean
}
