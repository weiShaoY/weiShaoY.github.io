import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  Points,
  PointsMaterial,
  Shape,
  ShapeGeometry,
  Vector2,
  Vector3,
} from 'three'

import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

/**
 * 网格类 - 创建3D网格、形状和点阵
 */
export class Grid {
  private scene: any
  private time: any
  private instance: Group | null
  private options: {
    position: Vector3
    gridSize: number
    gridDivision: number
    gridColor: number
    shapeSize: number
    shapeColor: number
    pointSize: number
    pointColor: number
    pointLayout: {
      row: number
      col: number
    }
    pointBlending: any
  }

  constructor({ scene, time }: { scene: any, time: any }, options: any = {
}) {
    this.scene = scene
    this.time = time
    this.instance = null

    // 默认配置选项
    const defaultOptions = {
      position: new Vector3(0, 0, 0), // 网格位置
      gridSize: 100, // 网格大小
      gridDivision: 20, // 网格分割数
      gridColor: 0x28373A, // 网格颜色
      shapeSize: 1, // 形状大小
      shapeColor: 0x8E9B9E, // 形状颜色
      pointSize: 0.2, // 点大小
      pointColor: 0x28373A, // 点颜色
      pointLayout: {
        row: 200, // 点阵行数
        col: 200, // 点阵列数
      },
      pointBlending: NormalBlending, // 点混合模式
    }

    // 合并用户配置和默认配置
    this.options = Object.assign({
    }, defaultOptions, options)
    this.init()
  }

  /**
   * 初始化网格
   */
  init() {
    const group = new Group()

    group.name = 'Grid'

    // 创建网格辅助线
    const grid = this.createGridHelp()

    // 创建形状
    const shapes = this.createShapes()

    // 创建点阵
    const points = this.createPoint()

    group.add(grid, shapes, points)
    group.position.copy(this.options.position)
    this.instance = group
    this.scene.add(group)
  }

  /**
   * 创建形状网格
   * @returns 形状网格对象
   */
  createShapes() {
    const { gridSize, gridDivision, shapeSize, shapeColor } = this.options

    // 计算形状间距
    const shapeSpace = gridSize / gridDivision

    // 计算范围
    const range = gridSize / 2

    // 创建形状材质
    const shapeMaterial = new MeshBasicMaterial({
      color: shapeColor,
      side: DoubleSide,
    })

    const shapeGeometrys: BufferGeometry[] = []

    // 在网格交叉点创建加号形状
    for (let i = 0; i < gridDivision + 1; i++) {
      for (let j = 0; j < gridDivision + 1; j++) {
        const shapeGeometry = this.createPlus(shapeSize)

        shapeGeometry.translate(
          -range + i * shapeSpace,
          -range + j * shapeSpace,
          0,
        )
        shapeGeometrys.push(shapeGeometry)
      }
    }

    // 合并所有几何体
    const geometry = mergeGeometries(shapeGeometrys)

    const shapeMesh = new Mesh(geometry, shapeMaterial)

    shapeMesh.renderOrder = -1
    shapeMesh.rotateX(-Math.PI / 2)
    shapeMesh.position.y += 0.01
    return shapeMesh
  }

  /**
   * 创建网格辅助线
   * @returns 网格辅助线对象
   */
  createGridHelp() {
    const { gridSize, gridDivision, gridColor } = this.options

    const gridHelp = new GridHelper(gridSize, gridDivision, gridColor, gridColor)

    return gridHelp
  }

  /**
   * 创建点阵
   * @returns 点阵对象
   */
  createPoint() {
    const { gridSize, pointSize, pointColor, pointBlending, pointLayout } = this.options

    const rows = pointLayout.row

    const cols = pointLayout.col

    // 创建点位置数组
    const positions = new Float32Array(rows * cols * 3)

    // 计算每个点的位置
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = (i / (rows - 1)) * gridSize - gridSize / 2

        const y = 0

        const z = (j / (cols - 1)) * gridSize - gridSize / 2

        const index = (i * cols + j) * 3

        positions[index] = x
        positions[index + 1] = y
        positions[index + 2] = z
      }
    }

    // 创建点几何体
    const geometry = new BufferGeometry()

    geometry.setAttribute('position', new BufferAttribute(positions, 3))

    // 创建点材质
    const material = new PointsMaterial({
      size: pointSize,
      sizeAttenuation: true,
      color: pointColor,
      blending: pointBlending,
    })

    const particles = new Points(geometry, material)

    return particles
  }

  /**
   * 获取网格实例
   * @returns 网格组对象
   */
  getInstance() {
    return this.instance
  }

  /**
   * 获取时间对象
   * @returns 时间对象
   */
  getTime() {
    return this.time
  }

  /**
   * 设置点模式（待实现）
   */
  setPointMode() {}

  /**
   * 创建加号形状
   * @param shapeSize 形状大小
   * @returns 加号形状几何体
   */
  createPlus(shapeSize = 50) {
    const w = shapeSize / 6 / 3

    const h = shapeSize / 3

    // 定义加号形状的顶点
    const points = [
      new Vector2(-h, -w),
      new Vector2(-w, -w),
      new Vector2(-w, -h),
      new Vector2(w, -h),
      new Vector2(w, -h),
      new Vector2(w, -w),
      new Vector2(h, -w),
      new Vector2(h, w),
      new Vector2(w, w),
      new Vector2(w, h),
      new Vector2(-w, h),
      new Vector2(-w, w),
      new Vector2(-h, w),
    ]

    // 创建形状和几何体
    const shape = new Shape(points)

    const shapeGeometry = new ShapeGeometry(shape, 24)

    return shapeGeometry
  }
}
