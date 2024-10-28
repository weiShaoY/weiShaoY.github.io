import { defineStore } from 'pinia'

import { ref } from 'vue'

const useCodeStore = defineStore(
  'code',
  () => {
    const state = ref({

      /**
       *  当前设备类型
       * @type {'desktop' | 'mobile'}
       * @default 'desktop'
       * @description 当前设备类型,可以是 "desktop" 或 "mobile"
       */
      device: 'desktop',

      /**
       * 导航栏配置
       * @property {object} navbar - 配置导航栏的可见性和样式
       */
      navbar: {
        /**
         * 是否显示导航栏
         * @type {boolean}
         * @default true
         */
        visible: true,

        /**
         * 导航栏高度（单位：像素）
         * @type {number}
         * @default 60
         */
        height: 60,
      },

      /**
       * 菜单栏配置
       * @property {object} menu - 控制侧边菜单的显示、位置和宽度
       */
      menu: {
        /**
         * 是否显示侧边菜单
         * @type {boolean}
         * @default true
         */
        visible: true,

        /**
         * 菜单栏显示位置
         * @type {'left' | 'right'}
         * @default 'left'
         * @description 指定菜单栏的显示位置，可以是 "left" 或 "right"。
         */
        position: 'left',

        /**
         * 菜单栏是否折叠
         * @type {boolean}
         * @default false
         */
        collapsed: false,

        /**
         * 菜单栏折叠时的宽度（单位：像素）
         * @type {number}
         * @default 48
         */
        collapsedWidth: 48,

        /**
         * 菜单栏展开时的宽度（单位：像素）
         * @type {number}
         * @default 220
         */
        expandedWidth: 220,
      },

      /**
       * 抽屉配置
       * @property {object} drawer - 控制抽屉的显示
       */
      drawer: {
        /**
         * 是否显示抽屉
         * @type {boolean}
         * @default false
         */
        visible: false,
      },

      /**
       *  标签栏配置
       */
      tabBar: {
        /**
         * 是否显示标签栏
         * @type {boolean}
         * @default true
         */
        visible: true,
      },

      /**
       *  面包屑配置
       *  @property {object} breadcrumb - 控制面包屑的显示
       */
      breadcrumb: {
        /**
         * 是否显示面包屑
         * @type {boolean}
         * @default true
         */
        visible: true,
      },

      /**
       *  底部栏配置
       *  @property {object} footer - 控制底部栏的显示
       */
      footer: {
        /**
         * 是否显示底部栏
         * @type {boolean}
         * @default true
         */
        visible: true,
      },

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
         * @default true
         * @description 用于控制全局设置选项是否显示。
         */
        visible: true,
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

    /**
     * 切换设备类型
     * @param {string} device - 设备类型
     */
    function toggleDevice(device: string) {
      state.value.device = device
    }

    /**
     * 切换菜单显示状态
     * @param {boolean} value - 菜单是否隐藏
     */
    function toggleMenu(value: boolean) {
      state.value.menu.visible = value
    }

    return {
      state,
      toggleTheme,
      toggleDevice,
      toggleMenu,
    }
  },
  {
    persist: true,
  },
)

export default useCodeStore
