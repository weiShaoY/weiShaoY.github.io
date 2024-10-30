import { useAppStore, useCodeStore } from '@/store' // 导入应用状态管理

import { addEventListen } from '@/utils'

// 导入 vueuse 中的防抖函数
import { useDebounceFn } from '@vueuse/core'

import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
} from 'vue' // 导入 Vue 的生命周期钩子函数

const WIDTH = 992 // 响应式断点宽度

/**
 * 检查设备类型
 * @returns  是否为移动设备
 */
function queryDevice() {
  const rect = document.body.getBoundingClientRect() // 获取文档主体的边界矩形

  return rect.width - 1 < WIDTH // 判断设备宽度是否小于响应式断点宽度
}

/**
 * 自定义响应式 Hook
 * @param  immediate - 是否立即执行防抖函数
 */
export default function useResponsive(immediate?: boolean) {
  const codeStore = useCodeStore()

  const appStore = useAppStore()

  /**
   * 窗口大小改变的处理函数
   */
  function resizeHandler() {
    /**
     *   检查文档是否隐藏
     */
    if (!document.hidden) {
      /**
       *  查询是否为移动设备
       */
      const isMobile = queryDevice()

      /**
       *  切换设备类型
       */
      appStore.state.device = isMobile ? 'mobile' : 'desktop'

      /**
       *  切换菜单显示状态
       */
      codeStore.state.menu.visible = !isMobile
    }
  }

  /**
   *  使用防抖函数包装窗口大小改变的处理函数
   */
  const debounceFn = useDebounceFn(resizeHandler, 100)

  onMounted(() => {
  /**
   *  组件挂载后，如果立即执行标志为真，则执行防抖函数
   */
    if (immediate) {
      debounceFn()
    }
  })

  onBeforeMount(() => {
    // 组件挂载前，添加窗口大小改变事件监听器
    addEventListen(window, 'resize', debounceFn)
  })

  onBeforeUnmount(() => {
    // 组件卸载前，移除窗口大小改变事件监听器
    removeEventListen(window, 'resize', debounceFn)
  })
}
