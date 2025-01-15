<script lang="ts" setup>

import { loadGLTFModel } from '@/utils'

import gsap from 'gsap'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const props = defineProps({
  /**
   *  视频地址
   */
  video: {
    type: String,
    required: true,
  },
})

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const computerRef = ref<HTMLCanvasElement | null>(null)

/**
 *  标记第一次加载
 */
const isFirstLoad = ref(true)

/**
 *  视频
 */
let video: HTMLVideoElement | null = null

/**
 *  视频纹理
 */
let videoTexture: THREE.VideoTexture | null = null

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
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)

  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2)

  directionalLight.position.set(10, 10, 5)

  scene.add(directionalLight)
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.maxPolarAngle = Math.PI / 2
  controls.enableZoom = false
}

/**
 * 加载 3D 模型并应用视频纹理
 */
async function addModel(videoTexture: THREE.VideoTexture) {
  await loadGLTFModel('/models/computer/index.glb', (gltf) => {
    model = gltf.scene

    // 设置模型的缩放、位置和旋转
    model.scale.set(2, 2, 2)
    model.position.set(-0.5, -3, 0)
    model.rotation.set(0, -0.1, 0)

    // 假设你有一个名为 'monitor-screen' 的 mesh
    const monitorScreen = model.getObjectByName('monitor-screen') as THREE.Mesh

    if (monitorScreen) {
      // 创建并应用视频纹理材质
      const videoMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
        toneMapped: false,
      })

      monitorScreen.material = videoMaterial
      monitorScreen.position.set(0.127, 1.831, 0.511)
      monitorScreen.rotation.set(1.571, -0.005, 0.031)
      monitorScreen.scale.set(0.661, 0.608, 0.401)
    }

    // 将模型添加到场景
    scene.add(model)

    // 为模型添加旋转动画，仅在第一次加载时执行
    if (isFirstLoad.value) {
      gsap.from(model.rotation, {
        y: Math.PI / 2,
        duration: 1,
        ease: 'power3.out',
      })

      // 标记第一次加载已完成
      isFirstLoad.value = false
    }
  })
}

// 监听视频属性变化
watch(() => props.video, (newVideoSrc) => {
  if (video) {
    video.src = newVideoSrc
    video.load()
    video.play()
  }
})

onMounted(async () => {
  if (!computerRef.value) {
    return
  }

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75,
    computerRef.value.offsetWidth / computerRef.value.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 1.6, 5)

  renderer = new THREE.WebGLRenderer({
    canvas: computerRef.value,
    antialias: true,
  })
  renderer.setSize(computerRef.value.offsetWidth, computerRef.value.offsetHeight)

  addLights()

  addOrbitControls()

  video = document.createElement('video')
  video.src = props.video
  video.loop = true
  video.muted = true
  video.autoplay = true
  video.playsInline = true

  video.addEventListener('loadeddata', async () => {
    if (video) {
      videoTexture = new THREE.VideoTexture(video)
      videoTexture.flipY = false
      video.play()
      await addModel(videoTexture).finally(() => {
        isLoading.value = false
      })
    }
    else {
      console.error('视频元素不存在')
    }

    function animate() {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()
  })

  video.addEventListener('error', (e) => {
    console.error('视频加载错误', e)
  })
})

onUnmounted(() => {
  renderer.dispose()
  controls.dispose()
})

</script>

<template>
  <canvas
    ref="computerRef"
    v-canvas-loading="{
      isLoading,
      size: 80,
    }"
    class="cursor-pointer !block !h-full !w-full"
  />
</template>
