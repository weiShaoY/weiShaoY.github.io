<script lang="ts" setup>
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
      map: texture,
      flatShading: true,
    })

    const ball = new THREE.Mesh(geometry, material)

    ball.castShadow = true
    ball.receiveShadow = true
    ball.scale.set(3, 3, 3)
    scene.add(ball)

    // 设置交互事件
    renderer.domElement.addEventListener('dblclick', (event: MouseEvent) => {
      event.stopPropagation()
      if (props.url) {
        window.open(props.url, '_blank', 'noopener,noreferrer')
      }
    })

    // 设置 OrbitControls 以启用鼠标控制
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true // 开启惯性效果
    controls.dampingFactor = 0.05 // 调整惯性阻尼
    controls.rotateSpeed = 0.8 // 控制旋转速度

    // 渲染动画
    const animate = () => {
      requestAnimationFrame(animate)
      ball.rotation.x += 0.005
      ball.rotation.y += 0.005
      controls.update() // 更新控制器状态
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
