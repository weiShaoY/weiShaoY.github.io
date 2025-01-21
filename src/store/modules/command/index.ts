import { defineStore } from 'pinia'

import { ref } from 'vue'

import { getVideoDeviceList, getVideoUrl } from './utils/cockpit'

/**
 * 定义名为 '指挥台' 的 store
 */
export const useCommandStore = defineStore(
  'garage',
  () => {
    const setting = ref({
      /**
       * 是否显示设置弹窗
       * @type {boolean}
       */
      isShowSettingModal: false,

      /**
       * 是否进行全局适配
       * @type {boolean}
       */
      isScale: true,

      /**
       * 配置选项
       * @type {object}
       */
      option: {
        /**
         * 步长
         * @description 数值越大，滚动速度越快
         * @type {number}
         */
        step: 4,

        /**
         * 鼠标悬停时是否停止
         * @description 是否开启鼠标悬停时停止滚动
         * @type {boolean}
         */
        hover: true,

        /**
         * 滚轮滚动
         * @description 在开启鼠标悬停的情况下，是否开启滚轮滚动
         * @type {boolean}
         */
        wheel: false,

        /**
         * 开启数据实时监控刷新 DOM
         * @description 是否开启实时监控数据，并刷新 DOM
         * @type {boolean}
         */
        openWatch: true,

        /**
         * 滚动方向
         * @description 0: 向下，1: 向上，2: 向左，3: 向右
         * @type {number}
         */
        direction: 1,

        /**
         * 开始无缝滚动的数据量
         * @description 数据量达到此值时，开始无缝滚动
         * @type {number}
         */
        limitScrollNum: 4,

        /**
         * 单步运动停止的高度
         * @description 当 direction 为 0 或 1 时，控制单步滚动停止的高度，默认值 0 为无缝滚动
         * @type {number}
         */
        singleHeight: 0,

        /**
         * 单步运动停止的宽度
         * @description 当 direction 为 2 或 3 时，控制单步滚动停止的宽度，默认值 0 为无缝滚动
         * @type {number}
         */
        singleWidth: 0,

        /**
         * 单步运动停止的时间
         * @description 控制每次单步停止的时间，单位毫秒，默认值 3000ms
         * @type {number}
         */
        singleWaitTime: 3000,

        /**
         * 背景类型
         * @description 背景设置类型，默认 'map'
         * @type {string}
         */
        bgType: 'map',

        /**
         * 是否开启定时更新数据
         * @description 控制是否开启定时更新数据功能
         * @type {boolean}
         */
        intervalUpdateData: false,
      },
    })

    const video = ref({
      /**
       * 是否显示视频弹窗
       * @description 控制视频弹窗的显示与隐藏
       * @type {boolean}
       */
      isShowVideoModal: false,

      /**
       * 当前播放的激活视频
       * @description 保存当前激活播放的视频的标识或ID
       * @type {string}
       */
      activeVideo: '',

      /**
       * 渠道 ID
       * @description 表示视频所属的频道ID，用于区分不同的视频来源
       * @type {string}
       */
      channelId: '',

      /**
       * 视频列表
       * @description 包含当前所有视频数据的数组，通常包含视频的详细信息
       * @type {Array<object>}
       */
      videoList: [],

      /**
       * 当前视频的 URL 地址
       * @description 用于指定当前播放视频的 URL 地址
       * @type {string}
       */
      videoUrl: '',

      getList() {
        getVideoDeviceList().then((res: any) => {
          video.value.videoList = res.data
        })
      },

      async playVideo(videoData: any, isMore: boolean) {
        console.log('%c Line:153 🍿 isMore', 'color:#2eafb0', isMore)
        console.log('%c Line:153 🍒 videoData', 'color:#4fff4B', videoData)

        // if (activeVideo.value) {
        //   await stopActiveVideo()
        // }

        // video.value.activeVideo = videoData.id
        // if (!isMore) {
        //   video.value.isShowVideoModal = true
        // }

        // getVideoUrl(video.value.activeVideo).then((res: any) => {
        //   if (res.code === 200) {
        //     video.value.videoUrl = res.data?.playUrl || ''
        //     video.value.channelId = res.data?.channelId || ''
        //   }
        // })
      },
    })

    return {
      setting,
      video,
    }
  },
  {
    persist: true,
  },
)
