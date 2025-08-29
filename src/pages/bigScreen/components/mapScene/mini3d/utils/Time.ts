import { Clock } from 'three'

import { EventEmitter } from './EventEmitter'

import { RafFn } from './RafFn'

/**
 * 时间管理类
 * @description 继承自EventEmitter，提供时间管理和动画循环控制功能
 * @description 结合Date.now()和THREE.Clock提供精确的时间计算
 * @description 支持动画的暂停、恢复和状态查询
 * @description 适用于Three.js等需要时间驱动的3D应用
 */
export class Time extends EventEmitter {
  /**
   * 开始时间戳
   * @description 时间管理器创建时的时间戳（毫秒）
   */
  public start: number

  /**
   * 当前时间戳
   * @description 最近一次tick时的时间戳（毫秒）
   */
  public current: number

  /**
   * 总经过时间
   * @description 从开始到现在的总时间（毫秒）
   */
  public elapsed: number

  /**
   * 帧间隔时间
   * @description 上一帧到当前帧的时间间隔（毫秒）
   * @description 默认值为16ms（约60fps）
   */
  public delta: number

  /**
   * Three.js时钟对象
   * @description 用于获取精确的帧间隔和经过时间
   */
  public clock: Clock

  /**
   * 动画循环控制器
   * @description 基于requestAnimationFrame的动画循环管理
   */
  public raf: ReturnType<typeof RafFn>

  /**
   * 构造函数
   * @description 初始化时间管理器和动画循环
   */
  constructor() {
    super()
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.clock = new Clock()
    this.raf = RafFn(() => this.tick())
    this.raf.start()
  }

  /**
   * 时间更新方法
   * @description 在每帧动画循环中调用，更新所有时间相关属性
   * @description 触发'tick'事件，传递帧间隔和经过时间
   */
  tick(): void {
    const currentTime = Date.now()

    // 计算帧间隔时间
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    // 获取Three.js时钟的精确时间
    const delta = this.clock.getDelta()

    const elapsedTime = this.clock.getElapsedTime()

    // 触发时间更新事件
    this.emit('tick', delta, elapsedTime)
  }

  /**
   * 销毁时间管理器
   * @description 暂停动画循环并清理事件监听器
   */
  destroy(): void {
    this.pause()
    this.off('tick')
  }

  /**
   * 暂停动画循环
   * @description 暂停requestAnimationFrame循环
   */
  pause(): void {
    this.raf.pause()
  }

  /**
   * 恢复动画循环
   * @description 恢复requestAnimationFrame循环
   */
  resume(): void {
    this.raf.resume()
  }

  /**
   * 检查动画是否激活
   * @returns 动画循环是否正在运行
   */
  isActive(): boolean {
    return this.raf.isActive()
  }

  /**
   * 获取当前帧间隔时间（秒）
   * @returns Three.js时钟的帧间隔时间
   */
  getDelta(): number {
    return this.clock.getDelta()
  }

  /**
   * 获取总经过时间（秒）
   * @returns Three.js时钟的总经过时间
   */
  getElapsedTime(): number {
    return this.clock.getElapsedTime()
  }

  /**
   * 获取总经过时间（毫秒）
   * @returns 从开始到现在的总时间（毫秒）
   */
  getElapsedMilliseconds(): number {
    return this.elapsed
  }

  /**
   * 获取帧间隔时间（毫秒）
   * @returns 上一帧到当前帧的时间间隔（毫秒）
   */
  getDeltaMilliseconds(): number {
    return this.delta
  }

  /**
   * 获取当前帧率
   * @returns 基于帧间隔计算的当前帧率
   */
  getFPS(): number {
    return this.delta > 0 ? 1000 / this.delta : 0
  }

  /**
   * 重置时间管理器
   * @description 重置所有时间相关属性到初始状态
   */
  reset(): void {
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.clock = new Clock()
  }
}
