import type { Ref } from 'vue'

import type { ThreeContainerType } from './types'

import * as three from 'three'

const clock = new three.Clock()

export function animate(
  modelRef: Ref<ThreeContainerType.ModelRefType>,
  sceneRenderParams: Ref<ThreeContainerType.SceneRenderParamsType>,
  uniforms: Ref<ThreeContainerType.UniformsType>,
  floorUniforms: Ref<ThreeContainerType.FloorUniformsType>,
  renderer: three.WebGLRenderer,
  scene: three.Scene,
  camera: three.PerspectiveCamera,
) {
  const delta = clock.getDelta() // 获取帧间隔时间

  function animateFrame() {
    requestAnimationFrame(animateFrame)

    // 更新时间统一变量
    uniforms.value.uTime.value += delta

    // 更新地板时间统一变量
    floorUniforms.value.uTime.value += delta * sceneRenderParams.value.floorNormalSpeed * 20

    renderer.render(scene, camera)

    modelRef.value.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * sceneRenderParams.value.speedFactor)
    })
  }

  // 开始动画循环
  animateFrame()
}
