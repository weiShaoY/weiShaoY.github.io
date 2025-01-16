<script lang="ts" setup>
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

// 定义组件中的场景、相机和渲染器
let scene: THREE.Scene

let camera: THREE.PerspectiveCamera

let renderer: THREE.WebGLRenderer

let controls: OrbitControls

let animationFrameId: number

// 获取容器引用
const containerRef = ref<HTMLDivElement | null>(null)

/**
 * 创建二十面体几何体
 * @param count - 要创建的几何体数量
 */
function createIcosahedrons(count: number) {
  const geometry = new THREE.IcosahedronGeometry(1, 0)

  for (let i = 0; i < count; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      flatShading: true,
    })

    const mesh = new THREE.Mesh(geometry, material)

    // 设置位置 (5个一排)
    const row = Math.floor(i / 5)

    const col = i % 5

    mesh.position.set(col * 3 - 6, row * -3 + 3, 0)

    // 添加随机旋转速度
    mesh.userData.rotationSpeed = {
      x: Math.random() * 0.02,
      y: Math.random() * 0.02,
    }

    scene.add(mesh)
  }
}

/**
 * 动画更新函数
 */
function animate() {
  animationFrameId = requestAnimationFrame(animate)

  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const { rotationSpeed } = child.userData

      if (rotationSpeed) {
        child.rotation.x += rotationSpeed.x
        child.rotation.y += rotationSpeed.y
      }
    }
  })

  controls.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  if (!containerRef.value) { return }

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight

  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.set(0, 0, 10)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)

  // 创建光源
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(5, 5, 5)
  scene.add(ambientLight, directionalLight)

  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 添加二十面体
  createIcosahedrons(10)

  // 开始动画
  animate()

  // 响应窗口大小调整
  const handleResize = () => {
    if (!containerRef.value) { return }

    camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  }

  window.addEventListener('resize', handleResize)

  // 清理函数
  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
    renderer.dispose()
    window.removeEventListener('resize', handleResize)
    scene.clear()
  })
})
</script>

<template>
  <div
    ref="containerRef"
    style="width: 100%; height: 100%; overflow: hidden;"
  />
</template>

<style scoped>
  div {
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
