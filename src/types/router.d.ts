/** 路由类型 */

declare namespace RouterType {
  import type { Component } from 'vue'

  import type { RouteRecordRedirectOption } from 'vue-router'

  /** 路由类型 */
  type RouteRecordRaw = {

    /** 路由路径，例如 `/home` */
    path: string

    /** 路由名称（可选），用于命名路由 */
    name?: string

    /** 路由对应的组件，可以是直接的 Vue 组件或返回 Promise 的动态导入函数 */
    component?: Component | (() => Promise<Component>)

    /** 路由重定向 */
    redirect?: RouteRecordRedirectOption

    /** 路由别名，可以是字符串或字符串数组 */
    alias?: string | string[]

    /** 子路由配置数组 */
    children?: RouteRecordRaw[]

    /** 额外的元信息，可以存储权限、标题、缓存等自定义数据 */
    meta?: Record<string, any>
  }

  /** 博客模块路由类型 */
  type BlogRouteRecordRaw = {

    /** 路由路径 */
    path: string

    /** 路由名称（唯一标识） */
    name: string

    /** 重定向地址 */
    redirect?: RouteRecordRedirectOption

    /** 组件路径的异步导入 */
    component?: Component | (() => Promise<Component>)

    /** 路由元信息 */
    meta: {

      /** 菜单显示标题（必填） */
      title: string

      /** 菜单图标组件 */
      icon?: string

      /** 是否在菜单中隐藏该路由 */
      isHideInMenu?: boolean

      /** 进入该路由时激活的菜单键 */
      activeMenu?: string

      /** 是否缓存组件 */
      keepAlive?: boolean

      /** 菜单排序（越小越靠前） */
      order?: number

      /** 文本徽标内容 */
      textBadge?: string

      /** 图标徽标组件（优先级高于textBadge） */
      iconBadge?: string

      /** 是否显示默认徽标 */
      defaultBadge?: boolean

      /** 若设置，路由将在标签页中固定显示，其值表示固定标签页的顺序（首页是特殊的，它将自动保持fixed） */
      fixedTabIndex?: number
    } & (
      | {

        /** 外链跳转地址 */
        externalUrl: string

        /** 内嵌iframe地址（禁止同时存在） */
        iframeUrl?: never
      }
      | {

        /** 内嵌iframe地址 */
        iframeUrl: string

        /** 外链跳转地址（禁止同时存在） */
        externalUrl?: never
      }
      | {

        /** 外链跳转地址（禁止同时存在） */
        externalUrl?: never

        /** 内嵌iframe地址（禁止同时存在） */
        iframeUrl?: never
      }
    )

    /** 子路由配置（如果存在 externalUrl 或 iframeUrl，则禁止 children） */
    children?: BlogRouteRecordRaw[]
  } & (
    | {
      meta: { externalUrl: string } | { iframeUrl: string }

      /** 如果 meta 有 externalUrl 或 iframeUrl，则禁止 children */
      children?: never
    }
    | {
      meta: { externalUrl?: never, iframeUrl?: never }

      /** 如果 meta 没有 externalUrl 或 iframeUrl，则允许 children */
      children?: BlogRouteRecordRaw[]
    }
  )
}
