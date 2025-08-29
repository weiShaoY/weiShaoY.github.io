import {
  Mesh, // 网格对象
  MeshBasicMaterial, // 基础网格材质
  PlaneGeometry, // 平面几何体
  Vector3, // 三维向量
} from 'three'

/**
 * 平面类 - 创建和管理3D平面对象
 * 用于在地图上显示各种平面效果
 */
export class Plane {
  private time: any // 时间对象

  private options: { // 配置选项
    width: number // 平面宽度
    scale: number // 缩放比例
    position: Vector3 // 位置
    needRotate: boolean // 是否需要旋转
    rotateSpeed: number // 旋转速度
    material: MeshBasicMaterial // 材质
  }

  private instance: Mesh // 平面实例

  /**
   * 构造函数
   * @param param0 参数对象
   * @param param0.time 时间对象
   * @param options 配置选项
   */
  constructor({ time }: { time: any }, options: any = {
}) {
    this.time = time // 设置时间对象

    // 合并配置选项
    this.options = Object.assign(
      {
      }, // 空对象作为基础
      {
        width: 10, // 默认宽度
        scale: 1, // 默认缩放
        position: new Vector3(0, 0, 0), // 默认位置
        needRotate: false, // 默认不旋转
        rotateSpeed: 0.001, // 默认旋转速度
        material: new MeshBasicMaterial({ // 默认材质
          transparent: true, // 启用透明
          opacity: 1, // 不透明度
          depthTest: true, // 启用深度测试
        }),
      },
      options, // 用户配置
    )

    // 创建平面几何体
    const plane = new PlaneGeometry(this.options.width, this.options.width)

    // 创建网格对象
    const mesh = new Mesh(plane, this.options.material)

    // 设置位置和缩放
    mesh.position.copy(this.options.position) // 复制位置
    mesh.scale.set(this.options.scale, this.options.scale, this.options.scale) // 设置缩放

    this.instance = mesh // 保存实例引用
  }

  /**
   * 设置父对象
   * @param parent 父对象
   */
  setParent(parent: any) {
    parent.add(this.instance) // 将平面实例添加到父对象

    // 监听时间更新事件
    this.time.on('tick', () => {
      this.update() // 更新平面状态
    })
  }

  /**
   * 更新平面状态
   */
  update() {
    if (this.options.needRotate) { // 检查是否需要旋转
      this.instance.rotation.z += this.options.rotateSpeed // 更新Z轴旋转
    }
  }
}
