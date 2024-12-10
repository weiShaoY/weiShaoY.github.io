<script setup>
import { isMobile } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// 定义引用
const canvasContainer = ref(null)

let renderer, scene, camera, controls

/**
 * 加载 3D 模型
 */
function loadModel() {
  const loader = new GLTFLoader()

  loader.load(
    '/models/desktop/index.gltf',
    (gltf) => {
      const model = gltf.scene

      // 根据设备调整模型属性
      model.position.set(isMobile ? -2.5 : 0, isMobile ? -3 : -5, -1.5)
      model.rotation.set(-0.01, -0.2, -0.1)
      model.scale.set(isMobile ? 0.4 : 1, isMobile ? 0.4 : 1, isMobile ? 0.4 : 1)

      scene.add(model)
    },
    undefined,
    (error) => {
      console.error('模型加载失败:', error)
    },
  )
}

/**
 * 初始化 Three.js 场景
 */
function initThree() {
  // 创建场景
  scene = new THREE.Scene()

  scene.background = null // 设置场景背景透明

  // 创建相机
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(20, 3, 5)

  // 创建渲染器，开启 alpha 通道支持透明背景
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio || 1)
  renderer.shadowMap.enabled = true

  // 挂载到 DOM
  canvasContainer.value.appendChild(renderer.domElement)

  // 添加光源
  const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 3)

  scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xFFFFFF, 1)

  scene.add(pointLight)

  const spotLight = new THREE.SpotLight(0xFFFFFF, 1)

  spotLight.position.set(-20, 50, 10)
  spotLight.angle = 0.12
  spotLight.penumbra = 1
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  scene.add(spotLight)

  // 初始化 OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.maxPolarAngle = Math.PI / 2
  controls.minPolarAngle = Math.PI / 2

  // 加载模型
  loadModel()

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
}

// 生命周期钩子
onMounted(() => {
  // 初始化场景
  initThree()
})

</script>

<template>
  <div
    ref="canvasContainer"
    class="h-full w-full overflow-hidden"
  />
</template>
