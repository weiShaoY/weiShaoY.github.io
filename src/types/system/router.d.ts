/** 路由类型 */

/**
 * 路由类型命名空间
 */
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
    /** 路由元信息 */
    meta?: {

      /** 文档标题（可选），用于浏览器标签显示 */
      documentTitle?: string

      /** 是否需要认证才能访问 */
      requiresAuth?: boolean

      /** 是否缓存组件 */
      keepAlive?: boolean
    }
  }

}
