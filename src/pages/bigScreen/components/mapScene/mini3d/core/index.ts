import {
  AxesHelper,
  Mesh,
  Scene,
} from 'three'

import {
  EventEmitter,
  Sizes,
  Time,
} from '../utils'

import { Camera } from './Camera'

import { Renderer } from './Renderer'

// 配置类型定义

/**
 * 3D 场景配置类型
 */
type Mini3dConfig = {

  /**
   * 是否为正交相机
   */
  isOrthographic?: boolean
}

/**
 * 3D 场景类
 * @description 负责管理3D场景的实例和相关配置
 * @description 提供设置AxesHelper、调整大小、更新和销毁的方法
 * @description 支持正交相机和透视相机
 * @description 支持轨道控制器
 * @description 支持WebGL渲染器实例的创建和销毁
 */
export class Mini3d extends EventEmitter {
  /**
   * 配置对象
   */
  public config: Mini3dConfig

  /**
   * 画布元素
   */
  public canvas: HTMLCanvasElement

  /**
   * 场景对象
   */
  public scene: Scene

  /**
   * 尺寸对象
   */
  public sizes: Sizes

  /**
   * 时间对象
   */
  public time: Time

  /**
   * 相机对象
   */
  public camera: Camera

  /**
   * 渲染器对象
   */
  public renderer: Renderer

  /**
   * 构造函数
   * @param canvas - 画布元素
   * @param config - 配置对象
   */
  constructor(
    canvas: HTMLCanvasElement,
    config: Mini3dConfig = {
    },
  ) {
    super()
    const defaultConfig: Mini3dConfig = {
      isOrthographic: false,
    }

    this.config = Object.assign(
      {
      },
      defaultConfig,
      config,
    )
    this.canvas = canvas
    this.scene = new Scene()
    this.sizes = new Sizes({
      canvas,
    })
    this.time = new Time()
    this.camera = new Camera(
      {
        sizes: this.sizes,
        scene: this.scene,
        canvas,
      },
      {
        isOrthographic: this.config.isOrthographic ?? false,
      },
    )
    this.renderer = new Renderer({
      canvas,
      sizes: this.sizes,
      scene: this.scene,
      camera: this.camera,
    })
    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', (delta: number) => {
      this.update(delta)
    })
  }

  /**
   * 设置AxesHelper
   * @param size - 尺寸
   * @returns 是否成功设置
   */
  setAxesHelper(size: number = 250): boolean {
    if (!size) {
      return false
    }

    const axes = new AxesHelper(size)

    this.scene.add(axes)
    return true
  }

  /**
   * 调整大小
   */
  resize(): void {
    this.camera.resize()
    this.renderer.resize()
  }

  /**
   * 更新
   * @param _delta - 时间增量（未使用）
   */
  update(_delta: number): void {
    this.camera.update()
    this.renderer.update()
  }

  /**
   * 销毁
   */
  destroy(): void {
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()
    this.renderer.destroy()
    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose()
        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })
    this.canvas.parentNode?.removeChild(this.canvas)
  }
}
