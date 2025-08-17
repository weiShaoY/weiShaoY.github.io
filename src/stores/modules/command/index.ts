// src/stores/index.ts
// 2025-04-28---09:40---星期一

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 *  Index模块
 */
export const useCommandStore = defineStore('command', () => {
  /**
   *  index
   */
  const index = ref(1)

  return {
    index,
  }
})
