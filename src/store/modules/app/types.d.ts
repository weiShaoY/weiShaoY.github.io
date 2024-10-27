import type { RouteRecordNormalized } from 'vue-router'

export type AppState = {

  /**
   * 主题
   */
  theme: string

  /**
   * 是否为暗色主题
   */
  colorWeak: boolean

  /**
   * 是否显示导航栏
   */
  navbar: boolean

  /**
   * 是否显示菜单
   */
  menu: boolean

  /**
   * 是否显示顶部菜单
   */
  topMenu: boolean

  /**
   * 是否隐藏菜单
   */
  hideMenu: boolean

  /**
   * 菜单是否折叠
   */
  menuCollapse: boolean

  /**
   * 是否显示页脚
   */
  footer: boolean

  /**
   * 主题颜色
   */
  themeColor: string

  /**
   * 菜单宽度
   */
  menuWidth: number

  /**
   * 是否显示全局设置
   */
  globalSettings: boolean

  /**
   * 当前设备
   */
  device: string

  /**
   * 是否显示标签栏
   */
  tabBar: boolean

  /**
   *  是否显示面包屑
   */
  breadcrumb: boolean

  /**
   * 菜单是否从服务器获取
   */
  menuFromServer: boolean

  /**
   * 服务器菜单
   */
  serverMenu: RouteRecordNormalized[]

  /**
   * 动态属性
   */
  [key: string]: unknown
}
