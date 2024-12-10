<script lang="ts" setup>
import * as THREE from 'three'

import ThreeGlobe from 'three-globe'

import { onMounted, ref } from 'vue'

// 图片路径
import bumpImage from './image/bumpImage.jpeg'

const moonContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!moonContainer.value) { return }

  // 创建场景
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    moonContainer.value.clientWidth / moonContainer.value.clientHeight,
    0.1,
    1000,
  )

  camera.position.z = 400

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  })

  renderer.setSize(
    moonContainer.value.clientWidth,
    moonContainer.value.clientHeight,
  )
  renderer.setClearColor(0x000000, 0) // 背景透明
  moonContainer.value.appendChild(renderer.domElement)

  // 创建月球（无大气层）
  const globe = new ThreeGlobe()
    .globeImageUrl(bumpImage) // 月球纹理

  scene.add(globe)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xBBBBBB, 0) // 调低环境光，避免亮边

  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.6)

  directionalLight.position.set(400, 200, 300)
  scene.add(directionalLight)

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate)
    globe.rotation.y += 0.001 // 旋转效果
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<template>
  <div
    ref="moonContainer"
    style="width: 600px; height: 600px;"
  />
</template>

<style scoped>
div {
  overflow: hidden;
}
</style>
