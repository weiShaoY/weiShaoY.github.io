import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 定义名为 'test' 的 store
 */
const useTestStore = defineStore(
  'test',
  () => {
    /**
     * 用户交互状态
     */
    const interact = ref ({
      /**
       * 用户是否触摸屏幕
       */
      touch: false,

      /**
       * 是否自动播放
       */
      auto: false,

      /**
       * 是否需求满足
       */
      demand: true,

      /**
       * 是否静音
       */
      isMute: false,

      /**
       * 是否允许音频播放
       */
      audioAllowed: false,

      /**
       * 浏览器是否隐藏（页面是否处于后台）
       */
      browserHidden: false,

      /**
       * 用户交互的起始状态
       */
      begin: false,

      /**
       * 控制器的 DOM 元素
       */
      controlDom: document.createElement('div'),

      /**
       * 用户交互的结束状态
       */
      end: false,
    })

    /**
     * 游戏状态信息
     */
    const game = ref({
      /**
       * 游戏的当前时间（秒）
       */
      time: 0,

      /**
       * 是否正在进行场景切换
       */
      transfer: false,

      /**
       * 主体颜色（使用十六进制颜色值）
       */
      bodyColor: '#26d6e9',
    })

    /**
     * 资源加载状态
     */
    const loaded = ref({
      /**
       * 是否已经准备就绪
       */
      ready: false,
    })

    return {
      interact,
      game,
      loaded,
    }
  },
  {
    persist: true,
  },
)

export default useTestStore
