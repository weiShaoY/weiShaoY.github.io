<script lang="ts" setup>
import * as THREE from 'three'

import { onMounted, ref } from 'vue'

// 定义组件属性
const props = defineProps({
  /**
   * 图标 - 用于球体贴图的纹理路径
   */
  image: {
    type: String,
    required: true,
  },

  /**
   * 跳转地址
   */
  url: {
    type: String,
    default: '',
  },
})

console.log('%c Line:25 🍧 props', 'color:#ffdd4d', props)

// 引用用于挂载 Canvas 的容器
const canvasContainer = ref<HTMLDivElement | null>(null)

function createBallScene() {
  if (!canvasContainer.value) {
    return
  }

  // 初始化 Three.js 场景、相机和渲染器
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000,
  )

  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })

  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  )
  canvasContainer.value.appendChild(renderer.domElement)

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)

  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 0, 0.05)
  scene.add(directionalLight)

  // 加载纹理贴图
  const textureLoader = new THREE.TextureLoader()

  textureLoader.load(props.image, (texture) => {
    const geometry = new THREE.IcosahedronGeometry(1, 1)

    const material = new THREE.MeshStandardMaterial({

      map: texture, // 将纹理应用到材质
      flatShading: true, // 使三角形平滑
    })

    const ball = new THREE.Mesh(geometry, material)

    ball.castShadow = true
    ball.receiveShadow = true
    ball.scale.set(3, 3, 3)
    scene.add(ball)

    // 添加六个方向的贴图
    const decalPositions: { position: [number, number, number], rotation: [number, number, number] }[] = [
      {
        position: [0, 0, 1],
        rotation: [0, 0, 0],
      }, // Front
      {
        position: [0, 0, -1],
        rotation: [0, Math.PI, 0],
      }, // Back
      {
        position: [1, 0, 0],
        rotation: [0, Math.PI / 2, 0],
      }, // Right
      {
        position: [-1, 0, 0],
        rotation: [0, -Math.PI / 2, 0],
      }, // Left
      {
        position: [0, 1, 0],
        rotation: [-Math.PI / 2, 0, 0],
      }, // Top
      {
        position: [0, -1, 0],
        rotation: [Math.PI / 2, 0, 0],
      }, // Bottom
    ]

    decalPositions.forEach(({ position, rotation }) => {
      const decalMaterial = new THREE.MeshStandardMaterial({
        map: texture,
      })

      const decalGeometry = new THREE.PlaneGeometry(1, 1)

      const decal = new THREE.Mesh(decalGeometry, decalMaterial)

      decal.position.set(...position)
      decal.rotation.set(...rotation)
      scene.add(decal)
    })

    // 设置交互事件
    ball.addEventListener('dblclick', (event: MouseEvent) => {
      event.stopPropagation()
      if (props.url) {
        window.open(props.url, '_blank', 'noopener,noreferrer')
      }
    })

    renderer.domElement.addEventListener('pointerover', () => {
      document.body.style.cursor = 'pointer'
    })
    renderer.domElement.addEventListener('pointerout', () => {
      document.body.style.cursor = 'default'
    })

    // 渲染动画
    const animate = () => {
      requestAnimationFrame(animate)
      ball.rotation.x += 0.01
      ball.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()
  })
}

// 在组件挂载时初始化场景
onMounted(createBallScene)
</script>

<template>
  <div
    ref="canvasContainer"
    class="h-full w-full"
  />
</template>

<style lang="less" scoped>

</style>
