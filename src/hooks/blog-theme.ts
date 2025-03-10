// import { DEFAULT_PRIMARY } from '@/config'

import { useTestStore } from '@/store/modules/test'

import {
  asideTheme,
  headerTheme,
  menuTheme,
} from '@/theme/blog'

import { getDarkColor, getLightColor } from '@/utils'

import { ElMessage } from 'element-plus'

/**
 * @description 全局主题 hooks
 * @returns  提供主题初始化、切换暗黑模式、修改主题色、切换灰色/弱色模式、设置菜单/侧边栏/头部主题的方法
 */
export function useBlogTheme() {
  const testStore = useTestStore()

  /**
   * @description 修改主题颜色
   * @param {string | null} val 主题颜色（若为空，则重置为默认颜色）
   */
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = import.meta.env.VITE_APP_BLOG_THEME_COLOR
      ElMessage({
        type: 'success',
        message: `主题颜色已重置为 ${import.meta.env.VITE_APP_BLOG_THEME_COLOR}`,
      })
    }

    // 设置主题颜色
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      testStore.global.isDark ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`,
    )

    // 计算不同深度的主题色
    for (let i = 1; i <= 9; i++) {
      const primaryColor = testStore.global.isDark
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`

      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        primaryColor,
      )
    }

    testStore.setGlobal('primary', val)
  }

  /**
   * @description 切换灰色模式或弱色模式
   * @param {"grey" | "weak"} type 模式类型（灰色模式 / 弱色模式）
   * @param {boolean} value 是否启用该模式
   */
  const changeGreyOrWeak = (type: BlogType.GreyOrWeakType, value: boolean) => {
    const body = document.body as HTMLElement

    if (!value) {
      return body.removeAttribute('style')
    }

    const styles: Record<BlogType.GreyOrWeakType, string> = {
      grey: 'filter: grayscale(1)', // 灰色模式
      weak: 'filter: invert(80%)', // 弱色模式
    }

    body.setAttribute('style', styles[type])
    const propName = type === 'grey' ? 'isWeak' : 'isGrey'

    testStore.setGlobal(propName, false)
  }

  /**
   * @description 设置菜单主题样式
   */
  const setMenuTheme = () => {
    let type: BlogType.ThemeType = 'light'

    if (testStore.global.layout === 'transverse' && testStore.global.headerInverted) {
      type = 'inverted'
    }

    if (testStore.global.layout !== 'transverse' && testStore.global.asideInverted) {
      type = 'inverted'
    }

    if (testStore.global.isDark) {
      type = 'dark'
    }

    const theme = menuTheme[type!]

    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value)
    }
  }

  /**
   * @description 设置侧边栏主题样式，并同步更新菜单样式
   */
  const setAsideTheme = () => {
    let type: BlogType.ThemeType = 'light'

    if (testStore.global.asideInverted) {
      type = 'inverted'
    }

    if (testStore.global.isDark) {
      type = 'dark'
    }

    const theme = asideTheme[type!]

    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value)
    }

    setMenuTheme()
  }

  /**
   * @description 设置头部主题样式，并同步更新菜单样式
   */
  const setHeaderTheme = () => {
    let type: BlogType.ThemeType = 'light'

    if (testStore.global.headerInverted) {
      type = 'inverted'
    }

    if (testStore.global.isDark) {
      type = 'dark'
    }

    const theme = headerTheme[type!]

    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value)
    }

    setMenuTheme()
  }

  /**
   * @description 切换暗黑模式，并同步更新主题颜色、侧边栏和头部颜色
   */
  const switchDark = () => {
    const html = document.documentElement as HTMLElement

    if (testStore.global.isDark) {
      html.setAttribute('class', 'dark')
    }
    else { html.setAttribute('class', '') }

    changePrimary(testStore.global.primary)
    setAsideTheme()
    setHeaderTheme()
  }

  /**
   * @description 初始化主题（应用暗黑模式、灰色模式、弱色模式等）
   */
  const initTheme = () => {
    switchDark()
    if (testStore.global.isGrey) {
      changeGreyOrWeak('grey', true)
    }

    if (testStore.global.isWeak) {
      changeGreyOrWeak('weak', true)
    }
  }

  return {
    /**
     *  @description 初始化主题
     */
    initTheme,

    /**
     *  @description 切换暗黑模式
     */
    switchDark,

    /**
     *  @description 修改主题颜色
     */
    changePrimary,

    /**
     *  @description 切换灰色/弱色模式
     */
    changeGreyOrWeak,

    /**
     *  @description 设置侧边栏主题
     */
    setAsideTheme,

    /**
     *  @description 设置头部主题
     */
    setHeaderTheme,
  }
}

export default useBlogTheme
