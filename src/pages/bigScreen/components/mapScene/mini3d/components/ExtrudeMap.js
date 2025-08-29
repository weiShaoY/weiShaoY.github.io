import { geoMercator } from 'd3-geo'
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshStandardMaterial,
  MultiplyBlending,
  Object3D,
  RepeatWrapping,
  Shape,
  Vector2,
  Vector3,
} from 'three'
import { transfromMapGeoJSON } from '..'

export class ExtrudeMap {
  constructor({ assets, time }, config = {}) {
    this.mapGroup = new Group()
    this.assets = assets
    this.time = time
    this.coordinates = []
    this.config = Object.assign(
      {
        position: new Vector3(0, 0, 0),
        geoProjectionCenter: new Vector2(0, 0),
        geoProjectionScale: 120,
        data: '',
        renderOrder: 1,
        topFaceMaterial: new MeshBasicMaterial({
          color: 0x18263B,
          transparent: true,
          opacity: 1,
        }),
        sideMaterial: new MeshBasicMaterial({
          color: 0x07152B,
          transparent: true,
          opacity: 1,
        }),
        depth: 0.1,
      },
      config,
    )
    this.mapGroup.position.copy(this.config.position)

    const mapData = transfromMapGeoJSON(this.config.data)
    this.create(mapData)
  }

  geoProjection(args) {
    return geoMercator()
      .center(this.config.geoProjectionCenter)
      .scale(this.config.geoProjectionScale)
      .translate([0, 0])(args)
  }

  create(mapData) {
    mapData.features.forEach((feature) => {
      const group = new Object3D()

      const { name, center = [], centroid = [] } = feature.properties
      this.coordinates.push({ name, center, centroid })

      const extrudeSettings = {
        depth: this.config.depth,
        bevelEnabled: true,
        bevelSegments: 1,
        bevelThickness: 0.1,
      }
      const materials = [this.config.topFaceMaterial, this.config.sideMaterial]
      feature.geometry.coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((polygon, index) => {
          const shape = new Shape()
          for (let i = 0; i < polygon.length; i++) {
            if (!polygon[i][0] || !polygon[i][1]) {
              return false
            }
            const [x, y] = this.geoProjection(polygon[i])
            if (i === 0) {
              shape.moveTo(x, -y)
            }
            shape.lineTo(x, -y)
          }

          const geometry = new ExtrudeGeometry(shape, extrudeSettings)
          const mesh = new Mesh(geometry, materials)

          group.add(mesh)
        })
      })
      this.mapGroup.add(group)
    })
  }

  getCoordinates() {
    return this.coordinates
  }

  setParent(parent) {
    parent.add(this.mapGroup)
  }
}
