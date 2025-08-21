<script setup lang="ts">
import * as TWEEN from '@tweenjs/tween.js'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import { disposeScene, loadGLTFModel } from '@/utils'

import { addMaterialAndAction } from './materialAndAction'

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

// 模型
const models: THREE.Group[] = []

/**
 *  射线
 */
const raycaster = new THREE.Raycaster()

/**
 *  当前视角状态
 */
const isInsideCar = ref(false)

/**
 *  缓动动画集合
 */
const tweenCollection: Record<string, any> = {
  LBDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  RBDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  LFDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  RFDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  Trunk: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
}

/**
 *  调整窗口大小
 */
function handleWindowResize() {
  if (lynkRef.value && renderer && camera) {
    const width = lynkRef.value.clientWidth

    const height = lynkRef.value.clientHeight

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
}

/**
 *  处理鼠标点击
 */
function pickupObjects(event: MouseEvent) {
  if (!lynkRef.value) {
    return
  }

  const rect = lynkRef.value.getBoundingClientRect()

  const width = lynkRef.value.clientWidth

  const height = lynkRef.value.clientHeight

  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / width) * 2 - 1,
    -((event.clientY - rect.top) / height) * 2 + 1,
  )

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object as THREE.Mesh

    if (intersectedObject.name.includes('Door') || intersectedObject.name.includes('Trunk')) {
      const doorName = intersectedObject.name.split('_')[0]

      const door = models.find(item => item.name === doorName) as any

      if (door && door.outer && door.status) {
        setupTweenDoor(door, door.status)
      }
    }
    else if (intersectedObject.name.includes('INT')) {
      controls.autoRotate = false
      if (isInsideCar.value) {

        // setupTweenCarOut()
      }
      else {
        const INT = models.find(item => item.name === 'INT')

        setupTweenCarIn(INT)
        isInsideCar.value = true
      }
    }
    else if (isInsideCar.value) {
      setupTweenCarOut()
      isInsideCar.value = false
    }
  }
  else if (isInsideCar.value) {
    setupTweenCarOut()
    isInsideCar.value = false
  }
}

/**
 *  设置门的缓动动画
 */
function setupTweenDoor(door: any, status: string) {
  const { from, to } = door.rotateDirection[status]

  door.status = status === 'open' ? 'close' : 'open'

  const lastLocation = tweenCollection[door.name]?.from?.value || from.value

  if (tweenCollection[door.name].tween) {
    tweenCollection[door.name].tween.stop()
  }

  tweenCollection[door.name].tween = new TWEEN.Tween({
    value: lastLocation,
  })
    .to(to, 1000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(({ value }) => {
      door.outer.rotation[door.rotateDirection.rotateAxis] = THREE.MathUtils.degToRad(value)
      tweenCollection[door.name].from.value = value
    })
    .onComplete(() => {
      tweenCollection[door.name] = {
        tween: null,
        from: {
          value: null,
        },
        to: {
          value: null,
        },
      }
    })
    .start()
}

/**
 *  设置进入车内的缓动动画
 */
function setupTweenCarIn(model: any) {
  const { x: cx, y: cy, z: cz } = camera.position

  const { x: tocX, y: tocY, z: tocZ } = model.carInCameraPosition

  new TWEEN.Tween({
    cx,
    cy,
    cz,
    ox: 0,
    oy: 0,
    oz: 0,
  })
    .to({
      cx: tocX,
      cy: tocY,
      cz: tocZ,
      ox: 0,
      oy: tocY,
      oz: 0.1,
    }, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(({ cx, cy, cz, ox, oy, oz }) => {
      camera.position.set(cx, cy, cz)
      controls.target.set(ox, oy, oz)
    })
    .start()
}

/**
 *  设置退出车内的缓动动画
 */
function setupTweenCarOut() {
  const initialCameraPosition = new THREE.Vector3(
    5 * Math.sin(0.2 * Math.PI),
    2.5,
    5 * Math.cos(0.2 * Math.PI),
  )

  new TWEEN.Tween({
    cx: camera.position.x,
    cy: camera.position.y,
    cz: camera.position.z,
    ox: controls.target.x,
    oy: controls.target.y,
    oz: controls.target.z,
  })
    .to({
      cx: initialCameraPosition.x,
      cy: initialCameraPosition.y,
      cz: initialCameraPosition.z,
      ox: -0.5,
      oy: 0.5,
      oz: 0,
    }, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(({ cx, cy, cz, ox, oy, oz }) => {
      camera.position.set(cx, cy, cz)
      controls.target.set(ox, oy, oz)
    })
    .start()
}

/**
 * 添加光源
 */
function addLights() {
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 5)

  scene.add(ambientLight)

  const lightPositions = [
    {
      x: 0,
      y: 0,
      z: 10,
    },
    {
      x: 0,
      y: 0,
      z: -10,
    },
    {
      x: 10,
      y: 0,
      z: 0,
    },
    {
      x: -10,
      y: 0,
      z: 0,
    },
    {
      x: 0,
      y: 10,
      z: 0,
    },
    {
      x: 5,
      y: 10,
      z: 0,
    },
    {
      x: 0,
      y: 10,
      z: 5,
    },
    {
      x: 0,
      y: 10,
      z: -5,
    },
    {
      x: -5,
      y: 10,
      z: 0,
    },
  ]

  lightPositions.forEach(({ x, y, z }) => {
    const light = new THREE.DirectionalLight(0xFFFFFF, 0.2)

    light.position.set(x, y, z)
    scene.add(light)
  })
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)

  controls.enableDamping = true

  controls.enableZoom = false

  // controls.autoRotate = true
  controls.target = new THREE.Vector3(-0.5, 0.5, 0)
}

/**
 * 加载 3D 模型
 */
async function addModel() {
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

  await Promise.all(
    GLBs.map(item =>
      loadGLTFModel(item.path, (gltf) => {
        const { outer, obj } = addMaterialAndAction(gltf, item.name, renderer, {
          receiveShadow: true,
          castShadow: true,
        })

        outer ? scene.add(outer) : scene.add(obj)
        models.push(obj)
      }),
    ),
  )
}

/**
 *  定义缓动函数
 */
function easeOutCirc(x: number) {
  return Math.sqrt(1 - (x - 1) ** 4)
}

let frame = 0

// 动画更新函数
function animate() {
  requestAnimationFrame(animate)

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

  TWEEN.update()
  renderer.render(scene, camera)
}

onMounted(async () => {
  if (!lynkRef.value) {
    return
  }

  scene = new THREE.Scene()

  const initialCameraPosition = new THREE.Vector3(
    5 * Math.sin(0.2 * Math.PI),
    2.5,
    5 * Math.cos(0.2 * Math.PI),
  )

  camera = new THREE.PerspectiveCamera(
    75,
    lynkRef.value.offsetWidth / lynkRef.value.offsetHeight,
    0.1,
    1000,
  )
  camera.position.copy(initialCameraPosition)
  camera.lookAt(new THREE.Vector3(-0.5, 0.5, 0))

  renderer = new THREE.WebGLRenderer({
    canvas: lynkRef.value,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(lynkRef.value.offsetWidth, lynkRef.value.offsetHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  addLights()
  addOrbitControls()
  await addModel().finally(() => {
    isLoading.value = false
  })

  window.addEventListener('resize', handleWindowResize)
  lynkRef.value.addEventListener('click', pickupObjects)

  animate()
})

onUnmounted(() => {
  if (renderer) {
    renderer.dispose()
  }

  if (controls) {
    controls.dispose()
  }

  window.removeEventListener('resize', handleWindowResize)
  if (lynkRef.value) {
    lynkRef.value.removeEventListener('click', pickupObjects)
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
