import {
  AdditiveBlending, // 加法混合模式
  Group, // 组对象
  Mesh, // 网格对象
  MeshBasicMaterial, // 基础网格材质
  QuadraticBezierCurve3, // 三次贝塞尔曲线
  TubeGeometry, // 管道几何体
  Vector3, // 三维向量
} from 'three'

/**
 * 飞线类 - 创建3D飞线动画效果
 * 用于在地图上显示城市间的连接线
 */
export class FlyLine {
  private time: any // 时间对象
  private geoProjection: any // 地理投影函数
  private instance: Group // 飞线实例组
  private run: boolean = false // 是否运行动画
  private options: { // 配置选项
    centerPoint: [number, number] // 中心点坐标
    middleHeight: number // 中间高度
    speed: number // 动画速度
    texture: any // 纹理对象
    radius: number // 管道半径
    segments: number // 管道分段数
    radialSegments: number // 管道径向分段数
    data: Array<{ // 城市数据数组
      centroid: [number, number] // 城市质心坐标
    }>
    material: MeshBasicMaterial // 材质
  }

  /**
   * 构造函数
   * @param param0 参数对象
   * @param param0.time 时间对象
   * @param param0.geoProjection 地理投影函数
   * @param options 配置选项
   */
  constructor({ time, geoProjection }: { time: any, geoProjection: any }, options: any = {
}) {
    this.time = time // 设置时间对象
    this.geoProjection = geoProjection // 设置地理投影函数
    this.instance = new Group() // 创建飞线实例组

    // 默认配置选项
    const defaultOptions = {
      centerPoint: [0, 0], // 默认中心点
      middleHeight: 15, // 默认中间高度
      speed: 0.003, // 默认动画速度
      texture: null, // 默认纹理
      radius: 0.1, // 默认管道半径
      segments: 32, // 默认管道分段数
      radialSegments: 8, // 默认管道径向分段数
      data: [], // 默认城市数据
      material: new MeshBasicMaterial({ // 默认材质
        color: 0xFBDF88, // 金黄色
        transparent: true, // 启用透明
        fog: false, // 禁用雾效果
        opacity: 1, // 不透明度
        depthTest: false, // 禁用深度测试
        blending: AdditiveBlending, // 加法混合模式
      }),
    }

    // 合并用户配置和默认配置
    this.options = Object.assign({
    }, defaultOptions, options)
    this.init() // 初始化飞线
  }

  /**
   * 初始化飞线
   */
  init() {
    const { centerPoint, material, texture, segments, radius, radialSegments, data, speed, middleHeight } = this.options

    // 投影中心点坐标
    const [centerX, centerY] = this.geoProjection(centerPoint)

    const centerPointVec = new Vector3(centerX, -centerY, 0)

    // 遍历所有城市数据
    data.forEach((city) => {
      // 投影城市质心坐标
      const [x, y] = this.geoProjection(city.centroid)

      const point = new Vector3(x, -y, 0)

      // 计算中间控制点
      const center = new Vector3()

      center.addVectors(centerPointVec, point).multiplyScalar(0.5) // 计算中点
      center.setZ(middleHeight) // 设置Z轴高度

      // 创建三次贝塞尔曲线
      const curve = new QuadraticBezierCurve3(centerPointVec, center, point)

      // 创建管道几何体
      const tubeGeometry = new TubeGeometry(curve, segments, radius, radialSegments, false)

      // 创建网格对象
      const mesh = new Mesh(tubeGeometry, material)

      mesh.position.set(0, 0, 0) // 设置位置
      mesh.renderOrder = 21 // 设置渲染顺序

      this.instance.add(mesh) // 将网格添加到实例组
    })

    // 监听时间更新事件
    this.time.on('tick', () => {
      if (this.run && texture) { // 检查是否运行且有纹理
        texture.offset.x -= speed // 更新纹理偏移
      }
    })
  }

  /**
   * 获取飞线实例
   * @returns 飞线实例组
   */
  getInstance() {
    return this.instance // 返回飞线实例组
  }

  /**
   * 设置父对象
   * @param parent 父对象
   */
  setParent(parent: any) {
    parent.add(this.instance) // 将飞线实例添加到父对象
  }

  /**
   * 获取可见性
   * @returns 是否可见
   */
  get visible(): boolean {
    return this.instance.visible // 返回实例可见性
  }

  /**
   * 设置可见性
   * @param bool 是否可见
   */
  set visible(bool: boolean) {
    this.instance.visible = bool // 设置实例可见性
    this.run = bool // 设置动画运行状态
  }
}
