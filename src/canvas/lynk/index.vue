<script setup lang="ts">

import { disposeScene, loadGLTFModel } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const lynkRef = ref<HTMLCanvasElement | null>(null)

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
const models: THREE.Group[] = []

/**
 * 添加光源
 */
function addLights() {
  /**
   *  环境光
   */
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)

  scene.add(ambientLight)
  const lights: {
    position: [number, number, number]
    intensity: number
  }[] = [
    {
      position: [0, 0, 10],
      intensity: 0.2,
    },
    {
      position: [0, 0, -10],
      intensity: 0.2,
    },
    {
      position: [10, 0, 0],
      intensity: 0.2,
    },
    {
      position: [-10, 0, 0],
      intensity: 0.2,
    },
    {
      position: [0, 10, 0],
      intensity: 0.2,
    },
    {
      position: [5, 10, 0],
      intensity: 0.2,
    },
    {
      position: [0, 10, 5],
      intensity: 0.2,
    },
    {
      position: [0, 10, -5],
      intensity: 0.2,
    },
    {
      position: [-5, 10, 0],
      intensity: 0.2,
    },
  ]

  /**
   *  平行光
   */

  lights.forEach((item) => {
    const light = new THREE.DirectionalLight(0xFFFFFF, item.intensity)

    light.position.set(...item.position) as any
    scene.add(light)
  })
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)

  // 启用阻尼
  controls.enableDamping = true

  // // 禁用缩放
  controls.enableZoom = false

  // // 限制旋转范围，只允许围绕 y 轴旋转
  // controls.minPolarAngle = Math.PI / 2 // 最小极角
  // controls.maxPolarAngle = Math.PI / 2 // 最大极角

  controls.autoRotate = true

  controls.target = new THREE.Vector3(-0.5, 0.5, 0)
}

/**
 * 加载 3D 模型
 */
async function addModel() {
  // await loadGLTFModel('/models/mail/index.glb', (gltf) => {
  //   model = gltf.scene
  //   model.position.set(0, 0, 0) // 将模型移到场景的中心
  //   const scale = 1

  //   model.scale.set(scale, scale, scale)
  //   scene.add(model)
  // })
  const GLBs = [
    {
      name: 'EXT',
      path: '/models/lynk/model/Lynkco09_EXT_d.glb',
    },
    {
      name: 'INT',
      path: '/models/lynk/model/Lynkco09_INT_d.glb',
    },
    {
      name: 'Sunproof',
      path: '/models/lynk/model/Lynkco09_Sunproof_d.glb',
    },
    {
      name: 'Trunk',
      path: '/models/lynk/model/Lynkco09_Trunk_d.glb',
    },
    {
      name: 'Tires',
      path: '/models/lynk/model/Lynkco09_Tires_d.glb',
    },
    {
      name: 'LBDoor',
      path: '/models/lynk/model/Lynkco09_LBDoor_d.glb',
    },
    {
      name: 'LFDoor',
      path: '/models/lynk/model/Lynkco09_LFDoor_d.glb',
    },
    {
      name: 'RFDoor',
      path: '/models/lynk/model/Lynkco09_RFDoor_d.glb',
    },
    {
      name: 'RBDoor',
      path: '/models/lynk/model/Lynkco09_RBDoor_d.glb',
    },
  ]

  Promise.all(
    GLBs.map(item => loadGLTFModel(item.path, (gltf) => {
      const model = gltf.scene

      scene.add(model)

      models.push(model)
    })),
  )
}

// 定义缓动函数
function easeOutCirc(x) {
  return Math.sqrt(1 - (x - 1) ** 4)
}

let frame = 0

/**
 * 动画更新函数
 */
function animate() {
  requestAnimationFrame(animate)

  // if (model) {
  //   model.rotation.y -= 0.01
  // }
  frame = frame <= 100 ? frame + 1 : frame

  if (frame <= 100) {
    const p = new THREE.Vector3(
      5 * Math.sin(0.2 * Math.PI),
      2.5,
      5 * Math.cos(0.2 * Math.PI),
    )

    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

    camera.position.y = 2.5
    camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
    camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
    camera.lookAt(new THREE.Vector3(-0.5, 0.5, 0))
  }
  else {
    controls.update()
  }

  renderer.render(scene, camera)
  controls.update()
}

onMounted(async () => {
  if (!lynkRef.value) {
    return
  }

  scene = new THREE.Scene()

  // camera = new THREE.PerspectiveCamera(
  //   75,
  //   lynkRef.value.offsetWidth / lynkRef.value.offsetHeight,
  //   0.1,
  //   1000,
  // )
  // camera.position.set(0, 0, 5)

  const initialCameraPosition = new THREE.Vector3(
    5 * Math.sin(0.2 * Math.PI),
    2.5,
    5 * Math.cos(0.2 * Math.PI),
  )

  camera = new THREE.PerspectiveCamera(75, lynkRef.value.offsetWidth / lynkRef.value.offsetHeight, 0.1, 1000)
  camera.position.copy(initialCameraPosition)

  camera.lookAt(new THREE.Vector3(-0.5, 0.5, 0))

  renderer = new THREE.WebGLRenderer({
    canvas: lynkRef.value,
    antialias: true,
    alpha: true,
  })

  renderer.setSize(lynkRef.value.offsetWidth, lynkRef.value.offsetHeight)

  renderer.outputColorSpace = THREE.LinearSRGBColorSpace

  // 添加光源
  addLights()

  // 添加轨道
  addOrbitControls()

  await addModel().finally(() => {
    isLoading.value = false
  })

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
    ref="lynkRef"
    v-canvas-loading="{
      isLoading,
      size: 80,
    }"
    class="cursor-pointer overflow-hidden !h-full !w-full"
  />
</template>
