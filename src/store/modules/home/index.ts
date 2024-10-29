import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 定义名为 'home' 的 store
 */
const useHomeStore = defineStore(
  'home',
  () => {
    const state = ref ({

      navbar: {
        height: 80,
      },
    })

    return {
      state,

    }
  },
  {
    persist: true,
  },
)

export default useHomeStore
