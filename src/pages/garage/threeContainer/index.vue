<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type * as THREE from 'three'

import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type { ThreeContainerType } from './types'

import { useGarageStore } from '@/store'

import * as Three from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import floorFrag from './shaders/sketch/floorfrag.glsl'

import floorVertex from './shaders/sketch/floorver.glsl'

import fragmentShader from './shaders/sketch/fragment.glsl'

import vertexShader from './shaders/sketch/vertex.glsl'

import {
  flatModel,
  useModifyCSM,
  useReflect,
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
let speedupGltf: GLTF | null = null

/**
 *  起始房间模型
 */
let startRommGltf: GLTF | null = null

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
function addTextures() {
  const textureLoader = new Three.TextureLoader()

  /**
   * 加载汽车车身AO贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.carAo = textureLoader.load('/models/garage/textures/t_car_body_AO.raw.jpg', (texture) => {
    // 设置汽车车身AO贴图的翻转
    texture.flipY = false

    // 设置汽车车身AO贴图的色彩空间
    texture.colorSpace = Three.LinearSRGBColorSpace

    // 设置汽车车身AO贴图的最小过滤
    texture.minFilter = Three.LinearFilter

    // 设置汽车车身AO贴图的最大过滤
    texture.magFilter = Three.LinearFilter

    // 设置汽车车身AO贴图的通道
    texture.channel = 1
  })

  /**
   * 加载起始房间光贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.startRoomLight = textureLoader.load('/models/garage/textures/t_startroom_light.raw.jpg', (texture) => {
    texture.channel = 1

    // 设置起始房间光贴图的翻转
    texture.flipY = false

    // 设置起始房间光贴图的色彩空间
    texture.colorSpace = Three.LinearSRGBColorSpace
  })

  /**
   * 加载起始房间AO贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.startRoomAo = textureLoader.load('/models/garage/textures/t_startroom_ao.raw.jpg', (texture) => {
    // 设置起始房间AO贴图的翻转
    texture.flipY = false

    // 设置起始房间AO贴图的通道
    texture.channel = 1

    // 设置起始房间AO贴图的色彩空间
    texture.colorSpace = Three.LinearSRGBColorSpace
  })

  /**
   * 加载地板粗糙度贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.floorRoughness = textureLoader.load('/models/garage/textures/t_floor_roughness.webp', (texture) => {
    // 设置地板粗糙度贴图的色彩空间
    texture.colorSpace = Three.LinearSRGBColorSpace

    // 设置地板粗糙度贴图的包裹方式
    texture.wrapS = texture.wrapT = Three.RepeatWrapping
  })

  /**
   * 加载地板法线贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.floorNormal = textureLoader.load('/models/garage/textures/t_floor_normal.webp', (texture) => {
    // 设置地板法线贴图的色彩空间
    texture.colorSpace = Three.LinearSRGBColorSpace

    // 设置地板法线贴图的包裹方式
    texture.wrapS = texture.wrapT = Three.RepeatWrapping
  })
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

function addModels(

) {
  /**
   *  GLTF加载器并设置解码器
   */
  const gltfLoader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)

  //  加载汽车模型
  gltfLoader.load('/models/garage/models/sm_car.gltf', (gltf) => {
    // 设置汽车模型的旋转
    gltf.scene.rotation.y = Math.PI

    carGltf = gltf

    const modelParts = flatModel(carGltf)

    /**
     *  车身部分
     */
    const body = modelParts.find(part => part.name === 'body') as THREE.Mesh

    /**
     *  车身材质
     */
    const bodyMat = body.material as THREE.MeshStandardMaterial

    //  设置车身材质的环境强度
    bodyMat.envMapIntensity = 5

    //  设置车身颜色
    bodyMat.color = new Three.Color('#26d6e9')

    modelParts.forEach((item: THREE.Mesh) => {
      if (item.isMesh) {
        const mat = item.material as THREE.MeshStandardMaterial

        //  设置材质的AO贴图
        mat.aoMap = maps.carAo
      }
    })

    /**
     *  获取汽车轮子
     */
    const wheel = modelParts[35] as THREE.Mesh

    wheel.children.forEach((child) => {
      const mesh = child as THREE.Mesh

      const mat = mesh.material as THREE.MeshStandardMaterial

      //  设置轮子环境贴图强度
      mat.envMapIntensity = 5

      // 保存轮子的引用
      modelRef.wheel.push(mesh)
    })

    //  保存车身材质的引用
    modelRef.bodyMat = bodyMat

    // 添加 模型
    scene.add(gltf.scene)

    // useRaycaster({
    //   container: threeContainerRef.value!,
    //   camera,
    //   targetObject: carGltf.scene,
    //   onIntersect: () => {
    //     garageStore.state.isTouch = true
    //     document.body.style.cursor = 'pointer'
    //   },
    //   onNoIntersect: () => {
    //     garageStore.state.isTouch = false
    //     document.body.style.cursor = 'default'
    //   },
    // })
  })

  //  加载加速器
  gltfLoader.load('/models/garage/models/sm_speedup.gltf', (gltf) => {
    speedupGltf = gltf

    const mat = new CustomShaderMaterial({
      baseMaterial: Three.MeshPhysicalMaterial,
      uniforms,
      vertexShader,
      fragmentShader,

      // silent: true,
      transparent: true,
      depthWrite: false,
    })

    useModifyCSM(gltf, mat)

    scene.add(gltf.scene)
  })

  //  加载起始房间
  gltfLoader.load('/models/garage/models/sm_startroom.raw.gltf', (gltf) => {
    startRommGltf = gltf

    // 获取模型部分

    const modelParts = flatModel(startRommGltf)

    // 获取光部分
    const light = modelParts[1] as THREE.Mesh

    const lightMat = light.material as THREE.MeshPhysicalMaterial

    // 设置光的发光颜色
    lightMat.emissive = new Three.Color('white')

    // 设置光不进行色调映射
    lightMat.toneMapped = false

    // 设置光透明
    lightMat.transparent = true

    light.material = new Three.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: Three.DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    })

    /**
     *  获取地板部分
     */
    const floor = modelParts[2]

    /**
     *  获取地板材质
     */
    const floorMat = floor.material as THREE.MeshPhysicalMaterial

    // 设置地板粗糙度贴图
    floorMat.roughnessMap = maps.floorRoughness

    // 设置地板法线贴图
    floorMat.normalMap = maps.floorNormal

    // 设置地板AO贴图
    floorMat.aoMap = maps.startRoomAo

    // 设置地板光贴图
    floorMat.lightMap = maps.startRoomLight

    // 设置地板环境贴图强度
    floorMat.envMapIntensity = 0

    /**
     *  创建地板的自定义材质
     */
    const floorCsmMat = new CustomShaderMaterial({
      // 设置基础材质为 floorMat
      baseMaterial: floorMat,

      // 设置自定义材质的 uniform 参数
      uniforms: floorUniforms,

      // 指定自定义顶点着色器的代码
      vertexShader: floorVertex,

      // 指定自定义片段着色器的代码
      fragmentShader: floorFrag,

      // 设置 silent 属性，可能是用于屏蔽某些日志或警告信息
      silent: true,
    })

    // 设置地板的自定义材质
    floor.material = floorCsmMat

    // #  ///////

    // 保存地板的引用
    modelRef.floor = floor

    // 保存光材质的引用
    modelRef.lightMat = light.material as THREE.MeshStandardMaterial

    scene.add(gltf.scene)
  })

  setTimeout(() => {
    garageStore.state.isLoaded = true
  }, 2000)
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
  await addModels()
  addTextures()

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
  watchMouseTouch(modelRef, sceneRenderParams, uniforms, floorUniforms, camera)
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
  <!-- <canvas
    ref="threeContainerRef"
    class="h-screen w-full"
    @pointerdown="handlePointerdown"
    @pointerup="handlePointerup"
  /> -->
</template>

<style lang="less" scoped>

</style>
