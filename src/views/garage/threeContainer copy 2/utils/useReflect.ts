import type {
  Scene,
  WebGLRenderer,
} from 'three'

import type * as THREE from 'three'

import {
  Matrix4,
  NearestFilter,
  PerspectiveCamera,
  Plane,
  Quaternion,
  UnsignedByteType,
  Vector3,
  Vector4,
} from 'three'

import * as three from 'three'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import { PackedMipMapGenerator } from './csmMipmap/PackedMipMapGenerator'

type MeshReflectorMaterialConfig = {
  resolution: [number, number]
  ignoreObjects: THREE.Object3D[]
}

function useReflect(parent: THREE.Mesh, config: Partial<MeshReflectorMaterialConfig> = {
}) {
  const { resolution = [512, 512], ignoreObjects = [] } = config

  const [width, height] = resolution

  const reflectPlaneRef = ref(new Plane())

  const reflectMatrixRef = ref(new Matrix4())

  const cameraRef = ref(new PerspectiveCamera())

  const renderTarget = ref(new three.WebGLRenderTarget(width, height, {
    type: UnsignedByteType,
  }))

  const mipMaper = new PackedMipMapGenerator()

  const renderTargetMipMap = ref(new three.WebGLRenderTarget(width, height, {
    type: UnsignedByteType,
  }))

  const beforeRender = (renderer: WebGLRenderer, scene: Scene, baseCamera: THREE.Camera) => {
    if (!parent) {
      return
    }

    const reflectPlane = reflectPlaneRef.value

    const reflectMatrix = reflectMatrixRef.value

    const camera = cameraRef.value

    reflectPlane.set(new Vector3(0, 1, 0), 0)
    reflectPlane.applyMatrix4(parent.matrixWorld)
    camera.copy(baseCamera as PerspectiveCamera)

    const r = new Vector3(0, 0, 1).clone().negate()

    const o = baseCamera.getWorldPosition(new Vector3())

    r.reflect(reflectPlane.normal)

    const p = new Vector3()

    reflectPlane.projectPoint(o, p)
    const y = p.clone().sub(o).add(p)

    camera.position.copy(y)

    const d = new Vector3(0, 0, -1).applyQuaternion(baseCamera.getWorldQuaternion(new Quaternion())).add(o)

    const E = new Vector3()

    parent.getWorldPosition(E)
    E.sub(d).reflect(reflectPlane.normal).negate().add(parent.getWorldPosition(new Vector3()))

    camera.up.set(0, 1, 0)
    camera.applyQuaternion(baseCamera.getWorldQuaternion(new Quaternion()))
    camera.up.reflect(reflectPlane.normal)
    camera.lookAt(E)
    camera.updateMatrixWorld()

    const L = new Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1)

    L.multiply(camera.projectionMatrix).multiply(camera.matrixWorldInverse)
    reflectMatrix.copy(L)
    reflectPlane.applyMatrix4(camera.matrixWorldInverse)

    const k = new Vector4(reflectPlane.normal.x, reflectPlane.normal.y, reflectPlane.normal.z, reflectPlane.constant)

    const X = camera.projectionMatrix

    const $ = new Vector4()

    $.x = (Math.sign(k.x) + X.elements[8]) / X.elements[0]
    $.y = (Math.sign(k.y) + X.elements[9]) / X.elements[5]
    $.z = -1
    $.w = (1 + X.elements[10]) / X.elements[14]

    k.multiplyScalar(2 / k.dot($))
    X.elements[2] = k.x
    X.elements[6] = k.y
    X.elements[10] = k.z + 1
    X.elements[14] = k.w

    const Z = renderer.getRenderTarget()

    renderer.setRenderTarget(renderTarget.value)
    renderer.state.buffers.depth.setMask(true)
    if (renderer.autoClear === false) {
      renderer.clear()
    }

    ignoreObjects.forEach(obj => (obj.visible = false))
    renderer.render(scene, camera)
    ignoreObjects.forEach(obj => (obj.visible = true))

    renderer.setRenderTarget(Z)
  }

  onMounted(() => {
    function animate(renderer: WebGLRenderer, scene: Scene, baseCamera: THREE.Camera) {
      beforeRender(renderer, scene, baseCamera)
      mipMaper.update(renderTarget.value.texture, renderTargetMipMap.value, renderer)
      requestAnimationFrame(() => animate(renderer, scene, baseCamera))
    }

    // Initialize the render loop here (renderer, scene, and baseCamera need to be passed)
  })

  onUnmounted(() => {
    renderTarget.value.dispose()
    renderTargetMipMap.value.dispose()
  })

  return {
    matrix: reflectMatrixRef.value,
    renderTarget: renderTargetMipMap.value,
  }
}

export {
  useReflect,
}
