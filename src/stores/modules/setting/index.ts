// src/stores/index.ts
// 2025-11-23---03:21---星期天

import { defineStore } from 'pinia'

import { ref } from 'vue'

import { SETTING_CONFIG } from '@/configs'

/**
 *  Setting模块
 */
export const useSettingStore = defineStore('setting', () => {
  /**
   *  是否为暗色模式
   */
  const isDark = ref(SETTING_CONFIG.isDark)

  return {
    isDark,
  }
})
