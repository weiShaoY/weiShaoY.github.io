// src/stores/index.ts
// 2025-11-23---03:20---星期天

import { defineStore } from 'pinia'

import { ref } from 'vue'

import { TOOL_CONFIG } from '@/configs/tool'

import { setElementThemeColor } from '@/utils'

/**
 *  Index模块
 */
export const useToolStore = defineStore('tool', () => {
  /** --------------------------------  菜单相关设置  Start -------------------------------- */

  /** 菜单类型 */
  const menuType = ref(TOOL_CONFIG.menuType)

  /** 菜单是否展开 */
  const menuOpen = ref(TOOL_CONFIG.menuOpen)

  /** 菜单展开宽度 */
  const menuOpenWidth = ref(TOOL_CONFIG.menuOpenWidth)

  /** 双菜单是否显示文本 */
  const dualMenuShowText = ref(TOOL_CONFIG.dualMenuShowText)

  /**
   * 切换菜单布局
   * @param type 菜单类型
   */
  const switchMenuLayouts = (type: ToolType.MenuTypeEnum) => {
    menuType.value = type
  }

  /**
   * 设置菜单展开状态
   * @param open 是否展开
   */
  const setMenuOpen = (open: boolean) => {
    menuOpen.value = open
  }

  /**
   * 获取菜单展开宽度
   */
  const getMenuOpenWidth = computed((): string => {
    return `${menuOpenWidth.value}px` || `${TOOL_CONFIG.menuOpenWidth}px`
  })

  /**
   * 设置菜单展开宽度
   * @param width 宽度值
   */
  const setMenuOpenWidth = (width: number) => {
    menuOpenWidth.value = width
  }

  /**
   * 设置双菜单是否显示文本
   * @param show 是否显示
   */
  const setDualMenuShowText = (show: boolean) => {
    dualMenuShowText.value = show
  }

  /** --------------------------------  菜单相关设置  End -------------------------------- */

  /** --------------------------------  主题相关设置  Start -------------------------------- */
  /** 系统主题颜色 */
  const systemThemeColor = ref(TOOL_CONFIG.systemThemeColor)

  /**
   * 设置Element Plus主题颜色
   * @param theme 主题颜色
   */
  const setElementTheme = (theme: string) => {
    systemThemeColor.value = theme
    setElementThemeColor(theme)
  }

  /** --------------------------------  主题相关设置  End -------------------------------- */

  /** --------------------------------  界面显示设置  Start -------------------------------- */

  /** 是否显示菜单按钮 */
  const showMenuButton = ref(TOOL_CONFIG.showMenuButton)

  /** 是否显示快速入口 */
  const showFastEnter = ref(TOOL_CONFIG.showFastEnter)

  /** 是否显示刷新按钮 */
  const showRefreshButton = ref(TOOL_CONFIG.showRefreshButton)

  /** 是否显示面包屑 */
  const showCrumbs = ref(TOOL_CONFIG.showCrumbs)

  /** 是否显示工作台标签 */
  const showWorkTab = ref(TOOL_CONFIG.showWorkTab)

  /** 是否显示水印 */
  const watermarkVisible = ref(TOOL_CONFIG.watermarkVisible)

  /**
   * 切换菜单按钮显示
   */
  const setButton = () => {
    showMenuButton.value = !showMenuButton.value
  }

  /**
   * 切换快速入口显示
   */
  const setFastEnter = () => {
    showFastEnter.value = !showFastEnter.value
  }

  /**
   * 切换刷新按钮显示
   */
  const setShowRefreshButton = () => {
    showRefreshButton.value = !showRefreshButton.value
  }

  /**
   * 切换面包屑显示
   */
  const setCrumbs = () => {
    showCrumbs.value = !showCrumbs.value
  }

  /**
   * 设置工作台标签显示
   * @param show 是否显示
   */
  const setWorkTab = (show: boolean) => {
    showWorkTab.value = show
  }

  /**
   * 设置水印显示
   * @param visible 是否显示
   */
  const setWatermarkVisible = (visible: boolean) => {
    watermarkVisible.value = visible
  }

  /** --------------------------------  界面显示设置  End -------------------------------- */

  /** --------------------------------  功能设置  Start -------------------------------- */
  /** 是否自动关闭 */
  const autoClose = ref(TOOL_CONFIG.autoClose)

  /** 是否唯一展开 */
  const uniqueOpened = ref(TOOL_CONFIG.uniqueOpened)

  /** 是否色弱模式 */
  const colorWeak = ref(TOOL_CONFIG.colorWeak)

  /** 是否刷新 */
  const refresh = ref(TOOL_CONFIG.refresh)

  /**
   * 切换自动关闭
   */
  const setAutoClose = () => {
    autoClose.value = !autoClose.value
  }

  /**
   * 切换唯一展开模式
   */
  const setUniqueOpened = () => {
    uniqueOpened.value = !uniqueOpened.value
  }

  /**
   * 切换色弱模式
   */
  const setColorWeak = () => {
    colorWeak.value = !colorWeak.value
  }

  /**
   * 刷新页面
   */
  const reload = () => {
    refresh.value = !refresh.value
  }

  /** --------------------------------  功能设置  End -------------------------------- */

  /** --------------------------------  样式设置  Start -------------------------------- */
  /** 边框模式 */
  const boxBorderMode = ref(TOOL_CONFIG.boxBorderMode)

  /** 页面过渡效果 */
  const pageTransition = ref(TOOL_CONFIG.pageTransition)

  /** 标签页样式 */
  const tabStyle = ref(TOOL_CONFIG.tabStyle)

  /** 自定义圆角 */
  const customRadius = ref(TOOL_CONFIG.customRadius)

  /** 容器宽度 */
  const containerWidth = ref(TOOL_CONFIG.containerWidth)

  /**
   * 切换边框模式
   */
  const setBorderMode = () => {
    boxBorderMode.value = !boxBorderMode.value
  }

  /**
   * 设置页面过渡效果
   * @param transition 过渡效果名称
   */
  const setPageTransition = (transition: string) => {
    pageTransition.value = transition
  }

  /**
   * 设置标签页样式
   * @param style 样式名称
   */
  const setTabStyle = (style: string) => {
    tabStyle.value = style
  }

  /**
   * 获取自定义圆角
   */
  const getCustomRadius = computed((): string => {
    return `${customRadius.value}rem` || `${TOOL_CONFIG.customRadius}rem`
  })

  /**
   * 设置自定义圆角
   * @param radius 圆角值
   */
  const setCustomRadius = (radius: string) => {
    customRadius.value = radius
    document.documentElement.style.setProperty('--custom-radius', `${radius}rem`)
  }

  /**
   * 设置容器宽度
   * @param width 容器宽度枚举值
   */
  const setContainerWidth = (width: ToolType.ContainerWidthEnum) => {
    containerWidth.value = width
  }

  /** --------------------------------  样式设置  End -------------------------------- */

  return {
  /** --------------------------------  菜单相关设置  Start -------------------------------- */

    /** 菜单类型 */
    menuType,

    /** 菜单是否展开 */
    menuOpen,

    /** 菜单展开宽度 */
    menuOpenWidth,

    /** 双菜单是否显示文本 */
    dualMenuShowText,

    /** 切换菜单布局 */
    switchMenuLayouts,

    /** 设置菜单展开状态 */
    setMenuOpen,

    /** 获取菜单展开宽度 */
    getMenuOpenWidth,

    /** 设置菜单展开宽度 */
    setMenuOpenWidth,

    /** 设置双菜单是否显示文本 */
    setDualMenuShowText,

    /** --------------------------------  菜单相关设置  End -------------------------------- */

    /** --------------------------------  主题相关设置  Start -------------------------------- */
    /** 系统主题颜色 */
    systemThemeColor,

    /** 设置Element Plus主题颜色 */
    setElementTheme,

    /** --------------------------------  主题相关设置  End -------------------------------- */

    /** --------------------------------  界面显示设置  Start -------------------------------- */
    /** 是否显示菜单按钮 */
    showMenuButton,

    /** 是否显示快速入口 */
    showFastEnter,

    /** 是否显示刷新按钮 */
    showRefreshButton,

    /** 是否显示面包屑 */
    showCrumbs,

    /** 是否显示工作台标签 */
    showWorkTab,

    /** 是否显示水印 */
    watermarkVisible,

    /** 切换菜单按钮显示 */
    setButton,

    /** 切换快速入口显示 */
    setFastEnter,

    /** 切换刷新按钮显示 */
    setShowRefreshButton,

    /** 切换面包屑显示 */
    setCrumbs,

    /** 切换工作台标签显示 */
    setWorkTab,

    /** 切换水印显示 */
    setWatermarkVisible,

    /** --------------------------------  界面显示设置  End -------------------------------- */

    /** --------------------------------  功能设置  Start -------------------------------- */
    /** 是否自动关闭 */
    autoClose,

    /** 是否唯一展开 */
    uniqueOpened,

    /** 是否色弱模式 */
    colorWeak,

    /** 切换自动关闭 */
    setAutoClose,

    /** 切换唯一展开模式 */
    setUniqueOpened,

    /** 切换色弱模式 */
    setColorWeak,

    /** 刷新页面 */
    reload,

    /** --------------------------------  功能设置  End -------------------------------- */

    /** --------------------------------  样式设置  Start -------------------------------- */
    /** 边框模式 */
    boxBorderMode,

    /** 页面过渡效果 */
    pageTransition,

    /** 标签页样式 */
    tabStyle,

    /** 自定义圆角 */
    customRadius,

    /** 容器宽度 */
    containerWidth,

    /** 切换边框模式 */
    setBorderMode,

    /** 设置页面过渡效果 */
    setPageTransition,

    /** 设置标签页样式 */
    setTabStyle,

    /** 获取自定义圆角 */
    getCustomRadius,

    /** 设置自定义圆角 */
    setCustomRadius,

    /** 设置容器宽度 */
    setContainerWidth,

    /** --------------------------------  样式设置  End -------------------------------- */
  }
})
