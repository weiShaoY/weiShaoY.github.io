/**
 *
 * @module useTheme
 * @description  主题相关的 hooks
 */

import type { SystemThemeTypes } from '@/types/tool'

import { usePreferredDark } from '@vueuse/core' //  从 VueUse 引入 usePreferredDark hook，用于检测系统是否偏好暗黑模式

import { watch } from 'vue'

import { TOOL_CONFIG } from '@/configs'

import { SystemThemeEnum } from '@/enums/tool' //  系统主题枚举，包含 light, dark, auto

import { useToolStore } from '@/stores'

import {
  getDarkColor,
  getLightColor,
  setElementThemeColor,
} from '@/utils/ui' //  UI 工具函数，用于获取颜色深浅，设置 element-plus 主题色

export function useTheme() {
  const toolStore = useToolStore() //  获取 setting store 实例

  // 禁用过渡效果
  const disableTransitions = () => {
    const style = document.createElement('style')

    style.setAttribute('id', 'disable-transitions')
    style.textContent = '* { transition: none !important; }' //  禁用所有元素的过渡效果
    document.head.appendChild(style)
  }

  // 启用过渡效果
  const enableTransitions = () => {
    const style = document.getElementById('disable-transitions')

    if (style) {
      style.remove() //  移除禁用的过渡效果样式
    }
  }

  // 设置系统主题
  const setSystemTheme = (theme: SystemThemeEnum, themeMode?: SystemThemeEnum) => {
    // 临时禁用过渡效果，防止切换主题时出现闪烁
    disableTransitions()

    const el = document.getElementsByTagName('html')[0] //  获取 HTML 元素

    const isDark = theme === SystemThemeEnum.DARK //  是否是暗黑主题

    if (!themeMode) {
      themeMode = theme //  如果没有指定主题模式，则使用主题类型
    }

    const currentTheme = TOOL_CONFIG.systemThemeStyles[theme as keyof SystemThemeTypes] //  获取当前主题样式配置

    if (currentTheme) {
      el.setAttribute('class', currentTheme.className) //  设置 HTML 元素的 class，应用主题样式
    }

    // 设置按钮颜色加深或变浅
    const primary = toolStore.settingObj.systemThemeColor //  获取主题色

    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`, //  根据主题色生成浅色/深色颜色，并设置到 CSS 变量
      )
    }

    // 更新store中的主题设置
    toolStore.settingObj.setGlopTheme(theme, themeMode) //  更新 store 中的主题类型和模式

    // 使用 requestAnimationFrame 确保在下一帧恢复过渡效果，减少闪烁
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        enableTransitions()
      })
    })
  }

  // 使用 VueUse 的 usePreferredDark 检测系统主题偏好
  const prefersDark = usePreferredDark()

  // 自动设置系统主题
  const setSystemAutoTheme = () => {
    const theme = prefersDark.value ? SystemThemeEnum.DARK : SystemThemeEnum.LIGHT //  根据系统偏好设置主题

    setSystemTheme(theme, SystemThemeEnum.AUTO) //  设置主题为 auto 模式
  }

  // 切换主题
  const switchThemeStyles = (theme: SystemThemeEnum) => {
    if (theme === SystemThemeEnum.AUTO) {
      setSystemAutoTheme() //  自动模式，根据系统设置
    }
    else {
      setSystemTheme(theme) //  手动切换主题
    }
  }

  return {
    setSystemTheme, //  设置系统主题
    setSystemAutoTheme, //  设置自动主题
    switchThemeStyles, //  切换主题
    prefersDark, //  系统是否偏好暗黑模式
  }
}

/**
 * 初始化主题系统
 */
export function initializeTheme() {
  const toolStore = useToolStore() //  获取 setting store 实例

  const prefersDark = usePreferredDark() //  检测系统是否偏好暗黑模式

  // 根据系统偏好应用主题
  const applyThemeByMode = () => {
    const el = document.getElementsByTagName('html')[0] //  获取 HTML 元素

    let actualTheme = toolStore.settingObj.systemThemeType //  实际应用的主题类型

    // 如果是 AUTO 模式，检测系统偏好
    if (toolStore.settingObj.systemThemeMode === SystemThemeEnum.AUTO) {
      //  根据系统偏好设置主题
      actualTheme = prefersDark.value ? SystemThemeEnum.DARK : SystemThemeEnum.LIGHT

      // 更新实际应用的主题类型
      toolStore.settingObj.systemThemeType = actualTheme
    }

    // 设置主题 class
    const currentTheme = TOOL_CONFIG.systemThemeStyles[actualTheme as keyof SystemThemeTypes] //  获取主题样式

    if (currentTheme) {
      el.setAttribute('class', currentTheme.className) //  设置 HTML 元素的 class，应用主题样式
    }

    // 设置主题颜色
    setElementThemeColor(toolStore.settingObj.systemThemeColor) //  设置 element-plus 组件的主题色

    // 设置圆角
    document.documentElement.style.setProperty('--custom-radius', `${toolStore.settingObj.customRadius}rem`) //  设置全局圆角大小
  }

  // 应用主题
  applyThemeByMode() //  初始化应用主题

  // 如果是 AUTO 模式，监听系统主题变化（使用 VueUse 的响应式特性）
  if (toolStore.settingObj.systemThemeMode === SystemThemeEnum.AUTO) {
    watch(
      prefersDark,
      () => {
        // 只有在 AUTO 模式下才响应系统主题变化
        if (toolStore.settingObj.systemThemeMode === SystemThemeEnum.AUTO) {
          applyThemeByMode() //  应用主题
        }
      },
      {
        immediate: false, //  初始不立即执行
      },
    )
  }
}
