import { BufferGeometry, Shape } from 'three'

/**
 * 圆环线条几何体参数类型
 */
type CircleLineGeometryParameters = {

  /**
   * 半径
   */
  radius: number

  /**
   * 分段数量
   */
  segmentCount: number
}

/**
 * 圆环线条几何体类
 * @description 继承自BufferGeometry，用于创建圆环线条几何体
 * @description 通过Shape的arc函数绘制圆环，然后转换为几何体
 * @description 支持自定义半径和分段数量
 * @date 2023/9/6 - 10:29:22
 */
export class CircleLineGeometry extends BufferGeometry {
  /**
   * 几何体类型
   */
  public type: string

  /**
   * 几何体参数
   */
  public parameters: CircleLineGeometryParameters

  /**
   * 构造函数
   * @param radius - 圆环半径，默认为1
   * @param segmentCount - 分段数量，默认为32
   */
  constructor(radius: number = 1, segmentCount: number = 32) {
    super()
    this.type = 'CircleLineGeometry'
    this.parameters = {
      radius,
      segmentCount,
    }

    // 创建形状对象
    const shape = new Shape()

    // 通过shape的arc函数，绘制圆环
    // 参数：中心x坐标，中心y坐标，半径，起始角度，结束角度
    shape.arc(0, 0, radius, 0, 2 * Math.PI)

    // 获取还原的分段点
    const points = shape.getPoints(segmentCount)

    // 根据点设置几何体
    this.setFromPoints(points)
  }
}
