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
     *  图标
     */
    icon?: string

    /**
     *   在侧边菜单和面包屑中显示的区域名称
     */
    locale?: string

    /**
     *   是否在左侧菜单中隐藏该项
     */
    hideInMenu?: boolean

    /**
     *  强制在左侧菜单中显示单项
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
     *  如果设置为true，标签将不会添加到tab-bar中
     */
    noAffix?: boolean

    /**
     *  页面不会被缓存
     */
    ignoreCache?: boolean

    /**
     *   不显示Footer
     */
    noShowFooter?: boolean

    /**
     *   不显示面包屑
     */
    noShowBreadcrumb?: boolean

    /**
     *   在iframe中打开的url
     */
    iframeUrl?: string

    /**
     *  文档标题
     */
    documentTitle?: string
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
