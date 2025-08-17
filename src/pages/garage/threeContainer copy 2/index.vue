<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type * as THREE from 'three'

import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type { ThreeContainerType } from './types'

import * as three from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { useGarageStore } from '@/stores'

import { addLights } from './addLights'

import { addModels } from './addModels'

import { addOrbitControls } from './addOrbitControls'

import { addTextures } from './addTextures'

import { animate } from './animate'

import { useReflect } from './utils/useReflect'

import { watchColorChange } from './watchColorChange'

import { watchMouseTouch } from './watchMouseTouch'

const garageStore = useGarageStore()

/**
 *  3D容器
 */
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

/**
 *  效果组合器
 */
let composer: EffectComposer

/**
 *  转换后的纹理
 */
let fbo: THREE.WebGLCubeRenderTarget

/**
 *   用于环境映射
 */
let cubeCamera: THREE.CubeCamera

const carGltf: GLTF | null = null

const startRommGltf: GLTF | null = null

const matrix: THREE.Matrix4 | null = null

const renderTarget: THREE.WebGLRenderTarget<THREE.Texture> | null = null

/**
 *  主模型
 */
const modelRef = {
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
}

/**
 * 场景渲染参数
 * 包含模型、地板、光照等渲染相关的参数，用于控制场景中的各种视觉效果。
 */
const sceneRenderParams: ThreeContainerType.SceneRenderParamsType = ({
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
const uniforms: ThreeContainerType.UniformsType = {
  uTime: new three.Uniform(0),
  uSpeedFactor: new three.Uniform(0),
}

/**
 * 地板的着色器统一变量集合
 * 用于传递地板材质中需要的动态数据和配置参数。
 */
const floorUniforms: ThreeContainerType.FloorUniformsType = {
  uColor: new three.Uniform(new three.Color('white')),
  uReflectMatrix: new three.Uniform(new three.Matrix4()),
  uReflectTexture: new three.Uniform(new three.Texture()),
  uReflectIntensity: new three.Uniform(15),
  uIntensity: new three.Uniform(1),
  uLevel: new three.Uniform(0),
  uResolution: new three.Uniform(new three.Vector2()),
  uTime: new three.Uniform(0),
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
    canvas: threeContainerRef.value,
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.toneMapping = three.CineonToneMapping

  composer = new EffectComposer(renderer)

  addLights(scene)

  addTextures(maps)

  addOrbitControls(scene, camera, renderer, composer)

  addModels(scene, modelRef, maps, uniforms, floorUniforms, carGltf, startRommGltf, matrix, renderTarget)

  // 创建 CubeCamera 用于环境映射
  const cubeRenderTarget = new three.WebGLCubeRenderTarget(512, {
    type: three.UnsignedByteType,
    generateMipmaps: false,
    minFilter: three.NearestFilter,
    magFilter: three.NearestFilter,
  })

  cubeCamera = new three.CubeCamera(1, 1000, cubeRenderTarget)

  fbo = cubeRenderTarget

  //  设置环境贴图
  scene.environment = fbo.texture

  // ///////////////////////////////////////

  // const { matrix, renderTarget } = useReflect(modelRef.floor!, {
  //   resolution: [innerWidth, innerHeight],
  //   ignoreObjects: [modelRef.floor!, carGltf.scene, startRommgltf.scene],
  // })

  // ///////////////////////////////////////

  animate(modelRef, sceneRenderParams, uniforms, floorUniforms, renderer, scene, camera, cubeCamera)

  watchColorChange(modelRef)

  watchMouseTouch(modelRef, sceneRenderParams, uniforms, floorUniforms)

  // 监听窗口大小调整事件
  window.addEventListener('resize', onWindowResize)

  // 设置 资源加载完成
  garageStore.ui.loading.ready = true
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
    @pointerdown="() => garageStore.interact.touch = true"
    @pointerup="() => garageStore.interact.touch = false"
  />

</template>

<style lang="less" scoped>

</style>
