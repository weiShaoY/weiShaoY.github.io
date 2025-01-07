import type { ThreeContainerType } from './types'

import * as three from 'three'

const clock = new three.Clock()

export function animate(
  modelRef: Ref<ThreeContainerType.ModelRefType>,
  sceneRenderParams: Ref<ThreeContainerType.SceneRenderParamsType>,
  uniforms: Ref<ThreeContainerType.UniformsType>,
  floorUniforms: Ref<ThreeContainerType.FloorUniformsType>,
) {
  // 获取每一帧的时间差
  // const delta = clock.getDelta()

  // // 更新统一变量的时间值
  // uniforms.value.uTime.value += delta
  // floorUniforms.value.uTime.value += delta * sceneRenderParams.value.floorNormalSpeed * 20

  // // 暂时隐藏 cargltf 场景
  // // if (carGltf.scene) {
  // //   carGltf.scene.visible = false
  // // }

  // // // 更新 CubeCamera
  // // if (cubeCamera && scene) {
  // //   cubeCamera.update(renderer, scene) // 假设有 renderer
  // // }

  // // // 恢复 carGltf 场景
  // // if (carGltf.scene) {
  // //   carGltf.scene.visible = true
  // // }

  // // 递归调用动画，使用 requestAnimationFrame 保证高效渲染
  // // 使用一个局部变量来处理帧动画
  // const animateFrame = () => {
  //   requestAnimationFrame(animateFrame)
  //   animate(modelRef, sceneRenderParams, uniforms, floorUniforms)
  // }

  // 使用下一帧的回调避免递归陷入响应式更新
  const animateFrame = () => {
    const delta = clock.getDelta() // 获取帧间隔时间

    // 更新 uniforms 和 floorUniforms 的时间
    uniforms.value.uTime.value += delta
    floorUniforms.value.uTime.value += delta * sceneRenderParams.value.floorNormalSpeed * 20

    // 更新模型轮子的旋转
    modelRef.value.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * sceneRenderParams.value.speedFactor)
    })

    // 确保 requestAnimationFrame 只被调用一次
    requestAnimationFrame(animateFrame)
  }

  // 启动动画
  animateFrame()
}
