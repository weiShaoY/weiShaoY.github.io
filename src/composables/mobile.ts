import { ref } from 'vue'

/**
 * 全局的 isMobile 布尔值，表示当前设备是否为移动设备
 */
export const isMobile = ref<boolean>(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))

/**
 * 防抖函数，用于减少事件频繁触发的影响
 * @param {Function} func - 需要防抖处理的函数
 * @param {number} wait - 防抖的延迟时间（毫秒）
 * @returns {(...args: any[]) => void} - 防抖后的函数
 */
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  // 显式声明 this 的类型
  return function (this: unknown, ...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * 更新 isMobile 的状态，检查当前设备是否为移动设备
 */
function updateIsMobile(): void {
  const isCurrentlyMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile.value !== isCurrentlyMobile) {
    isMobile.value = isCurrentlyMobile
  }
}

// 防抖处理后的 resize 事件监听器
const debouncedUpdateIsMobile = debounce(updateIsMobile, 200)

// 当模块第一次被导入时，启动监听器
if (typeof window !== 'undefined') {
  window.addEventListener('resize', debouncedUpdateIsMobile)
}
