import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three'

export class Plane {
  constructor({ time }, options) {
    this.time = time
    this.options = Object.assign(
      {},
      {
        width: 10,
        scale: 1,
        position: new Vector3(0, 0, 0),
        needRotate: false,
        rotateSpeed: 0.001,
        material: new MeshBasicMaterial({
          transparent: true,
          opacity: 1,
          depthTest: true,
        }),
      },
      options,
    )
    const plane = new PlaneGeometry(this.options.width, this.options.width)
    const mesh = new Mesh(plane, this.options.material)
    mesh.position.copy(this.options.position)
    mesh.scale.set(this.options.scale, this.options.scale, this.options.scale)
    this.instance = mesh
  }

  setParent(parent) {
    parent.add(this.instance)
    this.time.on('tick', () => {
      this.update()
    })
  }

  update() {
    if (this.options.needRotate) {
      this.instance.rotation.z += this.options.rotateSpeed
    }
  }
}
