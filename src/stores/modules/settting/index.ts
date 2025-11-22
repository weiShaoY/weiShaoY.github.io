// src/stores/index.ts
// 2025-11-23---03:21---星期天

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 *  Setting模块
 */
export const useSettingStore = defineStore('setting', () => {
  /**
   *  index
   */
  const index = ref(1)

  return {
    isDark,
  }
})
