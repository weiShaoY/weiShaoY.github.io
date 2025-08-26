// @ts-expect-error - lil-gui 模块路径问题
import GUI from 'three/examples/jsm/libs/lil-gui.module.min'

/**
 * 调试工具类
 * @description 提供基于lil-gui的调试界面，支持通过URL hash参数激活
 */
export class Debug {
  /**
   * 是否激活调试模式
   */
  public active: boolean

  /**
   * GUI实例
   */
  public instance?: GUI

  /**
   * 构造函数
   * @param active - 是否激活调试模式（默认false）
   * @description 如果URL包含#debug hash，会自动激活调试模式
   */
  constructor(active: boolean = false) {
    this.active = active

    // 检查URL hash参数，如果包含#debug则激活调试模式
    if (window.location.hash === '#debug') {
      this.active = true
    }

    // 如果激活调试模式，创建GUI实例
    if (this.active) {
      this.instance = new GUI()
      this.instance.close() // 默认关闭GUI面板
    }
  }

  /**
   * 更新方法
   * @description 预留的更新方法，用于在动画循环中更新调试信息
   */
  update(): void {
    // 预留方法，可在子类中重写
  }

  /**
   * 销毁方法
   * @description 清理GUI实例，释放内存
   */
  destroy(): void {
    if (this.active && this.instance) {
      this.instance.destroy()
    }
  }
}
