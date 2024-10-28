import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 定义名为 'app' 的 store
 */
const useAppStore = defineStore(
  'app',
  () => {
  /**
   * 定义 store 的状态
   */
    // const state = ref<AppState>({
    //   ...defaultSettings,
    // })

    const state = ref ({

      /**
       *  当前设备类型
       * @type {'desktop' | 'mobile'}
       * @default 'desktop'
       * @description 当前设备类型,可以是 "desktop" 或 "mobile"
       */
      device: 'desktop',

      /**
       * 主题配置
       */
      theme: {

        /**
         * 主题模式
         * @type {'light' | 'dark'}
         * @default 'light'
         * @description 主题模式选择，可选 "light" 或 "dark" 模式。
         */
        mode: 'light',

        /**
         * 主题主色调
         * @type {string}
         * @default '#165DFF'
         * @description 设置主题的主颜色，默认为蓝色 "#165DFF"。
         */
        primaryColor: '#165DFF',

        /**
         * 色弱模式
         * @type {boolean}
         * @default false
         * @description 是否开启色弱模式，启用后优化对色弱用户的视觉体验。
         */
        colorWeak: false,
      },

      /**
       *  设置模块
       */
      globalSetting: {
        /**
         * 是否显示全局设置
         * @type {boolean}
         * @default false
         * @description 用于控制全局设置选项是否显示。
         */
        visible: false,
      },

    })

    /**
     * 切换主题颜色
     * @param {boolean} dark - 是否为暗色主题
     */
    function toggleTheme(dark: boolean) {
      if (dark) {
      // 切换到暗色主题
        state.value.theme.mode = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      }
      else {
      // 切换到亮色主题
        state.value.theme.mode = 'light'
        document.body.removeAttribute('arco-theme')
      }
    }

    const app = ref({

      home: {

        headerHeight: 80,
      },

    })

    return {
      app,
      state,
      toggleTheme,

    }
  },
)

export default useAppStore
