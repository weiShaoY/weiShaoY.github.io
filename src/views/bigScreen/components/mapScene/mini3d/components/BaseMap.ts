import { geoMercator } from 'd3-geo'

import {
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Shape,
  ShapeGeometry,
  Vector3,
} from 'three'

import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

import { transfromMapGeoJSON } from '..'

// 为了更好地类型安全，定义一个接口
type BaseMapConfig = {
  position: Vector3
  geoProjectionCenter: [number, number]
  geoProjectionScale: number
  data: string
  renderOrder: number
  merge: boolean
  material: MeshBasicMaterial
}

export class BaseMap {
  private config: {
    position: Vector3
    geoProjectionCenter: [number, number]
    geoProjectionScale: number
    data: string
    renderOrder: number
    merge: boolean
    material: MeshBasicMaterial
  }

  private mapGroup: Group

  private coordinates: Array<{
    name: string
    center: number[]
    centroid: number[]
  }>

  constructor(_: void, config = {
}) {
    this.mapGroup = new Group()
    this.coordinates = []

    const defaultConfig = {
      position: new Vector3(0, 0, 0),
      geoProjectionCenter: [0, 0] as const, // 关键：使用 as const
      geoProjectionScale: 120,
      data: '',
      renderOrder: 1,
      merge: false,
      material: new MeshBasicMaterial({
        color: 0x18263B,
        transparent: true,
        opacity: 1,
      }),
    }

    this.config = Object.assign({
    }, defaultConfig, config) as BaseMapConfig // 类型断言

    this.mapGroup.position.copy(this.config.position)
    const mapData = transfromMapGeoJSON(this.config.data)

    this.create(mapData)
  }

  geoProjection(args: any) {
    return geoMercator()
      .center(this.config.geoProjectionCenter)
      .scale(this.config.geoProjectionScale)
      .translate([0, 0])(args)
  }

  create(mapData: any) {
    const { merge } = this.config

    const shapes: ShapeGeometry[] = []

    mapData.features.forEach((feature: any) => {
      const group = new Object3D()

      const { name, center = [], centroid = [] } = feature.properties

      this.coordinates.push({
        name,
        center,
        centroid,
      })
      group.userData.name = name
      feature.geometry.coordinates.forEach((multiPolygon: any) => {
        multiPolygon.forEach((polygon: any) => {
          const shape = new Shape()

          for (let i = 0; i < polygon.length; i++) {
            if (!polygon[i][0] || !polygon[i][1]) {
              return false
            }

            const [x, y] = this.geoProjection(polygon[i]) as [number, number]

            if (i === 0) {
              shape.moveTo(x, -y)
            }

            shape.lineTo(x, -y)
          }

          const geometry = new ShapeGeometry(shape)

          if (merge) {
            shapes.push(geometry)
          }
          else {
            const mesh = new Mesh(geometry, this.config.material)

            mesh.renderOrder = this.config.renderOrder
            mesh.userData.name = name
            group.add(mesh)
          }
        })
      })
      if (!merge) {
        this.mapGroup.add(group)
      }
    })
    if (merge) {
      const geometry = mergeGeometries(shapes)

      const mesh = new Mesh(geometry, this.config.material)

      mesh.renderOrder = this.config.renderOrder
      this.mapGroup.add(mesh)
    }
  }

  getCoordinates() {
    return this.coordinates
  }

  setParent(parent: Object3D) {
    parent.add(this.mapGroup)
  }
}
