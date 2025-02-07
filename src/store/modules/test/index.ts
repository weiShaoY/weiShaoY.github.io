import {

  // StorageEnum,
  ThemeColorPresets,
  ThemeLayout,
  ThemeMode,
} from '@/layouts/test/types/enum'

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 设置类型
 */
type SettingsType = {

  /**
   * 主题颜色预设
   */
  themeColorPresets: ThemeColorPresets

  /**
   * 主题模式（光明或黑暗）
   */
  themeMode: ThemeMode

  /**
   * 主题布局（垂直、水平或迷你）
   */
  themeLayout: ThemeLayout

  /**
   * 是否拉伸主题布局
   */
  themeStretch: boolean

  /**
   * 是否显示面包屑导航
   */
  breadCrumb: boolean

  /**
   * 是否启用多标签页
   */
  multiTab: boolean

  /**
   * 是否使用黑暗侧边栏
   */
  darkSidebar: boolean

  /**
   * 字体族
   */
  fontFamily: string

  /**
   * 字体大小（以像素为单位）
   */
  fontSize: number

  /**
   * 文字方向（从左到右或从右到左）
   */
  direction: 'ltr' | 'rtl'
}

/**
 * 定义名为 'test' 的 store
 */
export const useTestStore = defineStore(
  'test',
  () => {
    const settings = ref<SettingsType>({
      themeColorPresets: ThemeColorPresets.Default,
      themeMode: ThemeMode.Light,
      themeLayout: ThemeLayout.Vertical,
      themeStretch: false,
      breadCrumb: true,
      multiTab: true,
      darkSidebar: false,
      fontFamily: 'Public Sans, sans-serif',
      fontSize: 14,
      direction: 'ltr',
    })

    function setSettings(newSettings: Partial<SettingsType>) {
      settings.value = {
        ...settings.value,
        ...newSettings,
      }
    }

    function clearSettings() {
      settings.value = {
        themeColorPresets: ThemeColorPresets.Default,
        themeMode: ThemeMode.Light,
        themeLayout: ThemeLayout.Vertical,
        themeStretch: false,
        breadCrumb: true,
        multiTab: true,
        darkSidebar: false,
        fontFamily: 'Public Sans, sans-serif',
        fontSize: 14,
        direction: 'ltr',
      }
    }

    return {
      settings,
      setSettings,
      clearSettings,
    }
  },
  {
    persist: true,
  },
)
