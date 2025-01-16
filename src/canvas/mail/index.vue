<script setup lang="ts">

import { disposeScene, loadGLTFModel } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const mailRef = ref<HTMLCanvasElement | null>(null)

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
  await loadGLTFModel('/models/mail/index.glb', (gltf) => {
    model = gltf.scene
    model.position.set(0, 0, 0) // 将模型移到场景的中心
    const scale = 1

    model.scale.set(scale, scale, scale)
    scene.add(model)
  })
}

onMounted(async () => {
  if (!mailRef.value) {
    return
  }

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    75,
    mailRef.value.offsetWidth / mailRef.value.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({
    canvas: mailRef.value,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(mailRef.value.offsetWidth, mailRef.value.offsetHeight)

  addLights()
  addOrbitControls()

  await addModel(scene).finally(() => {
    isLoading.value = false
  })

  // 渲染循环
  function animate() {
    requestAnimationFrame(animate)
    if (model) {
      model.rotation.y -= 0.01
    }

    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})

onUnmounted(() => {
  if (renderer) {
    renderer.dispose()
  }

  if (controls) {
    controls.dispose()
  }

  disposeScene(scene)
})

</script>

<template>
  <canvas
    ref="mailRef"
    v-canvas-loading="{
      isLoading,
      size: 80,
    }"
    class="cursor-pointer overflow-hidden !h-full !w-full"
  />
</template>
