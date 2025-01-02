<script lang="ts" setup>
import { Leva } from 'leva'

import * as THREE from 'three'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import Sketch3 from './components/Sketch3.vue'

const threeContainerRef = ref<HTMLCanvasElement | null>(null)

let renderer, scene, camera, animationFrameId

function initScene() {
  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(0, 2, 5)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: threeContainerRef.value as HTMLCanvasElement,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = THREE.CineonToneMapping

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5)

  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 10, 0)
  scene.add(directionalLight)

  // 初始化子组件
  const sketch = new Sketch3(scene)

  sketch.init()

  // 开始动画循环
  animate()
}

function animate() {
  animationFrameId = requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

// 处理窗口大小调整
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div>
    <Leva
      :hidden="location.hash !== '#debug'"
      :collapsed="true"
    />

    <canvas
      ref="threeContainerRef"
      class="h-screen w-full"
    />
  </div>
</template>

<style scoped>
.h-screen {
  height: 100vh;
}
.w-full {
  width: 100%;
}
.canvas {
  display: block;
}
</style>
