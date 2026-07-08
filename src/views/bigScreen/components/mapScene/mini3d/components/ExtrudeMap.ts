import { geoMercator } from 'd3-geo' // 导入地理投影库

import {
  ExtrudeGeometry, // 挤压几何体
  Group, // 组对象
  Mesh, // 网格对象
  MeshBasicMaterial, // 基础网格材质

  Object3D, // 3D对象基类
  Shape, // 形状类
  Vector3, // 三维向量
} from 'three'

import { transfromMapGeoJSON } from '..' // 导入地图数据转换函数

/**
 * 挤压地图类 - 创建3D挤压地图效果
 * 将2D地理数据转换为3D立体地图
 */
export class ExtrudeMap {
  private mapGroup: Group // 地图组对象
  private assets: any // 资源对象
  private time: any // 时间对象
  private coordinates: Array<{ // 坐标信息数组
    name: string
    center: number[]
    centroid: number[]
  }>

  private config: { // 配置选项
    position: Vector3
    geoProjectionCenter: [number, number] // 地理投影中心
    geoProjectionScale: number // 地理投影缩放
    data: string // 地图数据
    renderOrder: number // 渲染顺序
    topFaceMaterial: MeshBasicMaterial // 顶面材质
    sideMaterial: MeshBasicMaterial // 侧面材质
    depth: number // 挤压深度
  }

  /**
   * 构造函数
   * @param param0 参数对象
   * @param param0.assets 资源对象
   * @param param0.time 时间对象
   * @param config 配置选项
   */
  constructor({ assets, time }: { assets: any, time: any }, config: any = {
}) {
    this.mapGroup = new Group() // 创建地图组
    this.assets = assets // 设置资源对象
    this.time = time // 设置时间对象
    this.coordinates = [] // 初始化坐标数组

    // 合并配置选项
    this.config = Object.assign(
      {
        position: new Vector3(0, 0, 0), // 默认位置
        geoProjectionCenter: [0, 0] as [number, number], // 默认地理投影中心
        geoProjectionScale: 120, // 默认地理投影缩放
        data: '', // 默认地图数据
        renderOrder: 1, // 默认渲染顺序
        topFaceMaterial: new MeshBasicMaterial({ // 默认顶面材质
          color: 0x18263B, // 深蓝色
          transparent: true, // 启用透明
          opacity: 1, // 不透明度
        }),
        sideMaterial: new MeshBasicMaterial({ // 默认侧面材质
          color: 0x07152B, // 深蓝黑色
          transparent: true, // 启用透明
          opacity: 1, // 不透明度
        }),
        depth: 0.1, // 默认挤压深度
      },
      config, // 用户配置
    )

    this.mapGroup.position.copy(this.config.position) // 设置地图组位置

    const mapData = transfromMapGeoJSON(this.config.data) // 转换地图数据

    this.create(mapData) // 创建地图
  }

  /**
   * 地理投影转换
   * @param args 经纬度坐标
   * @returns 投影后的坐标
   */
  geoProjection(args: [number, number]): [number, number] | null {
    return geoMercator() // 使用墨卡托投影
      .center(this.config.geoProjectionCenter) // 设置投影中心
      .scale(this.config.geoProjectionScale) // 设置投影缩放
      .translate([0, 0])(args) // 执行投影转换
  }

  /**
   * 创建挤压地图
   * @param mapData 地图数据
   */
  create(mapData: any) {
    mapData.features.forEach((feature: any) => { // 遍历所有地理特征
      const group = new Object3D() // 为每个特征创建组

      const { name, center = [], centroid = [] } = feature.properties // 提取属性信息

      this.coordinates.push({ // 保存坐标信息
        name, // 名称
        center, // 中心点
        centroid, // 质心点
      })

      const extrudeSettings = { // 挤压设置
        depth: this.config.depth, // 挤压深度
        bevelEnabled: true, // 启用倒角
        bevelSegments: 1, // 倒角分段数
        bevelThickness: 0.1, // 倒角厚度
      }

      const materials = [this.config.topFaceMaterial, this.config.sideMaterial] // 材质数组

      feature.geometry.coordinates.forEach((multiPolygon: any) => { // 遍历多边形坐标
        multiPolygon.forEach((polygon: any, _index: number) => { // 遍历单个多边形
          const shape = new Shape() // 创建形状对象

          for (let i = 0; i < polygon.length; i++) { // 遍历多边形的所有顶点
            if (!polygon[i][0] || !polygon[i][1]) { // 检查坐标有效性
              return false // 无效坐标则返回
            }

            const projected = this.geoProjection(polygon[i]) // 投影坐标

            if (!projected) {
              continue
            } // 跳过无效投影

            const [x, y] = projected // 解构投影后的坐标

            if (i === 0) { // 第一个顶点
              shape.moveTo(x, -y) // 移动到起始点
            }

            shape.lineTo(x, -y) // 绘制线条到当前点
          }

          const geometry = new ExtrudeGeometry(shape, extrudeSettings) // 创建挤压几何体

          const mesh = new Mesh(geometry, materials) // 创建网格对象

          group.add(mesh) // 将网格添加到组中
        })
      })
      this.mapGroup.add(group) // 将特征组添加到地图组中
    })
  }

  /**
   * 获取坐标信息
   * @returns 坐标数组
   */
  getCoordinates() {
    return this.coordinates // 返回坐标信息
  }

  /**
   * 获取资源对象
   * @returns 资源对象
   */
  getAssets() {
    return this.assets // 返回资源对象
  }

  /**
   * 获取时间对象
   * @returns 时间对象
   */
  getTime() {
    return this.time // 返回时间对象
  }

  /**
   * 设置父对象
   * @param parent 父对象
   */
  setParent(parent: any) {
    parent.add(this.mapGroup) // 将地图组添加到父对象中
  }
}
