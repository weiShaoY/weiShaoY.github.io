import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 定义名为 'test' 的 store
 */
export const useGarageStore = defineStore(
  'garage',
  () => {
    /**
     *  用户交互
     */
    const interact = ref({
      /**
       *  用户是否触摸屏幕
       */
      touch: false,

      /**
       *  是否处于自动模式
       */
      auto: false, // 是否处于自动模式
      /**
       *  是否处于需求模式
       */
      demand: true,

      /**
       *  是否静音
       */
      isMute: false,

      /**
       *  是否允许播放音频
       */
      audioAllowed: false,

      /**
       *  浏览器是否处于隐藏状态
       */
      browserHidden: false,

      /**
       *  游戏是否已开始
       */
      begin: false,

      /**
       *  控制器的 DOM 元素
       */
      controlDom: null as HTMLElement | null,

      /**
       *  游戏是否已结束
       */
      end: false, // 游戏是否结束
    })

    const ui = ref({
      bar: {
        /**
         *  操作栏显示状态
         *  @default false
         */
        status: false,

        /**
         *  操作运行的时间
         */
        time: 0,

        /**
         *  是否切换场景
         */
        transfer: false,

        /**
         *  背景颜色
         */
        bodyColor: '#26d6e9',
      },

      loading: {
        /**
         *  资源是否加载完成
         *  @default true
         */
        status: true,

        /**
         *  资源是否加载完成
         *  @default false
         */
        ready: false,
      },
    })

    function init() {
      ui.value.loading.status = true
      ui.value.loading.ready = false
      
    }

    return {
      interact,
      ui,
      init,
    }
  },
  {
    persist: true,
  },
)
