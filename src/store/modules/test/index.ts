// src/stores/index.ts
// 2025-04-16---14:15---星期三

import { defineStore } from 'pinia'

import { contain } from 'three/src/extras/TextureUtils'

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

  const cacheRouteList = ref<string>()

  const excludeCacheRouteList = ref<string[]>()

  const reloadFlag = ref(true)

  const keepAliveExclude = ref<string[]>()

  const refresh = ref(true)

  return {
    setting,
    cacheRouteList,
    excludeCacheRouteList,
    reloadFlag,
    keepAliveExclude,
    refresh,

  }
})
