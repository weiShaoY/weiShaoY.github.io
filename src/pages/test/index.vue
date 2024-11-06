<script setup lang="ts">
import * as THREE from 'three'

import { CineonToneMapping } from 'three'

import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

// 定义 Canvas 容器的引用类型
const threeCanvasContainer = ref<HTMLDivElement | null>(null)

// 相机配置
const cameraOptions = {
  fov: 45,
  near: 0.1,
  position: [0, 2, 5] as [number, number, number],
  far: 500,
}

// 定义 Three.js 相关的类型
let scene: THREE.Scene

let camera: THREE.PerspectiveCamera

let renderer: THREE.WebGLRenderer

onMounted(() => {
  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    cameraOptions.fov,
    window.innerWidth / window.innerHeight,
    cameraOptions.near,
    cameraOptions.far,
  )
  camera.position.set(...cameraOptions.position)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = CineonToneMapping

  // 将渲染器添加到 DOM
  if (threeCanvasContainer.value) {
    threeCanvasContainer.value.appendChild(renderer.domElement)
  }

  // 监听窗口尺寸变化
  window.addEventListener('resize', onWindowResize)

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
})

// 窗口尺寸调整
function onWindowResize() {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

// 清理工作
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div
    ref="threeCanvasContainer"
    class="webgl"
  />
</template>

<style scoped>
.webgl {
  width: 100%;
  height: 100%;
}
</style>
