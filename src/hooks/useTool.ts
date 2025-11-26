/**
 * useTool - 工具模块
 *
 * @module useTool
 */

import { computed } from 'vue'

import { TOOL_CONFIG } from '@/configs/tool'

import { useToolStore } from '@/stores'

// 功能配置项基础接口
export type FeatureConfigItem = {

  /**
   * 是否启用该功能
   */
  enabled: boolean

  /**
   * 功能描述
   */
  description: string
}

// 顶部栏功能配置接口
export type HeaderBarFeatureConfig = {

  /** 菜单按钮 */
  menuButton: FeatureConfigItem

  /** 刷新按钮 */
  refreshButton: FeatureConfigItem

  /** 快速入口 */
  fastEnter: FeatureConfigItem

  /** 面包屑导航 */
  breadcrumb: FeatureConfigItem

  /** 全局搜索 */
  globalSearch: FeatureConfigItem

  /** 全屏功能 */
  fullscreen: FeatureConfigItem

  /** 通知功能 */
  notification: FeatureConfigItem

  /** 聊天功能 */
  chat: FeatureConfigItem

  /** 多语言切换 */
  language: FeatureConfigItem

  /** 设置面板 */
  settings: FeatureConfigItem

  /** 主题切换 */
  themeToggle: FeatureConfigItem
}

export function useToolCommon() {
  const toolStore = useToolStore()

  /**
   * 首页路径
   * 从菜单 store 中获取配置的首页路径
   */
  const homePath = computed(() => toolStore.menuObj.homePath)

  /**
   * 刷新当前页面
   * 通过切换 setting store 中的 refresh 状态触发页面重新渲染
   */
  const refresh = () => {
    toolStore.settingObj.reload()
  }

  /**
   *  获取顶部栏配置
   */
  // const headerBarConfigRef = computed(() => TOOL_CONFIG.headerBar)

  // /**
  //  * 检查特定功能是否启用
  //  * @param feature 功能名称
  //  * @returns 是否启用
  //  */
  // const isFeatureEnabled = (feature: keyof HeaderBarFeatureConfig): boolean => {
  //   return headerBarConfigRef.value[feature]?.enabled ?? false
  // }

  // /**
  //  * 获取功能配置信息
  //  * @param feature 功能名称
  //  * @returns 功能配置信息
  //  */
  // const getFeatureConfig = (feature: keyof HeaderBarFeatureConfig) => {
  //   return headerBarConfigRef.value[feature]
  // }

  // // 检查菜单按钮是否显示
  // const shouldShowMenuButton = computed(() => {
  //   return isFeatureEnabled('menuButton') && toolStore.settingObj.showMenuButton
  // })

  // // 检查刷新按钮是否显示
  // const shouldShowRefreshButton = computed(() => {
  //   return isFeatureEnabled('refreshButton') && toolStore.settingObj.showRefreshButton
  // })

  // // 检查快速入口是否显示
  // const shouldShowFastEnter = computed(() => {
  //   return isFeatureEnabled('fastEnter') && toolStore.settingObj.showFastEnter
  // })

  // // 检查面包屑是否显示
  // const shouldShowBreadcrumb = computed(() => {
  //   return isFeatureEnabled('breadcrumb') && toolStore.settingObj.showCrumbs
  // })

  // // 检查全局搜索是否显示
  // const shouldShowGlobalSearch = computed(() => {
  //   return isFeatureEnabled('globalSearch')
  // })

  // // 检查全屏按钮是否显示
  // const shouldShowFullscreen = computed(() => {
  //   return isFeatureEnabled('fullscreen')
  // })

  // // 检查通知中心是否显示
  // const shouldShowNotification = computed(() => {
  //   return isFeatureEnabled('notification')
  // })

  // // 检查聊天功能是否显示
  // const shouldShowChat = computed(() => {
  //   return isFeatureEnabled('chat')
  // })

  // // 检查设置面板是否显示
  // const shouldShowSettings = computed(() => {
  //   return isFeatureEnabled('settings')
  // })

  // // 检查主题切换是否显示
  // const shouldShowThemeToggle = computed(() => {
  //   return isFeatureEnabled('themeToggle')
  // })

  // // 获取快速入口的最小宽度
  // const fastEnterMinWidth = computed(() => {
  //   const config = getFeatureConfig('fastEnter')

  //   return (config as any)?.minWidth || 1200
  // })

  // /**
  //  * 检查功能是否启用（别名）
  //  * @param feature 功能名称
  //  * @returns 是否启用
  //  */
  // const isFeatureActive = (feature: keyof HeaderBarFeatureConfig): boolean => {
  //   return isFeatureEnabled(feature)
  // }

  // /**
  //  * 获取功能配置（别名）
  //  * @param feature 功能名称
  //  * @returns 功能配置
  //  */
  // const getFeatureInfo = (feature: keyof HeaderBarFeatureConfig) => {
  //   return getFeatureConfig(feature)
  // }

  // /**
  //  * 获取所有启用的功能列表
  //  * @returns 启用的功能名称数组
  //  */
  // const getEnabledFeatures = (): (keyof HeaderBarFeatureConfig)[] => {
  //   return Object.keys(headerBarConfigRef.value).filter(
  //     key => headerBarConfigRef.value[key as keyof HeaderBarFeatureConfig]?.enabled,
  //   ) as (keyof HeaderBarFeatureConfig)[]
  // }

  // /**
  //  * 获取所有禁用的功能列表
  //  * @returns 禁用的功能名称数组
  //  */
  // const getDisabledFeatures = (): (keyof HeaderBarFeatureConfig)[] => {
  //   return Object.keys(headerBarConfigRef.value).filter(
  //     key => !headerBarConfigRef.value[key as keyof HeaderBarFeatureConfig]?.enabled,
  //   ) as (keyof HeaderBarFeatureConfig)[]
  // }

  // /**
  //  * 获取所有启用的功能（别名）
  //  * @returns 启用的功能列表
  //  */
  // const getActiveFeatures = () => {
  //   return getEnabledFeatures()
  // }

  // /**
  //  * 获取所有禁用的功能（别名）
  //  * @returns 禁用的功能列表
  //  */
  // const getInactiveFeatures = () => {
  //   return getDisabledFeatures()
  // }

  const headerBar = ref({
    /**
     *  获取顶部栏配置
     */
    headerBarConfigRef: TOOL_CONFIG.headerBar,

    /**
     * 检查菜单按钮是否显示
     */
    // shouldShowMenuButton: computed(() => {
    //   return isFeatureEnabled('menuButton') && toolStore.settingObj.showMenuButton
    // }),
  })

  /**
   * 检查特定功能是否启用
   * @param feature 功能名称
   * @returns 是否启用
   */
  // const isFeatureEnabled = (feature: keyof HeaderBarFeatureConfig): boolean => {
  //   return headerBar.value.headerBarConfigRef[feature]?.enabled ?? false
  // }

  return {
    homePath,
    refresh,

    // /////////////////////////////
  }
}
