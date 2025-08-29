import type { Camera, Scene } from 'three'

import { WebGLRenderer } from 'three'

/**
 * 渲染器配置类型
 */
type RendererConfig = {

  /**
   * 画布元素
   */
  canvas: HTMLCanvasElement

  /**
   * 尺寸对象
   */
  sizes: {

    /**
     * 宽度
     */
    width: number

    /**
     * 高度
     */
    height: number

    /**
     * 像素比
     */
    pixelRatio: number
  }

  /**
   * 场景对象
   */
  scene: Scene

  /**
   * 相机对象
   */
  camera: {
    instance: Camera
  }

  /**
   * 是否启用后处理
   */
  postprocessing?: boolean

  /**
   * 后处理合成器
   */
  composer?: any
}

/**
 * 渲染器类
 * @description 负责管理渲染器的实例和相关配置
 * @description 提供设置实例、调整大小、更新和销毁的方法
 * @description 支持后处理功能
 * @description 支持WebGL渲染器实例的创建和销毁
 */
export class Renderer {
  /**
   * 画布元素
   */
  public canvas: HTMLCanvasElement

  /**
   * 尺寸对象
   */
  public sizes: {

    /**
     * 宽度
     */
    width: number

    /**
     * 高度
     */
    height: number

    /**
     * 像素比
     */
    pixelRatio: number
  }

  /**
   * 场景对象
   */
  public scene: Scene

  /**
   * 相机对象
   */
  public camera: {

    /**
     * 相机实例
     */
    instance: Camera
  }

  /**
   * 是否启用后处理
   */
  public postprocessing: boolean

  /**
   * 后处理合成器
   */
  public composer: any

  /**
   * WebGL渲染器实例
   */
  public instance!: WebGLRenderer

  /**
   * 构造函数
   * @param config - 渲染器配置对象
   * @param config.canvas - 画布元素
   * @param config.sizes - 尺寸对象
   * @param config.scene - 场景对象
   * @param config.camera - 相机对象
   * @param config.postprocessing - 是否启用后处理
   * @param config.composer - 后处理合成器
   */
  constructor({
    canvas,
    sizes,
    scene,
    camera,
    postprocessing = false,
    composer = null,
  }: RendererConfig) {
    this.canvas = canvas
    this.sizes = sizes
    this.scene = scene
    this.camera = camera
    this.postprocessing = postprocessing
    this.composer = composer
    this.setInstance()
  }

  /**
   * 设置WebGL渲染器实例
   */
  setInstance(): void {
    this.instance = new WebGLRenderer({
      alpha: false,
      antialias: true,
      canvas: this.canvas,
    })
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  /**
   * 调整渲染器大小
   */
  resize(): void {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  /**
   * 更新渲染器
   */
  update(): void {
    if (this.postprocessing && this.composer) {
      this.composer.render()
    }
    else {
      this.instance.render(this.scene, this.camera.instance)
    }
  }

  /**
   * 销毁渲染器
   */
  destroy(): void {
    this.instance.dispose()
    this.instance.forceContextLoss()
  }
}
