import { geoMercator } from 'd3-geo'

import {
  BufferGeometry,
  CatmullRomCurve3,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  TubeGeometry,
  Vector3,
} from 'three'

import { Line2 } from 'three/addons/lines/Line2.js'

// import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'

import { transfromMapGeoJSON } from '..'

/**
 * 线条类 - 创建和管理3D地图线条
 * 支持多种线条类型：Line2、Line3、普通线条
 */
export class Line {
  private config: {
    visibelProvince: string
    geoProjectionCenter: [number, number]
    geoProjectionScale: number
    position: Vector3
    data: string
    material: any // 支持多种材质类型
    type: string
    renderOrder: number
    tubeRadius: number
  }

  private lineGroup: Group

  /**
   * 构造函数
   * @param base 基础对象
   * @param config 配置选项
   */
  constructor(base: any, config: any = {
}) {
    // 合并配置选项
    this.config = Object.assign(
      {
        visibelProvince: '', // 可见省份
        geoProjectionCenter: [0, 0], // 地理投影中心
        geoProjectionScale: 120, // 地理投影缩放
        position: new Vector3(0, 0, 0), // 位置
        data: '', // 地图数据
        material: new LineBasicMaterial({
          color: 0xFFFFFF, // 线条颜色
        }),
        type: 'LineLoop', // 线条类型
        renderOrder: 1, // 渲染顺序
        tubeRadius: 0.2, // 管道半径
      },
      config,
    )

    // 转换地图数据
    const mapData = transfromMapGeoJSON(this.config.data)

    // 创建线条组
    const lineGroup = this.create(mapData)

    this.lineGroup = lineGroup

    // 设置位置
    this.lineGroup.position.copy(this.config.position)
  }

  /**
   * 地理投影转换
   * @param args 经纬度坐标
   * @returns 投影后的坐标
   */
  geoProjection(args: [number, number]): [number, number] | null {
    return geoMercator()
      .center(this.config.geoProjectionCenter)
      .scale(this.config.geoProjectionScale)
      .translate([0, 0])(args)
  }

  /**
   * 创建线条
   * @param data 地图数据
   * @returns 线条组
   */
  create(data: any) {
    const { type, visibelProvince } = this.config

    const features = data.features

    const lineGroup = new Group()

    // 遍历所有地理特征
    for (let i = 0; i < features.length; i++) {
      const element = features[i]

      const group = new Group()

      group.name = `meshLineGroup${i}`

      // 跳过指定省份
      if (element.properties.name === visibelProvince) {
        continue
      }

      // 处理每个坐标集合
      element.geometry.coordinates.forEach((coords: any) => {
        const points: any[] = []

        let line: any = null

        if (type === 'Line2') {
          // 创建Line2类型的线条
          coords[0].forEach((item: any) => {
            const projected = this.geoProjection(item)

            if (!projected) {
              return
            }

            const [x, y] = projected

            points.push(x, -y, 0)
          })
          line = this.createLine2(points)
        }
        else if (type === 'Line3') {
          // 创建Line3类型的线条
          coords[0].forEach((item: any) => {
            const projected = this.geoProjection(item)

            if (!projected) {
              return
            }

            const [x, y] = projected

            points.push(new Vector3(x, -y, 0))
          })
          line = this.createLine3(points)
        }
        else {
          // 创建普通线条
          coords[0].forEach((item: any) => {
            const projected = this.geoProjection(item)

            if (!projected) {
              return
            }

            const [x, y] = projected

            points.push(new Vector3(x, -y, 0))
          })
          line = this.createLine(points)
        }

        // 将线条添加到组中
        if (line) {
          group.add(line)
        }
      })
      lineGroup.add(group)
    }

    return lineGroup
  }

  /**
   * 创建Line3类型的线条（管道几何体）
   * @param points 点数组
   * @returns 线条网格
   */
  createLine3(points: Vector3[]) {
    const tubeRadius = this.config.tubeRadius

    const tubeSegments = 256 * 10 // 管道分段数

    const tubeRadialSegments = 4 // 管道径向分段数

    const closed = false // 是否闭合

    const { material, renderOrder } = this.config

    // 创建平滑曲线
    const curve = new CatmullRomCurve3(points)

    // 创建管道几何体
    const tubeGeometry = new TubeGeometry(
      curve,
      tubeSegments,
      tubeRadius,
      tubeRadialSegments,
      closed,
    )

    const line = new Mesh(tubeGeometry, material)

    line.name = 'mapLine3'
    line.renderOrder = renderOrder
    return line
  }

  /**
   * 创建Line2类型的线条
   * @param points 点数组
   * @returns Line2对象
   */
  createLine2(points: number[]) {
    const { material, renderOrder } = this.config

    // 创建LineGeometry
    const geometry = new LineGeometry()

    geometry.setPositions(points)

    // 创建Line2对象
    const line = new Line2(geometry, material)

    line.name = 'mapLine2'
    line.renderOrder = renderOrder
    line.computeLineDistances() // 计算线条距离
    return line
  }

  /**
   * 创建普通线条
   * @param points 点数组
   * @returns 线条对象
   */
  createLine(points: Vector3[]) {
    const { material, renderOrder } = this.config

    // 创建缓冲几何体
    const geometry = new BufferGeometry()

    geometry.setFromPoints(points)

    // 创建线条循环
    const line = new LineLoop(geometry, material)

    line.renderOrder = renderOrder
    line.name = 'mapLine'
    return line
  }

  /**
   * 设置父对象
   * @param parent 父对象
   */
  setParent(parent: any) {
    parent.add(this.lineGroup)
  }
}
