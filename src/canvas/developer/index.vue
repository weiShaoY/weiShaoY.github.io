<script lang="ts" setup>
import { loadGLTFModel } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { SkeletonUtils } from 'three-stdlib'

import {
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  /**
   * 动画名称
   * @type {string}
   */
  animationName: {
    type: String,
    default: 'idle',
  },
})

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const developerRef = ref<HTMLCanvasElement | null>(null)

const scale = ref<number>(3)

const positionY = ref<number>(-3)

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

let mixer: THREE.AnimationMixer | null = null

let clock: THREE.Clock

const actions: { [key: string]: THREE.AnimationAction } = {
}

/**
 * 添加光源
 */
function addLights() {
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 7)

  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xFFFFFF, 1)

  spotLight.position.set(10, 10, 10)
  spotLight.angle = 0.15
  spotLight.penumbra = 1
  scene.add(spotLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(10, 10, 10)
  scene.add(directionalLight)
}

/**
 *  添加轨道控制器
 */
function addOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = false
}

async function addModel() {
  await loadGLTFModel('/models/developer/index.glb', (gltf) => {
    const model = SkeletonUtils.clone(gltf.scene)

    model.scale.set(scale.value, scale.value, scale.value)
    model.position.y = positionY.value
    scene.add(model)

    mixer = new THREE.AnimationMixer(model)

    const fbxLoader = new FBXLoader()

    const animationsPaths = [
      {
        name: 'idle',
        path: '/models/developer/idle.fbx',
      },
      {
        name: 'salute',
        path: '/models/developer/salute.fbx',
      },
      {
        name: 'clapping',
        path: '/models/developer/clapping.fbx',
      },
      {
        name: 'victory',
        path: '/models/developer/victory.fbx',
      },
    ]

    animationsPaths.forEach(({ name, path }) => {
      fbxLoader.load(path, (fbx) => {
        const action = mixer?.clipAction(fbx.animations[0])

        if (action) {
          actions[name] = action
          if (name === props.animationName) {
            action.play()
          }
        }
      })
    })
  })
}

function onWindowResize() {
  if (developerRef.value) {
    camera.aspect = developerRef.value.offsetWidth / developerRef.value.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(developerRef.value.offsetWidth, developerRef.value.offsetHeight)
  }
}

watch(
  () => props.animationName,
  (newAnimation) => {
    if (actions[newAnimation]) {
      Object.values(actions).forEach(action => action.stop())
      actions[newAnimation].play()
    }
  },
)
onMounted(async () => {
  if (!developerRef.value) {
    return
  }

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    75,
    developerRef.value.offsetWidth / developerRef.value.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 1.6, 5)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(developerRef.value.offsetWidth, developerRef.value.offsetHeight)
  if (developerRef.value) {
    developerRef.value.appendChild(renderer.domElement)
  }

  addLights()

  addOrbitControls()

  await addModel().finally(() => {
    isLoading.value = false
  })

  window.addEventListener('resize', onWindowResize)

  clock = new THREE.Clock()

  function animate() {
    controls.update()
    requestAnimationFrame(animate)
    if (mixer) {
      const delta = clock.getDelta()

      mixer.update(delta)
    }

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
  <div
    ref="developerRef"
    v-canvas-loading="{
      isLoading,
      size: 80,
    }"
    class="relative cursor-pointer !h-full !w-full"
  />
</template>
