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
    const interact = ref ({
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
      controlDom: document.createElement('div'),

      /**
       *  游戏是否已结束
       */
      end: false, // 游戏是否结束
    })

    const game = ref ({

      /**
       *  游戏状态
       */
      status: false,

      /**
       *  游戏运行的时间
       */
      time: 0,

      /**
       *  是否切换场景
       */
      transfer: false,

      /**
       *  游戏的背景颜色
       */
      bodyColor: '#26d6e9',
    })

    const load = ref({
      /**
       *  资源是否加载完成
       */
      status: true,

      /**
       *  资源是否加载完成
       */
      ready: false,
    })

    /**
     *  分发动作
     */
    function dispatchAction(type: string, payload?: any) {
      console.log('%c Line:99 🌰 payload', 'color:#fca650', payload)
      switch (type) {
        case 'show-load':
          load.value.status = true
          break
        case 'hide-load':
          load.value.status = false
          break
        case 'show-game':
          game.value.status = true
          break
        case 'hide-game':
          game.value.status = false
          break
        default:
          console.warn(`未知的动作类型: ${type}`)
      }
    }

    return {
      interact,
      game,
      load,
      dispatchAction,
    }
  },
  {
    persist: true,
  },
)
