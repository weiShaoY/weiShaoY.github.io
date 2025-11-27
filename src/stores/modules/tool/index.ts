// src/stores/index.ts
// 2025-11-23---03:20---星期天

import type {
  ContainerWidthEnum,
  MenuThemeEnum,
  MenuTypeEnum,

} from '@/enums/tool'

import { defineStore } from 'pinia'

import { ref } from 'vue'

import { TOOL_CONFIG } from '@/configs/tool'

import { SystemThemeEnum } from '@/enums/tool'

import { setElementThemeColor } from '@/utils'

/**
 *  Index模块
 */
export const useToolStore = defineStore('tool', () => {
  const settingObj = ref({

    /** --------------------------------  菜单相关设置  Start -------------------------------- */

    /** 菜单类型 */
    menuType: TOOL_CONFIG.setting.menuType,

    /** 菜单是否展开 */
    menuOpen: TOOL_CONFIG.setting.menuOpen,

    /** 菜单展开宽度 */
    menuOpenWidth: TOOL_CONFIG.setting.menuOpenWidth,

    /** 双菜单是否显示文本 */
    dualMenuShowText: TOOL_CONFIG.setting.dualMenuShowText,

    /**
     * 切换菜单布局
     * @param type 菜单类型
     */
    switchMenuLayouts(type: MenuTypeEnum) {
      settingObj.value.menuType = type
    },

    /**
     * 设置菜单展开状态
     * @param open 是否展开
     */
    setMenuOpen(open: boolean) {
      settingObj.value.menuOpen = open
    },

    /**
     * 获取菜单展开宽度
     */
    getMenuOpenWidth() {
      return `${settingObj.value.menuOpenWidth}px`
    },

    /**
     * 设置菜单展开宽度
     * @param width 宽度值
     */
    setMenuOpenWidth(width: number) {
      settingObj.value.menuOpenWidth = width
    },

    /**
     * 设置双菜单是否显示文本
     * @param show 是否显示文本
     */
    setDualMenuShowText(show: boolean) {
      settingObj.value.dualMenuShowText = show
    },

    /** --------------------------------  菜单相关设置  End -------------------------------- */

    /** --------------------------------  主题相关设置  Start -------------------------------- */

    /** 系统主题类型 */
    systemThemeType: TOOL_CONFIG.setting.systemThemeType,

    /** 系统主题模式 */
    systemThemeMode: TOOL_CONFIG.setting.systemThemeMode,

    /** 菜单主题类型 */
    menuThemeType: TOOL_CONFIG.setting.menuThemeType,

    /** 系统主题颜色 */
    systemThemeColor: TOOL_CONFIG.setting.systemThemeColor,

    /**
     * 设置全局主题
     * @param theme 主题类型
     * @param themeMode 主题模式
     */
    setGlopTheme(theme: SystemThemeEnum, themeMode: SystemThemeEnum) {
      settingObj.value.systemThemeType = theme
      settingObj.value.systemThemeMode = themeMode

      // localStorage.setItem(StorageConfig.THEME_KEY, theme)
    },

    /**
     * 设置Element Plus主题颜色
     * @param theme 主题颜色
     */
    setElementTheme(theme: string) {
      settingObj.value.systemThemeColor = theme
      setElementThemeColor(theme)
    },

    /**
     * 切换菜单样式
     * @param theme 菜单主题
     */
    switchMenuStyles(theme: MenuThemeEnum) {
      settingObj.value.menuThemeType = theme
    },

    /**
     * 判断是否为暗色模式
     */
    isDark() {
      return settingObj.value.systemThemeType === SystemThemeEnum.DARK
    },

    /** --------------------------------  主题相关设置  End -------------------------------- */

    /** --------------------------------  界面显示设置  Start -------------------------------- */
    /** 是否显示菜单按钮 */
    showMenuButton: TOOL_CONFIG.setting.showMenuButton,

    /** 是否显示快速入口 */
    showFastEnter: TOOL_CONFIG.setting.showFastEnter,

    /** 是否显示刷新按钮 */
    showRefreshButton: TOOL_CONFIG.setting.showRefreshButton,

    /** 是否显示面包屑 */
    showCrumbs: TOOL_CONFIG.setting.showCrumbs,

    /** 是否显示工作台标签 */
    showWorkTab: TOOL_CONFIG.setting.showWorkTab,

    /** 是否显示水印 */
    watermarkVisible: TOOL_CONFIG.setting.watermarkVisible,

    /**
     * 切换菜单按钮显示
     */
    setButton() {
      settingObj.value.showMenuButton = !settingObj.value.showMenuButton
    },

    /**
     * 切换快速入口显示
     */
    setFastEnter() {
      settingObj.value.showFastEnter = !settingObj.value.showFastEnter
    },

    /**
     * 切换刷新按钮显示
     */
    setShowRefreshButton() {
      settingObj.value.showRefreshButton = !settingObj.value.showRefreshButton
    },

    /** 是否显示面包屑 */
    setCrumbs() {
      settingObj.value.showCrumbs = !settingObj.value.showCrumbs
    },

    /** 是否显示工作台标签 */
    setWorkTab(show: boolean) {
      settingObj.value.showWorkTab = show
    },

    /** 是否显示水印 */
    setWatermarkVisible(visible: boolean) {
      settingObj.value.watermarkVisible = visible
    },

    /** --------------------------------  界面显示设置  End -------------------------------- */

    /** --------------------------------  功能设置  Start -------------------------------- */
    /** 是否自动关闭 */
    autoClose: TOOL_CONFIG.setting.autoClose,

    /** 是否唯一展开 */
    uniqueOpened: TOOL_CONFIG.setting.uniqueOpened,

    /** 是否色弱模式 */
    colorWeak: TOOL_CONFIG.setting.colorWeak,

    /** 是否刷新 */
    refresh: TOOL_CONFIG.setting.refresh,

    /**
     * 设置自动关闭
     * @param close 是否自动关闭
     */
    setAutoClose(close: boolean) {
      settingObj.value.autoClose = close
    },

    /**
     * 切换唯一展开模式
     */
    setUniqueOpened() {
      settingObj.value.uniqueOpened = !settingObj.value.uniqueOpened
    },

    /**
     * 切换色弱模式
     */
    setColorWeak() {
      settingObj.value.colorWeak = !settingObj.value.colorWeak
    },

    /**
     * 刷新页面
     */
    reload() {
      settingObj.value.refresh = !settingObj.value.refresh
    },

    /** --------------------------------  功能设置  End -------------------------------- */

    /** --------------------------------  样式设置  Start -------------------------------- */
    /** 边框模式 */
    boxBorderMode: TOOL_CONFIG.setting.boxBorderMode,

    /** 页面过渡效果 */
    pageTransition: TOOL_CONFIG.setting.pageTransition,

    /** 标签页样式 */
    tabStyle: TOOL_CONFIG.setting.tabStyle,

    /** 自定义圆角 */
    customRadius: TOOL_CONFIG.setting.customRadius,

    /** 容器宽度 */
    containerWidth: TOOL_CONFIG.setting.containerWidth,

    /**
     * 切换边框模式
     */
    setBorderMode() {
      settingObj.value.boxBorderMode = !settingObj.value.boxBorderMode
    },

    /**
     * 设置页面过渡效果
     * @param transition 过渡效果名称
     */
    setPageTransition(transition: string) {
      settingObj.value.pageTransition = transition
    },

    /**
     * 设置标签页样式
     * @param style 标签页样式名称
     */
    setTabStyle(style: string) {
      settingObj.value.tabStyle = style
    },

    /**
     * 获取自定义圆角
     */
    getCustomRadius() {
      return `${settingObj.value.customRadius}rem` || `${TOOL_CONFIG.setting.customRadius}rem`
    },

    /**
     * 设置自定义圆角
     * @param radius 圆角值
     */
    setCustomRadius(radius: string) {
      settingObj.value.customRadius = radius
      document.documentElement.style.setProperty('--custom-radius', `${radius}rem`)
    },

    /**
     * 设置容器宽度
     * @param width 容器宽度枚举值
     */
    setContainerWidth(width: ContainerWidthEnum) {
      settingObj.value.containerWidth = width
      document.documentElement.style.setProperty('--container-width', width)
    },

    /** --------------------------------  样式设置  End -------------------------------- */

  })

  const menuObj = ref(
    {
    /** 首页路径 */
      homePath: '',

      /** 菜单列表 */
      menuList: [],

      /** 菜单宽度 */
      menuWidth: '',

      /** 存储路由移除函数的数组 */
      removeRoutes: [],

    /**
     * 设置菜单列表
     * @param list 菜单列表
     */
    // setMenuList(list: []) {
    //   menuObj.menuList = list
    // },
    },
  )

  return {
    settingObj,
    menuObj,
  }
})
