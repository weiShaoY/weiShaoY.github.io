import {
  CSS3DObject,
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/addons/renderers/CSS3DRenderer.js'

import { uuid } from '../utils'

/**
 * 3D标签类 - 创建和管理CSS3D标签
 * 用于在3D场景中显示HTML标签
 */
export class Label3d {
  private scene: any
  private camera: any
  private time: any
  private sizes: any
  private canvas: any
  private parent: any
  private css3dRender: CSS3DRenderer

  constructor({ scene, camera, time, sizes, canvas }: {
    scene: any
    camera: any
    time: any
    sizes: any
    canvas: any
  }) {
    this.scene = scene
    this.camera = camera
    this.time = time
    this.sizes = sizes
    this.canvas = canvas
    this.parent = null

    const { width, height } = this.sizes

    // 创建CSS3D渲染器
    const css3dRender = new CSS3DRenderer()

    this.css3dRender = css3dRender

    // 设置渲染器尺寸和样式
    css3dRender.setSize(width, height)
    css3dRender.domElement.style.position = 'absolute'
    css3dRender.domElement.style.left = '0px'
    css3dRender.domElement.style.top = '0px'
    css3dRender.domElement.style.pointerEvents = 'none'
    css3dRender.domElement.className = `label3d-${uuid()}`

    // 将渲染器DOM元素添加到画布父节点
    this.canvas.parentNode.appendChild(css3dRender.domElement)

    // 监听时间更新事件
    this.time.on('tick', () => {
      this.update()
    })

    // 监听尺寸变化事件
    this.sizes.on('resize', () => {
      this.resize()
    })
  }

  /**
   * 创建3D标签
   * @param content 标签内容
   * @param className CSS类名
   * @param isSprite 是否为精灵标签
   * @returns 3D标签对象
   */
  create(content = '', className = '', isSprite = false) {
    // 创建HTML标签元素
    const tag = document.createElement('div')

    tag.innerHTML = content
    tag.className = className
    tag.style.visibility = 'hidden'
    tag.style.position = 'absolute'

    // 如果没有指定类名，设置默认样式
    if (!className) {
      tag.style.padding = '10px'
      tag.style.color = '#fff'
      tag.style.fontSize = '12px'
      tag.style.textAlign = 'center'
      tag.style.background = 'rgba(0,0,0,0.6)'
      tag.style.borderRadius = '4px'
    }

    let label: any = null

    // 根据类型创建不同的3D标签
    if (!isSprite) {
      label = new CSS3DObject(tag)
    }
    else {
      label = new CSS3DSprite(tag)
    }

    // 为标签添加自定义方法
    label.init = (content: string, position: any) => {
      label.element.innerHTML = content
      label.element.style.visibility = 'visible'
      label.position.copy(position)
    }

    label.hide = () => {
      label.element.style.visibility = 'hidden'
    }

    label.scaleHide = () => {
      label.element.classList.add('scale-hidden')
    }

    label.show = () => {
      label.element.style.visibility = 'visible'
      label.element.classList.remove('scale-hidden')
    }

    label.setParent = (parent: any) => {
      this.parent = parent
      parent.add(label)
    }

    label.remove = () => {
      if (this.parent) {
        this.parent.remove(label)
      }
    }

    return label
  }

  /**
   * 设置标签样式
   * @param label 标签对象
   * @param scale 缩放比例
   * @param axis 旋转轴
   * @param axisRotation 旋转角度
   * @param pointerEvents 指针事件
   */
  setLabelStyle(
    label: any,
    scale = 0.1,
    axis = 'x',
    axisRotation = Math.PI / 2,
    pointerEvents = 'none',
  ) {
    label.element.style.pointerEvents = pointerEvents
    label.scale.set(scale, scale, scale)
    label.rotation[axis] = axisRotation // 控制HTML标签CSS3对象角度
  }

  /**
   * 设置渲染层级
   * @param zIndex z-index值
   */
  setRenderLevel(zIndex: number) {
    this.css3dRender.domElement.style.zIndex = zIndex.toString()
  }

  /**
   * 更新渲染
   */
  update() {
    this.css3dRender.render(this.scene, this.camera.instance)
  }

  /**
   * 销毁标签系统
   */
  destroy() {
    if (this.css3dRender) {
      const domElement = this.css3dRender.domElement

      if (domElement.parentNode) {
        domElement.parentNode.removeChild(domElement)
      }
    }
  }

  /**
   * 调整尺寸
   */
  resize() {
    const { width, height } = this.sizes

    this.css3dRender.setSize(width, height)
  }
}
