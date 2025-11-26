// src/stores/index.ts
// 2025-04-18---01:20---星期五

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 *  时间模块
 */
export const useTimeStore = defineStore('time', () => {
  /**
   *  index
   */
  const index = ref(1)

  return {
    index,
  }
})
