<script setup lang="ts">

import { loadGLTFModel } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// const imageUrl = 'https://api.lolimi.cn/API/dmtx/api.php' // 替换为实际的纹理 URL

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const desktopRef = ref<(HTMLCanvasElement | null)>()

/**
 *  场景
 */
let scene: THREE.Scene

/**
 *  透视相机
 */
let camera: THREE.PerspectiveCamera

/**
 *  渲染器
 */
let renderer: THREE.WebGLRenderer

/**
 *  轨道控制器
 */
let controls: OrbitControls

/**
 *  模型
 */
let model: THREE.Group

/**
 * 添加光源
 */
function addLights() {
  /**
   *  环境光
   */
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
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)

  // 禁用缩放
  controls.enableZoom = false

  // 禁用平移
  controls.enablePan = false

  // 限制旋转范围
  controls.maxPolarAngle = Math.PI / 2

  // 限制旋转范围
  controls.minPolarAngle = Math.PI / 2

  // 启用阻尼
  controls.enableDamping = true
}

/**
 * 加载 3D 模型
 */
async function addModel() {
  await loadGLTFModel ('/models/test/index.glb', (gltf) => {
    model = gltf.scene

    // 根据设备调整模型属性
    const position: [number, number, number] = isMobile ? [-2.5, -3, -1.5] : [0, -5, -1.5]

    const scale = isMobile ? 0.4 : 1

    model.position.set(...position)

    model.rotation.set(-0.01, -0.2, -0.1)

    model.scale.set(scale, scale, scale)

    // 遍历并替换纹理
    // replaceTexturesInScene(model)

    scene.add(model)
  })
}

/**
 * 处理窗口大小调整
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(async () => {
  if (!desktopRef.value) {
    return
  }

  scene = new THREE.Scene()

  // 设置场景背景透明
  scene.background = null

  camera = new THREE.PerspectiveCamera(

    // 视角

    45,

    // 宽高比
    window.innerWidth / window.innerHeight,

    // 近裁剪面
    0.1,

    // 远裁剪面
    1000,
  )

  // 设置相机的位置
  camera.position.set(20, 3, 5)

  /**
   *  创建渲染器，开启 alpha 通道支持透明背景
   */
  renderer = new THREE.WebGLRenderer({
    canvas: desktopRef.value,
    antialias: true,
    preserveDrawingBuffer: false,
    alpha: true,
  })

  // 设置渲染器的尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)

  //  设置像素比 (如果设备支持高像素比，则设置渲染器的像素比为 devicePixelRatio，使画面更加清晰)
  renderer.setPixelRatio(window.devicePixelRatio || 1)

  // 启用阴影
  renderer.shadowMap.enabled = true

  // 添加光源
  addLights()

  // 添加轨道控制器
  addOrbitControls()

  // 加载模型
  await addModel().finally(() => {
    isLoading.value = false
  })

  // 监听窗口大小调整事件
  window.addEventListener('resize', onWindowResize)

  /**
   * 渲染循环
   */
  function animate() {
    requestAnimationFrame(animate)
    controls?.update()
    renderer.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  renderer.dispose()
  controls.dispose()
  window.removeEventListener('resize', onWindowResize)
})

</script>

<template>
  <canvas
    ref="desktopRef"
    v-loading="{
      isLoading,
      size: 50,
      error: {
        isShow: true,
        text: '模型加载失败',
        timeout: 20000,
      },

    }"
    class="overflow-hidden !h-full !w-full"
  />
</template>
