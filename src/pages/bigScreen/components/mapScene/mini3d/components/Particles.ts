import {
  AdditiveBlending, // 加法混合模式
  BufferAttribute, // 缓冲属性
  BufferGeometry, // 缓冲几何体
  CanvasTexture, // 画布纹理
  Points, // 点云对象
  PointsMaterial, // 点云材质
} from 'three'

/**
 * 粒子系统类 - 创建和管理3D粒子效果
 * 用于在地图上显示动态粒子动画
 */
export class Particles {
  private instance: Points | null // 粒子实例
  private time: any // 时间对象
  private enable: boolean // 是否启用粒子
  private config: { // 配置选项
    num: number // 粒子数量
    range: number // 粒子范围
    speed: number // 粒子速度
    renderOrder: number // 渲染顺序
    dir: string // 粒子方向
    material: PointsMaterial // 粒子材质
  }

  /**
   * 构造函数
   * @param param0 参数对象
   * @param param0.time 时间对象
   * @param config 配置选项
   */
  constructor({ time }: { time: any }, config: any = {
}) {
    this.instance = null // 初始化粒子实例
    this.time = time // 设置时间对象
    this.enable = true // 启用粒子系统

    // 合并配置选项
    this.config = Object.assign(
      {
        num: 100, // 默认粒子数量
        range: 500, // 默认粒子范围
        speed: 0.01, // 默认粒子速度
        renderOrder: 99, // 默认渲染顺序
        dir: 'up', // 默认粒子方向
        material: new PointsMaterial({ // 默认粒子材质
          map: Particles.createTexture(), // 粒子纹理
          size: 20, // 粒子大小
          color: 0xFFFFFF, // 粒子颜色
          transparent: true, // 启用透明
          opacity: 1.0, // 不透明度
          depthTest: false, // 禁用深度测试
          vertexColors: true, // 启用顶点颜色
          blending: AdditiveBlending, // 加法混合模式
          sizeAttenuation: true, // 启用大小衰减
        }),
      },
      config, // 用户配置
    )
    this.create() // 创建粒子系统
  }

  /**
   * 创建粒子系统
   */
  create() {
    const { range, dir, material, num, renderOrder } = this.config

    const position: number[] = [] // 位置数组

    const colors: number[] = [] // 颜色数组

    const velocities: number[] = [] // 速度数组

    // 生成粒子数据
    for (let i = 0; i < num; i++) {
      // 随机位置
      position.push(
        Math.random() * range - range / 2, // X坐标
        Math.random() * range - range / 2, // Y坐标
        Math.random() * range - range / 2, // Z坐标
      )

      const dirVec = dir === 'up' ? 1 : -1 // 方向向量

      // 随机速度
      velocities.push(
        Math.random() * dirVec, // X方向速度
        (0.1 + Math.random()) * dirVec, // Y方向速度
        0.1 + Math.random() * dirVec, // Z方向速度
      )

      // 随机颜色
      const color = material.color.clone() // 克隆材质颜色

      const hsl = {
      } as any // HSL颜色对象

      color.getHSL(hsl) // 获取HSL值
      color.setHSL(hsl.h, hsl.s, hsl.l * Math.random()) // 随机调整亮度
      colors.push(color.r, color.g, color.b) // 添加RGB值
    }

    // 创建几何体
    const geometry = new BufferGeometry()

    // 设置几何体属性
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(position), 3)) // 位置属性
    geometry.setAttribute('velocities', new BufferAttribute(new Float32Array(velocities), 3)) // 速度属性
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3)) // 颜色属性

    // 创建点云对象
    this.instance = new Points(geometry, material)
    this.instance.renderOrder = renderOrder // 设置渲染顺序
  }

  /**
   * 创建粒子纹理
   * @returns 粒子纹理
   */
  static createTexture(): CanvasTexture | null {
    const canvas = document.createElement('canvas') // 创建画布

    canvas.width = 1024 // 设置画布宽度
    canvas.height = 1024 // 设置画布高度

    const context = canvas.getContext('2d') // 获取2D上下文

    if (!context) {
      return null
    }

    // 创建径向渐变
    const gradient = context.createRadialGradient(512, 512, 0, 512, 512, 512)

    gradient.addColorStop(0, 'rgba(255,255,255,1)') // 中心白色
    gradient.addColorStop(1, 'rgba(255,255,255,0)') // 边缘透明

    context.fillStyle = gradient // 设置填充样式
    context.fillRect(0, 0, 1024, 1024) // 填充矩形

    const texture = new CanvasTexture(canvas) // 创建画布纹理

    return texture // 返回纹理
  }

  /**
   * 更新粒子系统
   * @param delta 时间增量
   * @param elapsedTime 经过的时间
   */
  update(delta: number, elapsedTime: number) {
    if (!this.instance) {
      return false
    } // 检查实例是否存在

    const { range, speed, dir } = this.config

    const dirVec = dir === 'up' ? 1 : -1 // 方向向量

    const position = this.instance.geometry.getAttribute('position') // 获取位置属性

    const velocities = this.instance.geometry.getAttribute('velocities') // 获取速度属性

    const count = position.count // 获取粒子数量

    // 更新每个粒子的位置
    for (let i = 0; i < count; i++) {
      let pos_x = position.getX(i) // 获取X位置

      // const _pos_y = position.getY(i) // 获取Y位置（未使用）

      let pos_z = position.getZ(i) // 获取Z位置

      const vel_x = velocities.getX(i) // 获取X速度

      const vel_y = velocities.getY(i) // 获取Y速度

      // const _vel_z = velocities.getZ(i) // 获取Z速度（未使用）

      // 更新位置
      pos_x += Math.sin(vel_x * elapsedTime) * delta // 正弦运动
      pos_z += speed * dirVec // 沿Z轴移动

      // 边界检查
      if (pos_z > range / 2 && dirVec === 1) { // 向上方向边界
        pos_z = -range / 2 // 重置到下方
      }

      if (pos_z < -range / 2 && dirVec === -1) { // 向下方向边界
        pos_z = range / 2 // 重置到上方
      }

      // 设置新位置
      position.setX(i, pos_x) // 设置X位置
      position.setZ(i, pos_z) // 设置Z位置
      velocities.setX(i, vel_x) // 设置X速度
      velocities.setY(i, vel_y) // 设置Y速度
    }

    // 标记属性需要更新
    position.needsUpdate = true // 位置属性更新
    velocities.needsUpdate = true // 速度属性更新
  }

  /**
   * 设置父对象
   * @param parent 父对象
   */
  setParent(parent: any) {
    if (this.instance) {
      parent.add(this.instance) // 将粒子实例添加到父对象
    }

    // 监听时间更新事件
    this.time.on('tick', (delta: number, elapsedTime: number) => {
      if (this.enable) { // 检查是否启用
        this.update(delta, elapsedTime) // 更新粒子系统
      }
    })
  }
}
