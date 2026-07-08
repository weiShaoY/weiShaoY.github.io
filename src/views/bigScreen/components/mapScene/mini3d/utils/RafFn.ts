/**
 * 动画控制对象类型
 */
type AnimationController = {

  /**
   * 启动动画
   */
  start: () => void

  /**
   * 暂停动画
   */
  pause: () => void

  /**
   * 恢复动画
   */
  resume: () => void

  /**
   * 检查是否处于活跃状态
   * @returns 是否处于活跃状态
   */
  isActive: () => boolean
}

/**
 * requestAnimationFrame 动画控制函数
 * @description 创建一个动画控制器，提供启动、暂停、恢复和状态检查功能
 * @description 使用 requestAnimationFrame 实现平滑的动画循环
 * @description 支持暂停和恢复功能，避免不必要的资源消耗
 * @param callback - 动画回调函数，在每一帧执行
 * @returns 包含动画控制方法的对象
 */
export function RafFn(callback: () => void): AnimationController {
  let rafId: number | null = null // 当前 requestAnimationFrame 的 ID

  let isActive = false // 是否处于活跃状态

  let paused = false // 是否处于暂停状态

  /**
   * 执行动画的函数
   * @description 递归调用 requestAnimationFrame 实现动画循环
   * @description 检查活跃状态和暂停状态，决定是否继续执行
   */
  function animate(): void {
    if (!isActive || paused) {
      return // 如果不活跃或暂停，不执行回调
    }

    callback() // 执行回调函数
    rafId = requestAnimationFrame(animate) // 继续请求下一帧
  }

  /**
   * 启动动画的函数
   * @description 将动画设置为活跃状态并开始执行
   * @description 如果已经处于活跃状态，则不会重复启动
   */
  function start(): void {
    if (!isActive) {
      isActive = true // 设置为活跃状态
      animate() // 开始执行动画
    }
  }

  /**
   * 暂停动画的函数
   * @description 停止动画执行并标记为暂停状态
   * @description 取消当前的 requestAnimationFrame 请求
   */
  function pause(): void {
    if (isActive) {
      isActive = false // 设置为不活跃状态
      paused = true // 标记为暂停
      if (rafId !== null) {
        cancelAnimationFrame(rafId) // 取消当前帧
        rafId = null
      }
    }
  }

  /**
   * 恢复动画的函数
   * @description 从暂停状态恢复动画执行
   * @description 只有在暂停状态下才能恢复
   */
  function resume(): void {
    if (!isActive && paused) {
      isActive = true // 恢复为活跃状态
      paused = false // 取消暂停标记
      animate() // 直接执行动画而不是重新调用 start
    }
  }

  /**
   * 检查动画是否处于活跃状态
   * @returns 是否处于活跃状态
   */
  function getIsActive(): boolean {
    return isActive
  }

  // 返回一个包含控制方法的对象
  return {
    start,
    pause,
    resume,
    isActive: getIsActive, // 使用函数返回状态，因为 isActive 可能在回调中改变
  }
}
