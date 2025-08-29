import gsap from 'gsap'

import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
} from 'three'

import { emptyObject } from '..'

/**
 * 焦点效果类 - 创建3D焦点动画效果
 * 继承自Object3D，用于在地图上显示焦点动画
 */
export class Focus extends Object3D {
  private config: {
    color1: number
    color2: number
  }

  private assets: {
    instance: any
  }

  private sceneGroup: any

  private gsapObjects: gsap.core.Tween[] // gsap动画对象数组

  private animateElements: {
    focusMidQuan: Mesh
    focusArrows: Mesh
    focusMoveBg: Mesh
  }

  constructor(self: any, config: any = {
}) {
    super()

    // 合并配置选项
    this.config = Object.assign(
      {
        color1: 0xFCC957, // 主要颜色
        color2: 0xFFFFFF, // 次要颜色
      },
      config,
    )

    // 初始化资源
    this.assets = {
      instance: null,
    }
    this.assets.instance = self.assets.instance
    this.sceneGroup = self.sceneGroup
    this.gsapObjects = [] // gsap动画对象数组
    this.animateElements = {
    } as any // gsap动画元素对象

    this.init()
  }

  /**
   * 初始化焦点效果
   */
  init() {
    const color = this.config.color1

    // 创建几何体
    const geometry = new PlaneGeometry(1.5, 1.5, 1) // 主要几何体

    const barGeometry = new PlaneGeometry(1, 3, 1) // 条形几何体

    barGeometry.translate(0, 1, 0)

    // 创建基础材质
    const material = new MeshBasicMaterial({
      color,
      transparent: true,
      fog: false,
      side: DoubleSide,
      depthWrite: false,
    })

    // 克隆并配置各种材质
    const focusArrowsMaterial = material.clone()

    focusArrowsMaterial.map = this.assets.instance.getResource('focusArrows')

    const focusBarMaterial = material.clone()

    focusBarMaterial.map = this.assets.instance.getResource('focusBar')

    const focusBgMaterial = material.clone()

    focusBgMaterial.map = this.assets.instance.getResource('focusBg')

    const focusMidQuanMaterial = material.clone()

    focusMidQuanMaterial.color = new Color(this.config.color2)
    focusMidQuanMaterial.map = this.assets.instance.getResource('focusMidQuan')

    const focusMoveBgMaterial = material.clone()

    focusMoveBgMaterial.map = this.assets.instance.getResource('focusMoveBg')
    focusMoveBgMaterial.blending = AdditiveBlending

    // 创建网格对象
    const focusArrows = new Mesh(geometry, focusArrowsMaterial)

    const focusBar1 = new Mesh(barGeometry, focusBarMaterial)

    focusBar1.rotation.x = Math.PI / 2

    const focusBar2 = focusBar1.clone()

    focusBar2.rotation.y = Math.PI / 2

    const focusBg = new Mesh(geometry, focusBgMaterial)

    const focusMidQuan = new Mesh(geometry, focusMidQuanMaterial)

    const focusMoveBg = new Mesh(geometry, focusMoveBgMaterial)

    // 将所有元素添加到组中
    const groupElement = [focusMidQuan, focusBg, focusArrows, focusMoveBg, focusBar1, focusBar2]

    // 设置渲染顺序
    groupElement.forEach((element) => {
      element.renderOrder = 99
    })

    this.add(...groupElement)

    // 设置移动背景的初始缩放
    const moveBgScale = 0

    focusMoveBg.scale.setScalar(moveBgScale)

    // 保存需要动画的元素
    this.animateElements = {
      focusMidQuan,
      focusArrows,
      focusMoveBg,
    }

    this.startAnimate()
  }

  /**
   * 开始动画
   */
  startAnimate() {
    // 中间圆圈旋转动画
    const quanTween = gsap.to(this.animateElements.focusMidQuan.rotation, {
      z: 2 * Math.PI,
      duration: 8,
      repeat: -1,
      ease: 'none',
    })

    // 箭头旋转动画
    const focusArrowsTween = gsap.to(this.animateElements.focusArrows.rotation, {
      z: 2 * Math.PI,
      duration: 5,
      repeat: -1,
      ease: 'none',
    })

    // 移动背景缩放动画
    const focusMoveBgTween = gsap.to(this.animateElements.focusMoveBg.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 2.5,
      repeat: -1,
      ease: 'none',
    })

    // 移动背景透明度动画
    const focusMoveBgMaterialTween = gsap.to(this.animateElements.focusMoveBg.material, {
      opacity: 0,
      duration: 2.5,
      repeat: -1,
      ease: 'none',
    })

    // 保存所有动画对象
    this.gsapObjects = [quanTween, focusArrowsTween, focusMoveBgTween, focusMoveBgMaterialTween]
  }

  /**
   * 暂停动画
   */
  pausedAnimate() {
    this.gsapObjects.forEach((element) => {
      ;(element as any).paused = true
    })
  }

  /**
   * 获取场景组对象
   * @returns 场景组对象
   */
  getSceneGroup() {
    return this.sceneGroup
  }

  /**
   * 销毁焦点效果
   */
  destroy() {
    // 结束所有动画
    this.gsapObjects.forEach((element) => {
      element.kill()
    })

    // 清空对象引用
    emptyObject(this)
  }
}
