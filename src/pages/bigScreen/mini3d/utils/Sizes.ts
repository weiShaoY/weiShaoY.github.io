import { EventEmitter } from './EventEmitter'

/**
 * 尺寸配置类型
 */
type SizesConfig = {

  /**
   * 画布元素
   */
  canvas: HTMLCanvasElement
}

/**
 * 尺寸管理类
 * @description 继承自EventEmitter，提供画布尺寸管理功能
 * @description 自动监听窗口大小变化并更新画布尺寸
 * @description 支持像素比管理和尺寸变化事件通知
 * @description 适用于Three.js等需要响应式尺寸的3D应用
 */
export class Sizes extends EventEmitter {
  /**
   * 画布元素
   * @description 需要管理尺寸的画布DOM元素
   */
  public canvas: HTMLCanvasElement

  /**
   * 画布宽度
   * @description 画布父容器的宽度（像素）
   */
  public width: number

  /**
   * 画布高度
   * @description 画布父容器的高度（像素）
   */
  public height: number

  /**
   * 像素比
   * @description 设备像素比，用于高DPI屏幕优化
   * @description 默认值为2，最大不超过设备像素比
   */
  public pixelRatio: number

  /**
   * 窗口大小变化处理函数
   * @description 用于移除事件监听器
   */
  private resizeHandler: () => void

  /**
   * 构造函数
   * @param config - 尺寸配置对象
   * @param config.canvas - 画布元素
   */
  constructor({ canvas }: SizesConfig) {
    super()
    this.canvas = canvas
    this.pixelRatio = 2
    this.width = 0
    this.height = 0

    // 初始化尺寸
    this.init()

    // 创建窗口大小变化处理函数
    this.resizeHandler = () => {
      this.init()
      this.emit('resize')
    }

    // 监听窗口大小变化
    window.addEventListener('resize', this.resizeHandler)
  }

  /**
   * 初始化尺寸
   * @description 获取画布父容器的实际尺寸
   * @description 计算并设置像素比
   */
  init(): void {
    // 获取画布父容器的尺寸
    const parentElement = this.canvas.parentNode as HTMLElement

    this.width = parentElement?.offsetWidth || 0
    this.height = parentElement?.offsetHeight || 0

    // 设置像素比（不超过设备像素比，最大为2）
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
  }

  /**
   * 销毁尺寸管理器
   * @description 移除事件监听器和清理资源
   */
  destroy(): void {
    // 移除窗口大小变化监听器
    window.removeEventListener('resize', this.resizeHandler)

    // 移除所有事件监听器
    this.off('resize')
  }

  /**
   * 获取画布尺寸信息
   * @returns 包含宽度、高度和像素比的对象
   */
  getSize(): { width: number, height: number, pixelRatio: number } {
    return {
      width: this.width,
      height: this.height,
      pixelRatio: this.pixelRatio,
    }
  }

  /**
   * 获取画布宽高比
   * @returns 宽度与高度的比值
   */
  getAspectRatio(): number {
    return this.width / this.height
  }

  /**
   * 检查是否为横屏
   * @returns 是否为横屏模式
   */
  isLandscape(): boolean {
    return this.width > this.height
  }

  /**
   * 检查是否为竖屏
   * @returns 是否为竖屏模式
   */
  isPortrait(): boolean {
    return this.height > this.width
  }
}
