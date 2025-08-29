import type { Scene } from 'three'

import { OrthographicCamera, PerspectiveCamera } from 'three'

import { OrbitControls } from 'three/addons'

/**
 * 相机配置类型
 */
type CameraConfig = {

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
  }

  /**
   * 场景对象
   */
  scene: Scene

  /**
   * 画布元素
   */
  canvas: HTMLCanvasElement
}

/**
 * 相机选项类型
 */
type CameraOptions = {

  /**
   * 是否为正交相机
   */
  isOrthographic?: boolean
}

/**
 * 相机类
 * @description 负责管理相机的实例和相关配置
 * @description 提供设置实例、调整大小、更新和销毁的方法
 * @description 支持正交相机和透视相机
 * @description 支持轨道控制器
 * @description 支持WebGL相机实例的创建和销毁
 */
export class Camera {
  /**
   * 尺寸对象
   */
  public sizes: {
    width: number
    height: number
  }

  /**
   * 场景对象
   */
  public scene: Scene

  /**
   * 画布元素
   */
  public canvas: HTMLCanvasElement

  /**
   * 相机选项
   */
  public options: CameraOptions

  /**
   * 相机实例
   */
  public instance!: OrthographicCamera | PerspectiveCamera

  /**
   * 轨道控制器
   */
  public controls!: OrbitControls

  /**
   * 构造函数
   * @param config - 相机配置对象
   * @param config.sizes - 尺寸对象
   * @param config.scene - 场景对象
   * @param config.canvas - 画布元素
   * @param options - 相机选项
   */
  constructor(
    { sizes, scene, canvas }: CameraConfig,
    options: CameraOptions = {
      isOrthographic: false,
    },
  ) {
    this.sizes = sizes
    this.scene = scene
    this.canvas = canvas
    this.options = Object.assign(
      {
        isOrthographic: false,
      },
      options,
    )
    this.setInstance()
  }

  /**
   * 设置相机实例
   */
  setInstance(): void {
    this.setCamera(this.options.isOrthographic)

    this.instance.position.set(10, 10, 10)

    this.scene.add(this.instance)
  }

  /**
   * 设置当前相机
   * @param isOrthographic - true 默认正交相机，false 透视相机
   */
  setCamera(isOrthographic: boolean = true): void {
    const aspect = this.sizes.width / this.sizes.height

    if (isOrthographic) {
      const s = 120

      this.instance = new OrthographicCamera(
        -s * aspect,
        s * aspect,
        s,
        -s,
        1,
        10000,
      )
    }
    else {
      // 透视相机
      this.instance = new PerspectiveCamera(45, aspect, 1, 10000)
    }

    this.setControls()
  }

  /**
   * 设置轨道控制器
   */
  setControls(): void {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.update()
  }

  /**
   * 调整相机大小
   */
  resize(): void {
    const aspect = this.sizes.width / this.sizes.height

    if (this.options.isOrthographic) {
      const s = 120

      if (this.instance instanceof OrthographicCamera) {
        this.instance.left = -s * aspect
        this.instance.right = s * aspect
        this.instance.top = s
        this.instance.bottom = -s
      }
    }
    else {
      if (this.instance instanceof PerspectiveCamera) {
        this.instance.aspect = aspect
      }
    }

    this.instance.updateProjectionMatrix()
  }

  /**
   * 更新相机
   */
  update(): void {
    this.controls.update()
  }

  /**
   * 销毁相机
   */
  destroy(): void {
    this.controls.dispose()
  }
}
