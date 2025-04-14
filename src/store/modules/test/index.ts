// src/stores/index.ts
// 2025-04-14---17:00---星期一

import {
  breakpointsTailwind,
  useBreakpoints,
  useEventListener,
} from '@vueuse/core'

import { defineStore } from 'pinia'

import { a } from 'unplugin-vue-router/types-CTGkmk9e'

import { ref } from 'vue'

import { transformMenuToSearchMenuList } from './shared'

const breakpoints = useBreakpoints(breakpointsTailwind)

const osTheme = usePreferredColorScheme()

/**
 *  Index模块
 */
export const useTestStore = defineStore('test', () => {
  const theme = ref<BlogType.Theme>({
    themeScheme: 'light',
    grayscale: false,
    colourWeakness: false,
    recommendColor: false,
    themeColor: '#646cff',
    otherColor: {
      info: '#2080f0',
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
    },
    isInfoFollowPrimary: true,
    resetCacheStrategy: 'close',
    layout: {
      mode: 'vertical',
      scrollMode: 'content',
      reverseHorizontalMix: false,
    },
    page: {
      animate: true,
      animateMode: 'fade-slide',
    },
    header: {
      height: 56,
      breadcrumb: {
        visible: true,
        showIcon: true,
      },
    },
    tab: {
      visible: true,
      cache: true,
      height: 44,
      mode: 'chrome',
    },
    fixedHeaderAndTab: true,
    sider: {
      inverted: false,
      width: 220,
      collapsedWidth: 64,
      mixWidth: 90,
      mixCollapsedWidth: 64,
      mixChildMenuWidth: 200,
    },
    footer: {
      visible: true,
      fixed: false,
      height: 48,
      right: true,
    },
    watermark: {
      visible: false,
      text: 'SoybeanAdmin',
    },
    tokens: {
      light: {
        colors: {
          'container': 'rgb(255, 255, 255)',
          'layout': 'rgb(247, 250, 252)',
          'inverted': 'rgb(0, 20, 40)',
          'base-text': 'rgb(31, 31, 31)',
        },
        boxShadow: {
          header: '0 1px 2px rgb(0, 21, 41, 0.08)',
          sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
          tab: '0 1px 2px rgb(0, 21, 41, 0.08)',
        },
      },
      dark: {
        colors: {
          'container': 'rgb(28, 28, 28)',
          'layout': 'rgb(18, 18, 18)',
          'base-text': 'rgb(224, 224, 224)',
        },
      },
    },
  })

  /**
   *  主题-函数集合
   */
  const themeFUNC = ref({
    /**
     * 获取当前是否暗黑模式
     * @returns  是否暗黑模式
     */
    get darkMode() {
      if (theme.value.themeScheme === 'auto') {
        return osTheme.value === 'dark'
      }

      return theme.value.themeScheme === 'dark'
    },

    setThemeScheme(themeScheme: BlogType.Theme['themeScheme']) {
      theme.value.themeScheme = themeScheme
    },
    toggleThemeScheme() {
      const themeSchemes: BlogType.Theme['themeScheme'][] = ['light', 'dark', 'auto']

      const index = themeSchemes.findIndex(item => item === theme.value.themeScheme)

      const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

      const nextThemeScheme = themeSchemes[nextIndex]

      themeFUNC.value.setThemeScheme(nextThemeScheme)
    },

  })

  const app = ref({
    /**
     *   侧边栏是否折叠
     */
    siderCollapse: false,

    /**
     *  是否为移动布局
     */
    isMobile: breakpoints.smaller('sm'),

    /**
     *  主题设置抽屉是否可见
     */
    themeDrawerVisible: false,
  })

  const appFUNC = ref({

  })

  /**
   *
   *  菜单列表
   */
  const menuList = ref<BlogType.MenuItem[]>([])

  /**
   *  搜索菜单列表
   */
  const searchMenuList = computed(() => transformMenuToSearchMenuList(menuList.value))

  return {
    /**
     *   主题
     */
    theme,

    /**
     *   主题函数
     */
    themeFUNC,

    /**
     *   应用
     */
    app,

    appFUNC,

    /**
     *  菜单列表
     */
    menuList,

    /**
     *  搜索菜单列表
     */
    searchMenuList,
  }
})
