import type { ThreeContainerType } from './types'

import * as three from 'three'

const clock = new three.Clock()

export function animate(
  modelRef: ThreeContainerType.ModelRefType,
  sceneRenderParams: ThreeContainerType.SceneRenderParamsType,
  uniforms: ThreeContainerType.UniformsType,
  floorUniforms: ThreeContainerType.FloorUniformsType,
  renderer: three.WebGLRenderer,
  scene: three.Scene,
  camera: three.PerspectiveCamera,
  cubeCamera: three.CubeCamera,
) {
  function animateFrame() {
    const delta = clock.getDelta() // 获取帧间隔时间

    // 更新时间统一变量
    uniforms.uTime.value += delta

    // 更新地板时间统一变量
    floorUniforms.uTime.value += delta * sceneRenderParams.floorNormalSpeed * 20

    // 渲染场景
    renderer.render(scene, camera)

    // 更新 CubeCamera
    cubeCamera.update(renderer, scene)

    // 更新轮子的旋转
    modelRef.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * sceneRenderParams.speedFactor)
    })

    // 请求下一帧
    requestAnimationFrame(animateFrame)
  }

  // 开始动画循环
  requestAnimationFrame(animateFrame)
}
