import type { VNode } from 'vue'

import type { RouteParams, RouteRecordRaw } from 'vue-router'

/**
 * 路由元信息
 */
export type RouteMeta = {

  /**
   * antd 菜单选中项的 key
   */
  key: string

  /**
   * 菜单标签，支持国际化
   */
  label: string

  /**
   * 菜单前缀图标
   */
  icon?: VNode

  /**
   * 菜单后缀图标
   */
  suffix?: VNode

  /**
   * 是否在菜单中隐藏
   */
  hideMenu?: boolean

  /**
   * 是否在多标签页中隐藏
   */
  hideTab?: boolean

  /**
   * 菜单项是否禁用
   */
  disabled?: boolean

  /**
   * 是否为 Vue Router 的 Outlet
   */
  outlet?: any

  /**
   * 用于刷新标签的时间戳
   */
  timeStamp?: string

  /**
   * 外部链接或 iframe 的地址
   */
  frameSrc?: string

  /**
   * 动态路由参数
   *
   * @example /user/:id
   */
  params?: RouteParams
}

/**
 * 应用路由对象
 */
export type AppRouteObject = {

  /**
   * 路由排序序号
   */
  order?: number

  /**
   * 路由的元信息
   */
  meta?: RouteMeta

  /**
   * 子路由列表
   */
  children?: AppRouteObject[]
} & Omit<RouteRecordRaw, 'children'>
