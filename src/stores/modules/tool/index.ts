// src/stores/index.ts
// 2025-11-23---03:20---星期天

import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 *  Index模块
 */
export const useToolStore = defineStore('tool', () => {
  /**
   *  index
   */
  const index = ref(1)

  return {
    index,
  }
})
