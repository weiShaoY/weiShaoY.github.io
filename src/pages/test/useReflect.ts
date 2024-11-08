import type {
  Mesh,
  Scene,
} from 'three'

import {
  Matrix4,
  PerspectiveCamera,
  Plane,
  Quaternion,
  UnsignedByteType,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three'

import {
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
} from 'vue'

import { PackedMipMapGenerator } from './utils/csmMipmap/PackedMipMapGenerator'

/**
 * @typedef {object} MeshReflectorMaterialConfig
 * @property {[number, number]} resolution - 渲染目标的分辨率
 * @property {THREE.Object3D[]} ignoreObjects - 需要忽略的对象
 */

/**
 * 创建反射效果
 * @param {THREE.Mesh} parent - 反射面
 * @param {Partial<MeshReflectorMaterialConfig>} config - 配置参数
 * @returns {{ matrix: THREE.Matrix4, renderTarget: THREE.WebGLRenderTarget }} - 反射矩阵和渲染目标
 */
export function useReflect(
  parent: Mesh,
  config: Partial<{ resolution: [number, number], ignoreObjects: Object3D[] }> = {
  },
) {
  const { resolution = [512, 512], ignoreObjects = [] } = config

  const [width, height] = resolution

  // 反射面、相机和渲染目标的引用
  const reflectPlaneRef = ref(new Plane())

  const reflectMatrixRef = ref(new Matrix4())

  const cameraRef = ref(new PerspectiveCamera())

  // 渲染目标
  const renderTarget = ref(null)

  const renderTargetMipMap = ref(null)

  const mipMaper = new PackedMipMapGenerator()

  // Vue 生命周期钩子：在组件挂载时初始化渲染目标
  onMounted(() => {
    // 初始化渲染目标
    renderTarget.value = new WebGLRenderer({
      antialias: true,
      type: UnsignedByteType,
    }).getRenderTarget()

    renderTargetMipMap.value = new WebGLRenderer({
      antialias: true,
      type: UnsignedByteType,
    }).getRenderTarget()
  })

  // 计算反射矩阵和更新渲染
  const beforeRender = (scene: Scene, renderer: WebGLRenderer, baseCamera: PerspectiveCamera) => {
    if (!parent) { return }

    const reflectPlane = reflectPlaneRef.value

    const reflectMatrix = reflectMatrixRef.value

    const camera = cameraRef.value

    // 设置反射平面
    reflectPlane.set(new Vector3(0, 1, 0), 0)
    reflectPlane.applyMatrix4(parent.matrixWorld)

    // 设置反射相机
    camera.copy(baseCamera)
    const r = new Vector3(0, 0, 1).clone().negate()

    const o = baseCamera.getWorldPosition(new Vector3())

    r.reflect(reflectPlane.normal)
    const p = new Vector3()

    reflectPlane.projectPoint(o, p)

    const y = p.clone()

    y.sub(o)
    y.add(p)
    camera.position.copy(y)

    const d = new Vector3(0, 0, -1)

    d.applyQuaternion(baseCamera.getWorldQuaternion(new Quaternion()))
    d.add(o)

    const E = new Vector3()

    parent.getWorldPosition(E)
    E.sub(d)
    E.reflect(reflectPlane.normal).negate()
    E.add(parent.getWorldPosition(new Vector3()))

    camera.up.set(0, 1, 0)
    camera.applyQuaternion(baseCamera.getWorldQuaternion(new Quaternion()))
    camera.up.reflect(reflectPlane.normal)
    camera.lookAt(E)
    camera.updateMatrixWorld()

    const L = new Matrix4()

    L.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1)
    L.multiply(camera.projectionMatrix)
    L.multiply(camera.matrixWorldInverse)
    reflectMatrix.copy(L)

    reflectPlane.applyMatrix4(camera.matrixWorldInverse)

    const k = new Vector4(
      reflectPlane.normal.x,
      reflectPlane.normal.y,
      reflectPlane.normal.z,
      reflectPlane.constant,
    )

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

    // 设置渲染目标
    const Z = renderer.getRenderTarget()

    renderer.setRenderTarget(renderTarget.value)
    renderer.state.buffers.depth.setMask(true)
    renderer.autoClear === false && renderer.clear()

    // 隐藏被忽略的对象
    ignoreObjects.forEach(be => (be.visible = false))
    renderer.render(scene, camera)

    // 恢复被忽略对象的可见性
    ignoreObjects.forEach(be => (be.visible = true))
    renderer.setRenderTarget(Z)
  }

  // 每帧更新
  watchEffect(() => {
    // 获取当前的场景、渲染器和相机
    const { scene, camera: baseCamera, gl: renderer } = useThree()

    beforeRender(scene, renderer, baseCamera)

    mipMaper.update(renderTarget.value.texture, renderTargetMipMap.value, renderer)
  })

  return {
    matrix: reflectMatrixRef.value,
    renderTarget: renderTargetMipMap.value,
  }
}
