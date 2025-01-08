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
  const delta = clock.getDelta() // 获取帧间隔时间

  function animateFrame() {
    requestAnimationFrame(animateFrame)

    // 更新时间统一变量
    uniforms.uTime.value += delta

    // 更新地板时间统一变量
    floorUniforms.uTime.value += delta * sceneRenderParams.floorNormalSpeed * 20

    renderer.render(scene, camera)

    cubeCamera.update(renderer, scene)

    modelRef.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * sceneRenderParams.speedFactor)
    })
  }

  // 开始动画循环
  animateFrame()
}
