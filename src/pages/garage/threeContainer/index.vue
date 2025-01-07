<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type * as THREE from 'three'

import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type { ThreeContainerType } from './types'

import { useGarageStore } from '@/store'

import * as three from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

import { addLights } from './addLights'

import { addModels } from './addModels'

import { addTextures } from './addTextures'

// import { animate } from './animate'

import { watchColorChange } from './watchColorChange'

import { watchMouseTouch } from './watchMouseTouch'

const garageStore = useGarageStore()

/**
 *  3D容器
 */
const threeContainerRef = ref<HTMLCanvasElement>()

let carGltf: GLTF & THREE.Object3D

/**
 *  Bloom效果
 */
const bloomRef = ref<BloomPass>()

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
 *  效果组合器
 */
let composer: EffectComposer

let fbo: THREE.WebGLCubeRenderTarget

let cubeCamera: THREE.CubeCamera

/**
 *  主模型
 */
const modelRef = ref({
  /**
   *  轮子材质
   */
  wheel: [] as THREE.Mesh[],

  /**
   *  车身材质
   */
  bodyMat: null as THREE.MeshStandardMaterial | null,

  /**
   *  地板材质
   */
  floor: null as THREE.Mesh | null,

  /**
   *  灯光材质
   */
  lightMat: null as THREE.MeshStandardMaterial | null,
})

/**
 * 场景渲染参数
 * 包含模型、地板、光照等渲染相关的参数，用于控制场景中的各种视觉效果。
 */
const sceneRenderParams = ref<ThreeContainerType.SceneRenderParamsType>({
  speedFactor: 0,
  initColor: new three.Color('#fff'),
  speedupColor: new three.Color('#000'),
  floorColor: new three.Color('#fff'),
  floorNormalSpeed: 0,
  bloomIntensity: 1,
  bloomThreshold: 0.9,
  lightOpacity: 1,
  floorEnvIntensity: 0,
  wheelRoughness: 1,
  wheelEnvIntensity: 5,
})

/**
 *  贴图
 */
const maps = ref<ThreeContainerType.MapsType>({
  carAo: null,
  startRoomLight: null,
  startRoomAo: null,
  floorRoughness: null,
  floorNormal: null,
})

/**
 * 地板的着色器统一变量集合
 * 用于传递动态数据和控制地板的材质效果。
 */
const uniforms = ref<ThreeContainerType.UniformsType> ({
  uTime: new three.Uniform(0),
  uSpeedFactor: new three.Uniform(0),
})

/**
 * 地板的着色器统一变量集合
 * 用于传递地板材质中需要的动态数据和配置参数。
 */
const floorUniforms = ref<ThreeContainerType.FloorUniformsType>({
  uColor: new three.Uniform(new three.Color('white')),
  uReflectMatrix: new three.Uniform(new three.Matrix4()),
  uReflectTexture: new three.Uniform(new three.Texture()),
  uReflectIntensity: new three.Uniform(15),
  uIntensity: new three.Uniform(1),
  uLevel: new three.Uniform(0),
  uResolution: new three.Uniform(new three.Vector2()),
  uTime: new three.Uniform(0),
})

/**
 *  添加轨道
 */
function addOrbitControls() {
  // 创建轨道控制器
  // controls = new OrbitControls(camera, renderer.domElement)

  garageStore.interact.controlDom = document.getElementById('controlRef')
  console.log('%c Line:322 🍋 garageStore.interact.controlDom', 'color:#93c0a4', garageStore.interact.controlDom)

  controls = new OrbitControls(camera, garageStore.interact.controlDom)

  // 设置控制器目标
  controls.target.set(0, 1.5, 0)

  // 启用阻尼
  controls.enableDamping = true

  // 禁用缩放
  // controls.enableZoom = false

  // 更新控制器
  controls.update()

  composer = new EffectComposer(renderer)

  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new BloomPass(1.25)

  composer.addPass(bloomPass)

  bloomRef.value = bloomPass

  // if (threeContainerRef.value) {
  //   threeContainerRef.value.appendChild(renderer.domElement)
  // }
}

async function initThree(canvas: HTMLCanvasElement) {
  scene = new three.Scene()

  camera = new three.PerspectiveCamera(

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

  renderer = new three.WebGLRenderer({
    canvas,
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.toneMapping = three.CineonToneMapping

  addLights(scene)

  addTextures(maps)

  addModels(scene, modelRef, maps, uniforms, floorUniforms, carGltf)

  addOrbitControls()

  function animate() {
    requestAnimationFrame(animate)

    // 更新时间统一变量
    uniforms.value.uTime.value += 0.05

    // 更新地板时间统一变量
    floorUniforms.value.uTime.value += 0.05
    renderer.render(scene, camera)
  }

  animate()
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
  if (!threeContainerRef.value) {
    return
  }

  initThree(threeContainerRef.value)

  // 监听窗口大小调整事件
  window.addEventListener('resize', onWindowResize)

  // 设置 资源加载完成
  garageStore.ui.loading.ready = true

  //
  // 创建 CubeCamera 用于环境映射
  const cubeRenderTarget = new three.WebGLCubeRenderTarget(512, {
    type: three.UnsignedByteType,
    generateMipmaps: false,
    minFilter: three.NearestFilter,
    magFilter: three.NearestFilter,
  })

  cubeCamera = new three.CubeCamera(1, 1000, cubeRenderTarget)
  fbo = cubeRenderTarget

  scene.environment = fbo.texture

  const clock = new three.Clock()

  // 动画循环
  const animate = () => {
    const delta = clock.getDelta() // 获取帧间隔时间

    uniforms.value.uTime.value += delta
    floorUniforms.value.uTime.value += delta * sceneRenderParams.value.floorNormalSpeed * 20

    // 暂时隐藏 cargltf 场景
    // if (carGltf.scene) {
    //   carGltf.scene.visible = false
    // }

    // // 更新 CubeCamera
    // if (cubeCamera && scene) {
    //   cubeCamera.update(renderer, scene) // 假设有 renderer
    // }

    // // 恢复 carGltf 场景
    // if (carGltf.scene) {
    //   carGltf.scene.visible = true
    // }

    // // 更新模型轮子的旋转
    modelRef.value.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * sceneRenderParams.value.speedFactor)
    })

    requestAnimationFrame(animate) // 请求下一帧
  }

  animate()

  //  帧循环函数
  // animate(modelRef, sceneRenderParams, uniforms, floorUniforms)

  watchColorChange(modelRef)

  watchMouseTouch(modelRef, sceneRenderParams, uniforms, floorUniforms)
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

</template>

<style lang="less" scoped>

</style>
