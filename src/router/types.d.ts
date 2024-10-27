import type { defineComponent } from 'vue'

import type {
  NavigationGuard,
  RouteMeta,
} from 'vue-router'

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
     *  图标
     */
    icon?: string

    /**
     *   在侧边菜单和面包屑中显示的区域名称
     */
    locale?: string

    /**
     *   是否显示在侧边菜单
     */
    hideInMenu?: boolean

    /**
     *  是否菜单在侧边菜单中不显示
     */
    hideChildrenInMenu?: boolean

    /**
     *  设置了名称，菜单将根据你设置的名称高亮显示
     */
    activeMenu?: string

    /**
     *  菜单栏排序
     */
    order?: number

    /**
     *   不显示面包屑
     */
    noShowBreadcrumb?: boolean

    /**
     *  页面不会被缓存
     */
    ignoreCache?: boolean

    /**
     *   不显示Footer
     */
    noShowFooter?: boolean

    /**
     *  是否是独立的菜单项(在菜单中单独显示,没有子子菜单)
     */
    isStandaloneMenu?: boolean

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
