import type { Object3D } from 'three'

// @ts-expect-error - point-in-polygon 没有类型定义
import pointInPolygon from 'point-in-polygon'

import { Box3, Vector3 } from 'three'

/**
 * 类型检查函数
 * @param type - 期望的类型名称
 * @param value - 要检查的值
 * @returns 是否为指定类型
 */
export function isType(type: string, value: unknown): boolean {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

/**
 * 检查值是否为对象
 * @param value - 要检查的值
 * @returns 是否为对象类型
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return isType('Object', value)
}

/**
 * 检查值是否为数组
 * @param value - 要检查的值
 * @returns 是否为数组类型
 */
export function isArray(value: unknown): value is unknown[] {
  return isType('Array', value)
}

/**
 * 生成UUID字符串
 * @param len - UUID长度（当len>0时生成指定长度的随机字符串）
 * @param radix - 进制基数（默认62，包含数字、大小写字母）
 * @returns 生成的UUID字符串
 * @description 当len>0时生成指定长度的随机字符串，否则生成标准UUID格式
 */
export function uuid(len: number = 10, radix: number = 62): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

  const uuid: string[] = []

  let i: number

  radix = radix || chars.length

  if (len) {
    // 生成指定长度的随机字符串
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  }
  else {
    // 生成标准UUID格式
    let r: number

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 边界框信息类型
 */
type BoundBoxInfo = {

  /**
   * Three.js边界框对象
   */
  box3: Box3

  /**
   * 边界框尺寸
   */
  boxSize: Vector3

  /**
   * 边界框中心点
   */
  center: Vector3

  /**
   * 几何体尺寸（如果存在几何体）
   */
  size?: Vector3
}

/**
 * 获取3D对象的边界框信息
 * @param group - Three.js对象（Object3D或其子类）
 * @returns 包含边界框信息的对象
 * @description 计算对象的包围盒，包括尺寸、中心点等信息
 */
export function getBoundBox(group: Object3D): BoundBoxInfo {
  const size = new Vector3()

  const box3 = new Box3()

  box3.expandByObject(group)

  const boxSize = new Vector3()

  box3.getSize(boxSize)

  const center = new Vector3()

  box3.getCenter(center)

  const obj: BoundBoxInfo = {
    box3,
    boxSize,
    center,
  }

  // 如果对象有几何体，计算几何体的精确尺寸
  if ('geometry' in group && group.geometry) {
    const geometry = group.geometry as any

    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()

    const { max, min } = geometry.boundingBox!

    size.x = max.x - min.x
    size.y = max.y - min.y
    size.z = max.z - min.z
    obj.size = size
  }

  return obj
}

/**
 * GeoJSON要素类型
 */
type GeoJSONFeature = {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: {
    type: 'Polygon' | 'MultiPolygon' | 'LineString' | 'MultiLineString'
    coordinates: number[][][] | number[][][][]
  }
}

/**
 * GeoJSON数据类型
 */
type GeoJSONData = {
  type: 'FeatureCollection'
  features: GeoJSONFeature[]
}

/**
 * 转换地图GeoJSON数据格式
 * @param data - GeoJSON字符串数据
 * @returns 转换后的GeoJSON对象
 * @description 将Polygon类型转换为MultiPolygon格式，统一数据结构
 */
export function transfromMapGeoJSON(data: string): GeoJSONData {
  const worldData: GeoJSONData = JSON.parse(data)

  const features = worldData.features

  for (let i = 0; i < features.length; i++) {
    const element = features[i]

    // 将Polygon类型转换为MultiPolygon格式
    if (['Polygon'].includes(element.geometry.type)) {
      element.geometry.coordinates = [element.geometry.coordinates as number[][][]]
    }
  }

  return worldData
}

/**
 * 转换地理道路数据格式
 * @param roadData - 道路GeoJSON数据
 * @returns 转换后的道路数据
 * @description 将LineString类型转换为MultiLineString格式，统一数据结构
 */
export function transformGeoRoad(roadData: GeoJSONData): GeoJSONData {
  const features = roadData.features

  for (let i = 0; i < features.length; i++) {
    const element = features[i]

    // LineString处理跟MultiLineString一样的数据结构
    if (element.geometry.type === 'LineString') {
      element.geometry.coordinates = [[element.geometry.coordinates as unknown as number[][]]]
    }
    else {
      element.geometry.coordinates = [element.geometry.coordinates as unknown as number[][][]]
    }
  }

  return roadData
}

/**
 * 深度克隆数据
 * @param data - 要克隆的数据
 * @returns 克隆后的数据
 * @description 递归克隆对象和数组，创建完全独立的副本
 */
export function deepClone<T>(data: T): T {
  let obj: any

  if (isArray(data)) {
    obj = []
  }
  else if (isObject(data)) {
    obj = {
    }
  }
  else {
    return data
  }

  if (isArray(data)) {
    for (let i = 0; i < data.length; i += 1) {
      obj.push(deepClone(data[i]))
    }
  }
  else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      obj[key] = deepClone((data as Record<string, unknown>)[key])
    })
  }

  return obj
}

/**
 * 深度合并对象
 * @param target - 目标对象
 * @param source - 源对象
 * @returns 合并后的对象
 * @description 递归合并两个对象，源对象的属性会覆盖目标对象的同名属性
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
  target = deepClone(target)

  for (const key in source) {
    if (key in target) {
      if (isObject(source[key])) {
        if (!isObject(target[key])) {
          (target as any)[key] = source[key]
        }
        else {
          (target as any)[key] = deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>)
        }
      }
      else {
        (target as any)[key] = source[key]
      }
    }
    else {
      (target as any)[key] = source[key]
    }
  }

  return target
}

/**
 * 3D坐标点类型
 */
type Vector3Point = {
  x: number
  y: number
  z: number
}

/**
 * 将经纬度转换为3D坐标
 * @param longitude - 经度
 * @param latitude - 纬度
 * @param R - 球体半径（默认100）
 * @returns 3D坐标点
 * @description 将地理坐标转换为球面3D坐标，用于地球等球体模型
 */
export function latLongToVector3(longitude: number, latitude: number, R: number = 100): Vector3Point {
  let lon = (longitude * Math.PI) / 180 // 转弧度值

  const lat = (latitude * Math.PI) / 180 // 转弧度值

  lon = -lon // 经度取反

  const x = R * Math.cos(lat) * Math.cos(lon)

  const y = R * Math.sin(lat)

  const z = R * Math.cos(lat) * Math.sin(lon)

  return {
    x,
    y,
    z,
  }
}

/**
 * 设置网格对象的四元数和位置
 * @param mesh - Three.js网格对象
 * @param lon - 经度
 * @param lat - 纬度
 * @param R - 球体半径
 * @returns 设置后的网格对象
 * @description 根据经纬度设置网格在球面上的位置和朝向
 */
export function setMeshQuaternion(mesh: Object3D, lon: number, lat: number, R: number): Object3D {
  const { x, y, z } = latLongToVector3(lon, lat, R)

  mesh.position.set(x, y, z)

  const meshVector = new Vector3(x, y, z).normalize()

  const normal = new Vector3(0, 0, 1)

  // 计算两个向量之间构成的四元数值
  mesh.quaternion.setFromUnitVectors(normal, meshVector)

  return mesh
}

/**
 * 最小最大值结果类型
 */
type MinMaxResult = {
  min: number
  max: number
}

/**
 * 查找数组中的最小值和最大值
 * @param arr - 数字数组
 * @returns 包含最小值和最大值的对象
 */
export function findMinMax(arr: number[]): MinMaxResult {
  const max = arr.reduce((a, b) => Math.max(a, b), Math.max(arr[0], arr[1]))

  const min = arr.reduce((a, b) => Math.min(a, b), Math.min(arr[0], arr[1]))

  return {
    max,
    min,
  }
}

/**
 * 根据指定函数查找数组中的最小值项
 * @param data - 数据数组
 * @param getter - 获取比较值的函数
 * @returns 最小值项
 * @example
 * ```typescript
 * let data = [
 *   {x: 0, y: 1, value: 3},
 *   {x: 10, y: 2, value: 13}
 * ];
 * let min = minBy(data, o => o.x);
 * console.log(min.x); // 0
 * ```
 */
export function minBy<T>(data: T[], getter: (item: T) => number): T {
  let minItem = data[0]

  for (let i = 1; i < data.length; i++) {
    const item = data[i]

    if (getter(item) < getter(minItem)) {
      minItem = item
    }
  }

  return minItem
}

/**
 * 根据指定函数查找数组中的最大值项
 * @param data - 数据数组
 * @param getter - 获取比较值的函数
 * @returns 最大值项
 * @example
 * ```typescript
 * let data = [
 *   {x: 0, y: 1, value: 3},
 *   {x: 10, y: 2, value: 13}
 * ];
 * let max = maxBy(data, o => o.y);
 * console.log(max.y); // 2
 * ```
 */
export function maxBy<T>(data: T[], getter: (item: T) => number): T {
  let maxItem = data[0]

  for (let i = 1; i < data.length; i++) {
    const item = data[i]

    if (getter(item) > getter(maxItem)) {
      maxItem = item
    }
  }

  return maxItem
}

/**
 * 坐标点类型
 */
type CoordinatePoint = {
  x: number
  y: number
}

/**
 * 网格生成结果类型
 */
type GridResult = {

  /**
   * 多边形内部的网格点（Vector3格式）
   */
  scopeInsidePoint: Vector3[]

  /**
   * 所有网格点（二维坐标格式）
   */
  scopePoint: number[][]
}

/**
 * 生成多边形内部的网格点
 * @param coordinates - 多边形顶点坐标数组
 * @param gap - 网格间距（默认3）
 * @returns 包含内部网格点和所有网格点的对象
 * @description 在多边形边界内生成规则网格点，用于填充或采样
 */
export function generateGrid(coordinates: CoordinatePoint[], gap: number = 3): GridResult {
  const coords = coordinates.map((item) => {
    return [item.x, item.y]
  })

  // 计算边界范围
  const minLon = Math.floor(
    minBy(coordinates, (o) => {
      return o.x
    }).x,
  )

  const maxLon = Math.ceil(
    maxBy(coordinates, (o) => {
      return o.x
    }).x,
  )

  const minLat = Math.floor(
    minBy(coordinates, (o) => {
      return o.y
    }).y,
  )

  const maxLat = Math.ceil(
    maxBy(coordinates, (o) => {
      return o.y
    }).y,
  )

  // 计算网格范围
  const lonScope = Math.ceil((maxLon - minLon) / gap)

  const latScope = Math.ceil((maxLat - minLat) / gap)

  const scopePoint: number[][] = []

  // 生成所有网格点
  for (let i = 0; i < lonScope + 1; i++) {
    const x = minLon + i * gap

    for (let j = 0; j < latScope + 1; j++) {
      const y = minLat + j * gap

      scopePoint.push([x, y])
    }
  }

  // 筛选多边形内部的点并转换为Vector3格式
  const scopeInsidePoint = scopePoint
    .filter((item) => {
      return pointInPolygon(item, coords)
    })
    .map((item) => {
      return new Vector3(item[0], item[1], 0)
    })

  return {
    scopeInsidePoint,
    scopePoint,
  }
}
