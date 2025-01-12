import { defineStore } from 'pinia'

import { ref } from 'vue'

/**
 * 定义名为 'test' 的 store
 */
export const useGarageStore = defineStore(
  'garage',
  () => {
    const state = ref({
      /**
       *  用户是否触摸屏幕
       */
      isTouch: false,

      /**
       *  是否静音     根据环境变量播放  开发环境不播放
       */
      isMute: false,

      /**
       *  是否允许播放音频
       */
      isAudioAllowed: false,

      /**
       *  资源是否加载完成
       */
      isLoaded: false,

      /**
       *  loading 是否显示
       */
      isLoading: true,

      /**
       *  汽车车身颜色
       */
      carColor: '#26d6e9',

    })

    return {

      state,
    }
  },
  {
    // persist: true,
  },
)
