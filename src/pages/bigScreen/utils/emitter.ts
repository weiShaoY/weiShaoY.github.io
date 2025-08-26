// @ts-expect-error - tiny-emitter 没有类型定义
import emitter from 'tiny-emitter/instance'

/**
 * 事件发射器类型
 * @description 基于tiny-emitter的事件系统封装，提供Vue风格的事件API
 */
type EventEmitter = {

  /**
   * 监听事件
   * @param event - 事件名称
   * @param callback - 事件回调函数
   * @returns 事件发射器实例
   */
  $on: (event: string, callback: (...args: any[]) => void) => EventEmitter

  /**
   * 监听事件（仅触发一次）
   * @param event - 事件名称
   * @param callback - 事件回调函数
   * @returns 事件发射器实例
   */
  $once: (event: string, callback: (...args: any[]) => void) => EventEmitter

  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param callback - 要移除的回调函数（可选）
   * @returns 事件发射器实例
   */
  $off: (event: string, callback?: (...args: any[]) => void) => EventEmitter

  /**
   * 触发事件
   * @param event - 事件名称
   * @param args - 传递给回调函数的参数
   * @returns 事件发射器实例
   */
  $emit: (event: string, ...args: any[]) => EventEmitter
}

/**
 * 全局事件发射器实例
 * @description 提供Vue风格的事件API，用于组件间通信
 * @example
 * ```typescript
 * // 监听事件
 * emitter.$on('user-login', (user) => {
 *   console.log('用户登录:', user)
 * })
 *
 * // 触发事件
 * emitter.$emit('user-login', { id: 1, name: '张三' })
 *
 * // 移除监听器
 * emitter.$off('user-login')
 * ```
 */
const eventEmitter: EventEmitter = {
  /**
   * 监听事件
   * @param event - 事件名称
   * @param callback - 事件回调函数
   * @returns 事件发射器实例
   */
  $on: (event: string, callback: (...args: any[]) => void): EventEmitter => {
    emitter.on(event, callback)
    return eventEmitter
  },

  /**
   * 监听事件（仅触发一次）
   * @param event - 事件名称
   * @param callback - 事件回调函数
   * @returns 事件发射器实例
   */
  $once: (event: string, callback: (...args: any[]) => void): EventEmitter => {
    emitter.once(event, callback)
    return eventEmitter
  },

  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param callback - 要移除的回调函数（可选）
   * @returns 事件发射器实例
   */
  $off: (event: string, callback?: (...args: any[]) => void): EventEmitter => {
    emitter.off(event, callback)
    return eventEmitter
  },

  /**
   * 触发事件
   * @param event - 事件名称
   * @param args - 传递给回调函数的参数
   * @returns 事件发射器实例
   */
  $emit: (event: string, ...args: any[]): EventEmitter => {
    emitter.emit(event, ...args)
    return eventEmitter
  },
}

export default eventEmitter
