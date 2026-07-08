/**
 * 延迟执行函数
 * @param ms - 延迟时间（毫秒）
 * @returns Promise对象，在指定时间后resolve
 * @description 创建一个延迟指定时间的Promise，常用于异步操作中的等待
 * @example
 * ```typescript
 * // 等待1秒后执行
 * await sleep(1000)
 * console.log('1秒后执行')
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 节流函数类型
 * @description 节流函数的返回类型，限制函数调用频率
 */
type ThrottledFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param delay - 节流延迟时间（毫秒）
 * @returns 节流后的函数
 * @description 限制函数在指定时间间隔内只能执行一次，常用于优化高频事件处理
 * @example
 * ```typescript
 * // 创建节流函数，限制每100ms最多执行一次
 * const throttledScroll = throttle((event) => {
 *   console.log('滚动事件:', event)
 * }, 100)
 *
 * // 绑定到滚动事件
 * window.addEventListener('scroll', throttledScroll)
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ThrottledFunction<T> {
  let timer: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>): void {
    if (!timer) {
      func(...args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}
