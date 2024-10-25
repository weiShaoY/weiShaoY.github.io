import { defineStore } from 'pinia'

import { ref } from 'vue'

const useAppStore = defineStore(
  'app',
  () => {
    const app = ref({
      indexPage: {
        headerHeight: 80,
      },

      theme: 'light',
    })

    /**
     * 切换主题颜色
     * @param {boolean} dark - 是否为暗色主题
     */
    function toggleTheme(dark: boolean) {
      if (dark) {
        // 切换到暗色主题
        app.value.theme = 'dark'

        document.body.setAttribute('arco-theme', 'dark')
      }
      else {
        // 切换到亮色主题
        app.value.theme = 'light'

        document.body.removeAttribute('arco-theme')
      }
    }

    return { app, toggleTheme }
  },
  {
    persist: true,
  },
)

export default useAppStore
