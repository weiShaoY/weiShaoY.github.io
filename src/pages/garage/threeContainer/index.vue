<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import * as THREE from 'three'

import Son from './son.vue'

const threeContainerRef = ref<HTMLCanvasElement>()

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

const loading = ref(false)

/**
 * 添加光源
 */
function addLights() {
  /**
   *  环境光
   */
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5)

  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  /**
   *  平行光
   */
  directionalLight.position.set(0, 10, 0)

  scene.add(directionalLight)

  /**
   * 点光源
   */
  const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100)

  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)
}

function initThree(canvas: HTMLCanvasElement) {
  console.log('%c Line:46 🥓 canvas', 'color:#7f2b82', canvas)
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(

    // 视角
    45,

    // 宽高比
    window.innerWidth / window.innerHeight,

    // 近裁剪面
    0.1,

    // 远裁剪面
    500,
  )
  camera.position.set(0, 2, 5)

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.toneMapping = THREE.CineonToneMapping

  addLights()

  // 监听窗口大小调整事件
  window.addEventListener('resize', onWindowResize)
  function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  animate()

  loading.value = true
  console.log('%c Line:87 🍭 loading.value', 'color:#ffdd4d', loading.value)
}

/**
 * 处理窗口大小调整
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (threeContainerRef.value) {
    initThree(threeContainerRef.value)
  }
})

onUnmounted(() => {
  renderer.dispose()
  window.removeEventListener('resize', onWindowResize)
})

</script>

<template>
  <canvas
    ref="threeContainerRef"
    class="h-screen w-full"
  />

  <Son
    v-if="loading"
    :scene="scene"
    :camera="camera"
    :renderer="renderer"
  />
</template>

<style lang="less" scoped>

</style>
