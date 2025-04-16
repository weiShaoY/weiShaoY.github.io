// src/stores/index.ts
// 2025-04-16---14:15---星期三

import { testRouterList } from '@/router/modules/test'

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 *  Index模块
 */
export const useTestStore = defineStore('test', () => {
  /**
   *  index
   */
  const setting = ref({
    /**
     *  菜单
     */
    menu: {
      leftMenuWidth: 80,
      rightMenuWidth: 252,
    },

    /**
     *  水印
     */
    watermark: {
      isShow: false,
      text: import.meta.env.VITE_APP_TITLE,
    },

    tab: {
      height: 139,
    },

    container: {
      maxWidth: '100%', //  100% 1200px
      minHeight: `calc(100vh - 139px)`,
    },
  })

  /**
   *  不需要缓存的组件
   */
  const keepAliveExclude = ref<string[]>()

  /**
   *  是否刷新
   */
  const isRefresh = ref(true)

  /**
   *  菜单列表
   */
  const menuList = ref<RouterType.BlogRouteRecordRaw[]>(testRouterList)

  /**
   *  搜索历史列表
   */
  const searchHistoryList = ref<RouterType.BlogRouteRecordRaw[]>([])

  return {
    setting,
    keepAliveExclude,
    isRefresh,

    menuList,
    searchHistoryList,
  }
})
