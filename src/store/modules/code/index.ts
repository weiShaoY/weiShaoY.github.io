import { defineStore } from 'pinia'

import { ref } from 'vue'

const useCodeStore = defineStore(
  'code',
  () => {
    const state = ref({

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

    })

    // / ///////////// tabBar //////////

    return {
      state,
    }
  },
  {
    persist: true,
  },
)

export default useCodeStore
