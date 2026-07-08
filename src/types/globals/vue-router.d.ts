import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface RouteMeta {

    /** 文档标题（可选），用于浏览器标签显示 */
    documentTitle?: string

    /** 是否隐藏在菜单中 */
    isHideInMenu?: boolean

    /** 是否缓存组件 */
    keepAlive?: boolean

    /** 路由排序 */
    order?: number

    /** 是否需要认证才能访问 */
    requiresAuth?: boolean

    /** 路由角色权限 */
    roles?: string[] | number

    /** 路由标题 */
    title?: string
  }
}

export {}
