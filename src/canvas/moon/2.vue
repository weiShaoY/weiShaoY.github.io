<script lang="ts" setup>
import * as THREE from 'three'

import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import bumpImage from './image/bumpImage.jpeg'

const moonContainer = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene

let camera: THREE.PerspectiveCamera

let renderer: THREE.WebGLRenderer

let sphereMesh: THREE.Mesh

onMounted(() => {
  if (moonContainer.value) {
    // 创建场景
    scene = new THREE.Scene()

    // 创建相机
    camera = new THREE.PerspectiveCamera(
      75,
      moonContainer.value.clientWidth / moonContainer.value.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    renderer.setSize(
      moonContainer.value.clientWidth,
      moonContainer.value.clientHeight,
    )
    moonContainer.value.appendChild(renderer.domElement)

    // 创建球体几何体和材质
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32)

    const textureLoader = new THREE.TextureLoader()

    const moonTexture = textureLoader.load(bumpImage) // 替换为你的月亮纹理路径

    const sphereMaterial = new THREE.MeshPhongMaterial({
      map: moonTexture,
    })

    // 创建球体网格
    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphereMesh)

    // 创建光源
    const light = new THREE.DirectionalLight(0xFFFFFF, 1)

    light.position.set(5, 5, 5).normalize()
    scene.add(light)

    // 添加环境光（可选）
    const ambientLight = new THREE.AmbientLight(0x404040) // soft white light

    scene.add(ambientLight)

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate)

      // 旋转动画
      sphereMesh.rotation.y += 0.01 // 每帧绕 Y 轴旋转
      sphereMesh.rotation.x += 0.005 // 每帧绕 X 轴旋转

      renderer.render(scene, camera)
    }

    animate()
  }
})

onBeforeUnmount(() => {
  // 清理资源
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div
    ref="moonContainer"
    class="moon-container"
  />
</template>

<style scoped>
.moon-container {
  width: 400px;
  height: 400px;
  overflow: hidden;
}
</style>
