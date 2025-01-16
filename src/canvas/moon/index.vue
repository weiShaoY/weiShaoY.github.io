<script setup lang="ts">

import { disposeScene, loadGLTFModel } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const moonRef = ref<HTMLCanvasElement | null>(null)

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
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)

  scene.add(ambientLight)

  /**
   *  平行光
   */
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2)

  directionalLight.position.set(5, 5, 5)

  scene.add(directionalLight)
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)

  // 启用阻尼
  controls.enableDamping = true

  // 禁用缩放
  controls.enableZoom = false
}

/**
 * 加载 3D 模型
 */
async function addModel(scene: THREE.Scene) {
  await loadGLTFModel('/models/moon/index.glb', (gltf) => {
    model = gltf.scene

    model.position.set(0, 0, 0) // 将模型移到场景的中心

    model.scale.set(15, 15, 15)

    scene.add(model)
  })
}

onMounted(async () => {
  if (!moonRef.value) {
    return
  }

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(

    // 视角
    75,

    // 宽高比
    moonRef.value.offsetWidth / moonRef.value.offsetHeight,

    // 近裁剪面
    0.1,

    // 远裁剪面
    1000,
  )
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({
    canvas: moonRef.value,
    antialias: true,
    alpha: true,
  })

  renderer.setSize(moonRef.value.offsetWidth, moonRef.value.offsetHeight)

  addLights()

  addOrbitControls()

  await addModel(scene).finally(() => {
    isLoading.value = false
  })

  // 渲染循环
  function animate() {
    requestAnimationFrame(animate)

    // 如果模型已经加载完成，绕 Y 轴旋转
    if (model) {
      // 调整旋转速度
      model.rotation.y += 0.002
    }

    controls.update()

    renderer.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  renderer.dispose()
  controls.dispose()

  disposeScene(scene)
})

</script>

<template>
  <canvas
    ref="moonRef"
    v-canvas-loading="{
      isLoading,
      size: 80,
    }"
    class="cursor-pointer overflow-hidden !h-full !w-full"
  />
</template>
