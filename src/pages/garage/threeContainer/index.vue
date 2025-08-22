<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type * as THREE from 'three'

import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type { ThreeContainerType } from './types'

import * as Three from 'three'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

import { useGarageStore } from '@/stores'

import floorFrag from './shaders/sketch/floorfrag.glsl'

import floorVertex from './shaders/sketch/floorver.glsl'

import fragmentShader from './shaders/sketch/fragment.glsl'

import vertexShader from './shaders/sketch/vertex.glsl'

import {
  flatModel,
  useModifyCSM,
} from './utils'

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

/**
 *  汽车模型
 */
let carGltf: GLTF | null = null

/**
 *  加速模型
 */
// let _speedupGltf: GLTF | null = null

/**
 *  起始房间模型
 */
let startRommGltf: GLTF | null = null

// const matrix: THREE.Matrix4 | null = null

// const renderTarget: THREE.WebGLRenderTarget<THREE.Texture> | null = null

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
  initColor: new Three.Color('#fff'),
  speedupColor: new Three.Color('#000'),
  floorColor: new Three.Color('#fff'),
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
const maps: ThreeContainerType.MapsType = {
  carAo: null,
  startRoomLight: null,
  startRoomAo: null,
  floorRoughness: null,
  floorNormal: null,
}

/**
 * 地板的着色器统一变量集合
 * 用于传递动态数据和控制地板的材质效果。
 */
const uniforms: ThreeContainerType.UniformsType = {
  uTime: new Three.Uniform(0),
  uSpeedFactor: new Three.Uniform(0),
}

/**
 * 地板的着色器统一变量集合
 * 用于传递地板材质中需要的动态数据和配置参数。
 */
const floorUniforms: ThreeContainerType.FloorUniformsType = {
  uColor: new Three.Uniform(new Three.Color('white')),
  uReflectMatrix: new Three.Uniform(new Three.Matrix4()),
  uReflectTexture: new Three.Uniform(new Three.Texture()),
  uReflectIntensity: new Three.Uniform(15),
  uIntensity: new Three.Uniform(1),
  uLevel: new Three.Uniform(0),
  uResolution: new Three.Uniform(new Three.Vector2()),
  uTime: new Three.Uniform(0),
}

/**
 * 处理窗口大小调整
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

/**
 * 添加光源
 */
function addLights() {
  /**
   * 环境光
   * 环境光是均匀地照亮整个场景的光源，没有明确的方向。
   */
  const ambientLight = new Three.AmbientLight(0x404040, 0.5)

  /**
   * 平行光
   * 平行光是一种来自无限远处的光源，类似于太阳光。
   */
  const directionalLight = new Three.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 10, 0)

  /**
   * 点光源
   * 点光源是一种从一个点向外发散的光源，类似于灯泡。
   */
  const pointLight = new Three.PointLight(0xFFFFFF, 1, 100)

  pointLight.position.set(5, 5, 5)

  scene.add(ambientLight, directionalLight, pointLight)
}

/**
 * 添加贴图
 */
async function addTextures(): Promise<void> {
  const textureLoader = new Three.TextureLoader()

  /**
   * 加载单个纹理的辅助函数
   * @param {string} url - 纹理的路径
   * @param {(texture: THREE.Texture) => void} onLoad - 纹理加载成功时的回调
   * @returns {Promise<THREE.Texture>} 返回加载完成的纹理
   */
  function loadTexture(
    url: string,
    onLoad: (texture: Three.Texture) => void,
  ): Promise<Three.Texture> {
    return new Promise((resolve, reject) => {
      textureLoader.load(
        url,
        (texture) => {
          onLoad(texture)
          resolve(texture)
        },
        undefined,
        error => reject(error),
      )
    })
  }

  // 使用 Promise.all 并行加载所有纹理
  const [
    carAo,
    startRoomLight,
    startRoomAo,
    floorRoughness,
    floorNormal,
  ] = await Promise.all([
    loadTexture('/models/garage/textures/t_car_body_AO.raw.jpg', (texture) => {
      texture.flipY = false
      texture.colorSpace = Three.LinearSRGBColorSpace
      texture.minFilter = Three.LinearFilter
      texture.magFilter = Three.LinearFilter
      texture.channel = 1
    }),

    loadTexture('/models/garage/textures/t_startroom_light.raw.jpg', (texture) => {
      texture.channel = 1
      texture.flipY = false
      texture.colorSpace = Three.LinearSRGBColorSpace
    }),

    loadTexture('/models/garage/textures/t_startroom_ao.raw.jpg', (texture) => {
      texture.flipY = false
      texture.channel = 1
      texture.colorSpace = Three.LinearSRGBColorSpace
    }),

    loadTexture('/models/garage/textures/t_floor_roughness.webp', (texture) => {
      texture.colorSpace = Three.LinearSRGBColorSpace
      texture.wrapS = texture.wrapT = Three.RepeatWrapping
    }),

    loadTexture('/models/garage/textures/t_floor_normal.webp', (texture) => {
      texture.colorSpace = Three.LinearSRGBColorSpace
      texture.wrapS = texture.wrapT = Three.RepeatWrapping
    }),
  ])

  // 将加载好的纹理赋值给 maps 对象
  maps.carAo = carAo
  maps.startRoomLight = startRoomLight
  maps.startRoomAo = startRoomAo
  maps.floorRoughness = floorRoughness
  maps.floorNormal = floorNormal
}

/**
 * 添加控制器
 */
function addOrbitControls() {
  const controls = new OrbitControls(camera, renderer.domElement)

  // 启用阻尼
  controls.enableDamping = true

  // 禁用缩放
  controls.enableZoom = false

  // 更新控制器
  controls.update()

  // 限制旋转范围 90度
  controls.maxPolarAngle = Math.PI / 2

  // 限制旋转范围 85度
  controls.maxPolarAngle = 85 * Math.PI / 180
}

async function addModels(): Promise<void> {
  /**
   * GLTF加载器并设置解码器
   */
  const gltfLoader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)

  const loadModel = async (url: string, onLoad: (gltf: GLTF) => void): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      gltfLoader.load(url, (gltf) => {
        onLoad(gltf)
        resolve()
      }, undefined, error => reject(error))
    })
  }

  const loadCarModel = () => loadModel('/models/garage/models/sm_car.gltf', (gltf) => {
    gltf.scene.rotation.y = Math.PI
    carGltf = gltf

    const modelParts = flatModel(carGltf)

    // 车身部分
    const body = modelParts.find(part => part.name === 'body') as THREE.Mesh

    const bodyMat = body.material as THREE.MeshStandardMaterial

    bodyMat.envMapIntensity = 5
    bodyMat.color = new Three.Color('#26d6e9')

    modelParts.forEach((item: THREE.Mesh) => {
      if (item.isMesh) {
        const mat = item.material as THREE.MeshStandardMaterial

        mat.aoMap = maps.carAo
      }
    })

    // 获取汽车轮子
    const wheel = modelParts[35] as THREE.Mesh

    wheel.children.forEach((child) => {
      const mesh = child as THREE.Mesh

      const mat = mesh.material as THREE.MeshStandardMaterial

      mat.envMapIntensity = 5
      modelRef.wheel.push(mesh)
    })

    modelRef.bodyMat = bodyMat
    scene.add(gltf.scene)
  })

  const loadSpeedupModel = () => loadModel('/models/garage/models/sm_speedup.gltf', (gltf) => {
    // _speedupGltf = gltf

    const mat = new CustomShaderMaterial({
      baseMaterial: Three.MeshPhysicalMaterial,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    })

    useModifyCSM(gltf, mat)
    scene.add(gltf.scene)
  })

  const loadStartRoomModel = () => loadModel('/models/garage/models/sm_startroom.raw.gltf', (gltf) => {
    startRommGltf = gltf
    const modelParts = flatModel(startRommGltf)

    const light = modelParts[1] as THREE.Mesh

    const lightMat = light.material as THREE.MeshPhysicalMaterial

    lightMat.emissive = new Three.Color('white')
    lightMat.toneMapped = false
    lightMat.transparent = true
    light.material = new Three.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: Three.DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    })

    const floor = modelParts[2]

    const floorMat = floor.material as THREE.MeshPhysicalMaterial

    floorMat.roughnessMap = maps.floorRoughness
    floorMat.normalMap = maps.floorNormal
    floorMat.aoMap = maps.startRoomAo
    floorMat.lightMap = maps.startRoomLight
    floorMat.envMapIntensity = 0

    const floorCsmMat = new CustomShaderMaterial({
      baseMaterial: floorMat,
      uniforms: floorUniforms,
      vertexShader: floorVertex,
      fragmentShader: floorFrag,
      silent: true,
    })

    floor.material = floorCsmMat

    modelRef.floor = floor
    modelRef.lightMat = light.material as THREE.MeshStandardMaterial
    scene.add(gltf.scene)
  })

  try {
    // 并行加载所有模型
    await Promise.all([loadCarModel(), loadSpeedupModel(), loadStartRoomModel()])
    garageStore.state.isLoaded = true // 设置加载完成状态
  }
  catch (error) {
    window.$notification.error('加载模型时出错:')
    throw error // 抛出错误供调用方处理
  }
}

const clock = new Three.Clock()

function animate() {
  // 请求下一帧
  requestAnimationFrame(animate)

  const delta = clock.getDelta() // 获取帧间隔时间

  // 更新时间统一变量
  uniforms.uTime.value += delta

  // 更新地板时间统一变量
  floorUniforms.uTime.value += delta * sceneRenderParams.floorNormalSpeed * 20

  // 更新 CubeCamera
  cubeCamera.update(renderer, scene)

  // 更新轮子的旋转
  modelRef.wheel.forEach((child) => {
    child.rotateZ(-delta * 30 * sceneRenderParams.speedFactor)
  })

  composer.render()

  // 渲染场景
  renderer.render(scene, camera)
}

onMounted(async () => {
  if (!threeContainerRef.value) {
    return
  }

  scene = new Three.Scene()
  camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(0, 1, 5)

  renderer = new Three.WebGLRenderer({
    canvas: threeContainerRef.value,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = Three.CineonToneMapping

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new BloomPass(1.25))

  addLights()
  addOrbitControls()

  await addTextures()

  await addModels()

  // const { matrix, renderTarget } = useReflect(modelRef.floor!, {
  //   resolution: [innerWidth, innerHeight],
  //   ignoreObjects: [modelRef.floor!, sm_speedupGltf!.scene, startRommGltf!.scene],
  // })

  // floorUniforms.uReflectTexture.value = renderTarget.texture
  // renderTarget.texture.minFilter = Three.LinearFilter
  // renderTarget.texture.magFilter = Three.LinearFilter
  // floorUniforms.uReflectMatrix.value = matrix
  // floorUniforms.uResolution.value.set(renderTarget.width, renderTarget.height)

  const cubeRenderTarget = new Three.WebGLCubeRenderTarget(512, {
    type: Three.UnsignedByteType,
    generateMipmaps: false,
    minFilter: Three.NearestFilter,
    magFilter: Three.NearestFilter,
  })

  cubeCamera = new Three.CubeCamera(1, 1000, cubeRenderTarget)
  fbo = cubeRenderTarget
  scene.environment = fbo.texture

  animate()

  watchColorChange(modelRef)

  watchMouseTouch(modelRef, sceneRenderParams, uniforms, floorUniforms)

  window.addEventListener('resize', onWindowResize)
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
    @pointerdown="garageStore.state.isTouch = true"
    @pointerup="garageStore.state.isTouch = false"
  />
</template>

<style lang="scss" scoped>

</style>
