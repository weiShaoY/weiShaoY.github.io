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

export class BaseMap {
  private mapGroup: Group

  private coordinates: Array<{
    name: string
    center: number[]
    centroid: number[]
  }>

  private config: {
    position: Vector3
    geoProjectionCenter: [number, number]
    geoProjectionScale: number
    data: string
    renderOrder: number
    merge: boolean
    material: MeshBasicMaterial
  }

  constructor(config = {
}) {
    this.mapGroup = new Group()
    this.coordinates = []
    this.config = Object.assign(
      {
        position: new Vector3(0, 0, 0),
        geoProjectionCenter: [0, 0] as [number, number],
        geoProjectionScale: 120,
        data: '',
        renderOrder: 1,
        merge: false,
        material: new MeshBasicMaterial({
          color: 0x18263B,
          transparent: true,
          opacity: 1,
        }),
      },
      config,
    )
    this.mapGroup.position.copy(this.config.position)

    // 检查数据是否有效
    if (!this.config.data || this.config.data.trim() === '') {
      console.warn('BaseMap: 地图数据为空，跳过创建')
      return
    }

    const mapData = transfromMapGeoJSON(this.config.data)

    this.create(mapData)
  }

  geoProjection(args: [number, number]): [number, number] | null {
    return geoMercator()
      .center(this.config.geoProjectionCenter)
      .scale(this.config.geoProjectionScale)
      .translate([0, 0])(args)
  }

  create(mapData: any) {
    const { merge } = this.config

    const shapes: any[] = []

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

            const projected = this.geoProjection(polygon[i])

            if (!projected) {
              continue
            }

            const [x, y] = projected

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
