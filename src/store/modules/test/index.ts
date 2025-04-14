// src/stores/index.ts
// 2025-04-14---17:00---星期一

import { defineStore } from 'pinia'

import { ref } from 'vue'

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

  const app = ref({
    /**
     *   侧边栏是否折叠
     */
    siderCollapse: false,
  })

  return {
    theme,
    app,
  }
})
