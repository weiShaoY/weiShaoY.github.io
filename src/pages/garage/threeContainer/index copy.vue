<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type * as THREE from 'three'

import { useGarageStore } from '@/store'

import gsap from 'gsap'

import * as three from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import floorFrag from './shaders/sketch/floorfrag.glsl'

import floorVertex from './shaders/sketch/floorver.glsl'

import { flatModel } from './utils'

const garageStore = useGarageStore()

/**
 *  3D容器
 */
const threeContainerRef = ref<HTMLCanvasElement>()

/**
 *  Bloom效果
 */
const bloomRef = ref<any>()

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

let composer: EffectComposer

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
const params = ref({
  /**
   * 速度因子
   * 表示模型的运动速度影响因子，用于动态效果调整。
   */
  speedFactor: 0,

  /**
   * 初始颜色
   * 模型初始显示的颜色。
   * @type {THREE.Color}
   */
  initColor: new three.Color('#fff'),

  /**
   * 加速颜色
   * 模型在加速状态下显示的颜色。
   */
  speedupColor: new three.Color('#000'),

  /**
   * 地板颜色
   * 地板的基础显示颜色。
   */
  floorColor: new three.Color('#fff'),

  /**
   * 地板法线速度
   * 控制地板法线贴图滚动的速度。
   */
  floorNormalSpeed: 0,

  /**
   * Bloom 强度
   * 场景中的高亮部分的发光效果强度。
   */
  bloomIntensity: 1,

  /**
   * Bloom 阈值
   * 控制 Bloom 效果触发的亮度阈值。
   */
  bloomThreshold: 0.9,

  /**
   * 光的不透明度
   * 调整光线材质的透明度。
   */
  lightOpacity: 1,

  /**
   * 地板环境强度
   * 控制地板的环境光照强度。
   */
  floorEnvIntensity: 0,

  /**
   * 轮子粗糙度
   * 控制车轮材质的粗糙度，值越高越粗糙。
   */
  wheelRoughness: 1,

  /**
   * 轮子环境强度
   * 控制车轮的环境光照强度。
   */
  wheelEnvIntensity: 5,
})

/**
 *  贴图
 */
const maps = ref({

  /**
   * 汽车车身AO贴图
   * 初始值为 null，稍后动态加载。
   */
  carAo: null as THREE.Texture | null,

  /**
   * 起始房间光贴图
   * 初始值为 null，稍后动态加载。
   */
  startRoomLight: null as THREE.Texture | null,

  /**
   * 起始房间AO贴图
   * 初始值为 null，稍后动态加载。
   */
  startRoomAo: null as THREE.Texture | null,

  /**
   * 地板粗糙度贴图
   * 初始值为 null，稍后动态加载。
   */
  floorRoughness: null as THREE.Texture | null,

  /**
   * 地板法线贴图
   * 初始值为 null，稍后动态加载。
   */
  floorNormal: null as THREE.Texture | null,
})

/**
 * 地板的着色器统一变量集合
 * 用于传递动态数据和控制地板的材质效果。
 */
const uniforms = {
  /**
   * 地板时间统一变量
   * 用于动画效果中的时间控制，随着渲染帧不断更新。
   */
  uTime: new three.Uniform(0),

  /**
   * 地板速度因子统一变量
   * 控制地板动画或效果中的速度比例。
   */
  uSpeedFactor: new three.Uniform(0),
}

/**
 * 地板的着色器统一变量集合
 * 用于传递地板材质中需要的动态数据和配置参数。
 */
const floorUniforms = {
  /**
   * 地板颜色统一变量
   * 控制地板的基础颜色。
   */
  uColor: new three.Uniform(new three.Color('white')),

  /**
   * 反射矩阵统一变量
   * 用于计算反射效果的变换矩阵。
   */
  uReflectMatrix: new three.Uniform(new three.Matrix4()),

  /**
   * 反射纹理统一变量
   * 用于渲染地板反射效果的纹理。
   */
  uReflectTexture: new three.Uniform(new three.Texture()),

  /**
   * 反射强度统一变量
   * 控制地板反射效果的强度。
   */
  uReflectIntensity: new three.Uniform(15),

  /**
   * 强度统一变量
   * 控制地板整体材质的强度参数。
   */
  uIntensity: new three.Uniform(1),

  /**
   * 层级统一变量
   * 可用于控制地板材质的层级效果，如叠加的纹理层数。
   */
  uLevel: new three.Uniform(0),

  /**
   * 分辨率统一变量
   * 表示地板渲染时的屏幕分辨率，通常用于处理屏幕空间效果。
   */
  uResolution: new three.Uniform(new three.Vector2()),

  /**
   * 时间统一变量
   * 用于动态效果的时间参数，如动画或特效的时间驱动。
   */
  uTime: new three.Uniform(0),
}

/**
 * 添加光源
 */
function addLights() {
  /**
   *  环境光
   */
  const ambientLight = new three.AmbientLight(0x404040, 0.5)

  scene.add(ambientLight)
  const directionalLight = new three.DirectionalLight(0xFFFFFF, 1)

  /**
   *  平行光
   */
  directionalLight.position.set(0, 10, 0)

  scene.add(directionalLight)

  /**
   * 点光源
   */
  const pointLight = new three.PointLight(0xFFFFFF, 1, 100)

  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)

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

  if (threeContainerRef.value) {
    threeContainerRef.value.appendChild(renderer.domElement)
  }
}

/**
 * 添加贴图
 */
function addTextures() {
  const textureLoader = new three.TextureLoader()

  maps.value.carAo = textureLoader.load('/models/garage/textures/t_car_body_AO.raw.jpg', (texture) => {
    // 设置汽车车身AO贴图的翻转
    texture.flipY = false

    // 设置汽车车身AO贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace

    // 设置汽车车身AO贴图的最小过滤
    texture.minFilter = three.LinearFilter

    // 设置汽车车身AO贴图的最大过滤
    texture.magFilter = three.LinearFilter

    // 设置汽车车身AO贴图的通道
    texture.channel = 1
  })

  maps.value.startRoomLight = textureLoader.load('/models/garage/textures/t_startroom_light.raw.jpg', (texture) => {
    // 设置起始房间光贴图的翻转
    texture.flipY = false

    // 设置起始房间光贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace
  })

  maps.value.startRoomAo = textureLoader.load('/models/garage/textures/t_startroom_ao.raw.jpg', (texture) => {
    // 设置起始房间AO贴图的翻转
    texture.flipY = false

    // 设置起始房间AO贴图的通道
    texture.channel = 1

    // 设置起始房间AO贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace
  })

  maps.value.floorRoughness = textureLoader.load('/models/garage/textures/t_floor_roughness.webp', (texture) => {
    // 设置地板粗糙度贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace

    // 设置地板粗糙度贴图的包裹方式
    texture.wrapS = texture.wrapT = three.RepeatWrapping
  })

  maps.value.floorNormal = textureLoader.load('/models/garage/textures/t_floor_normal.webp', (texture) => {
    // 设置地板法线贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace

    // 设置地板法线贴图的包裹方式
    texture.wrapS = texture.wrapT = three.RepeatWrapping
  })
}

function addModels() {
  const gltfLoader = new GLTFLoader()

  // 设置模型加载器的解码器
  gltfLoader.setMeshoptDecoder(MeshoptDecoder)

  gltfLoader.load('/models/garage/models/sm_car.gltf', (gltf) => {
    const modelParts = flatModel(gltf)

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
    bodyMat.color = new three.Color('#26d6e9')

    modelParts.forEach((item: THREE.Mesh) => {
      if (item.isMesh) {
        const mat = item.material as THREE.MeshStandardMaterial

        //  设置材质的AO贴图
        mat.aoMap = maps.value.carAo
      }
    })

    /**
     *  获取轮子部分
     */
    const wheel = modelParts[35] as THREE.Mesh

    wheel.children.forEach((child) => {
      const mesh = child as THREE.Mesh

      const mat = mesh.material as THREE.MeshStandardMaterial

      //  设置轮子环境贴图强度
      mat.envMapIntensity = 5

      // 保存轮子的引用
      modelRef.value.wheel.push(mesh)
    })

    //  保存车身材质的引用
    modelRef.value.bodyMat = bodyMat

    // 添加 模型
    scene.add(gltf.scene)
  })

  gltfLoader.load('/models/garage/models/sm_startroom.raw.gltf', (gltf) => {
    // 获取模型部分

    const modelParts = flatModel(gltf)

    // 获取光部分
    const light = modelParts[1] as THREE.Mesh

    const lightMat = light.material as THREE.MeshPhysicalMaterial

    // 设置光的发光颜色
    lightMat.emissive = new three.Color('white')

    // 设置光不进行色调映射
    lightMat.toneMapped = false

    // 设置光透明
    lightMat.transparent = true

    light.material = new three.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: three.DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    })

    /**
     *  获取地板部分
     */
    const floor = modelParts[2] as THREE.Mesh

    /**
     *  获取地板材质
     */
    const floorMat = floor.material as THREE.MeshPhysicalMaterial

    // 设置地板粗糙度贴图
    floorMat.roughnessMap = maps.value.floorRoughness

    // 设置地板法线贴图
    floorMat.normalMap = maps.value.floorNormal

    // 设置地板AO贴图
    floorMat.aoMap = maps.value.startRoomAo

    // 设置地板光贴图
    floorMat.lightMap = maps.value.startRoomLight

    // 设置地板环境贴图强度
    floorMat.envMapIntensity = 0

    /**
     *  创建地板的自定义材质
     */
    const floorCsmMat = new CustomShaderMaterial({
      baseMaterial: floorMat,
      uniforms: floorUniforms,
      vertexShader: floorVertex,

      fragmentShader: floorFrag,
      silent: true,
    })

    // 设置地板的自定义材质
    floor.material = floorCsmMat

    // 设置反射纹理
    // floorUniforms.uReflectTexture.value = renderTarget.texture

    // // 设置反射纹理的最小过滤
    // renderTarget.texture.minFilter = LinearFilter

    // // 设置反射纹理的最大过滤
    // renderTarget.texture.magFilter = LinearFilter

    // 设置反射矩阵
    // floorUniforms.uReflectMatrix.value = matrix

    // 保存地板的引用
    modelRef.value.floor = floor

    // 保存光材质的引用
    modelRef.value.lightMat = light.material as THREE.MeshStandardMaterial

    scene.add(gltf.scene)
  })
}

function initThree(canvas: HTMLCanvasElement) {
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

  addLights()

  addTextures()

  addModels()

  addOrbitControls()

  function animate() {
    requestAnimationFrame(animate)

    // 更新时间统一变量
    uniforms.uTime.value += 0.05

    // 更新地板时间统一变量
    floorUniforms.uTime.value += 0.05
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
  if (threeContainerRef.value) {
    initThree(threeContainerRef.value)

    // 监听窗口大小调整事件
    window.addEventListener('resize', onWindowResize)

    // 设置 资源加载完成
    garageStore.ui.loading.ready = true
  }
})

onUnmounted(() => {
  renderer.dispose()
  window.removeEventListener('resize', onWindowResize)
})

//  监听颜色变化
watch(() => garageStore.ui.bar.bodyColor, () => {
  // // 如果车身材质不存在，返回
  if (!modelRef.value.bodyMat) {
    return
  }

  const par = {
    // 当前颜色
    color: modelRef.value.bodyMat.color,

    // 目标颜色
    targetColor: new three.Color(garageStore.ui.bar.bodyColor),
  }

  gsap.to(par.color, {
    duration: 0.65, // 动画持续时间
    ease: 'power1.out', // 动画缓动函数
    r: par.targetColor.r, // 目标红色通道
    g: par.targetColor.g, // 目标绿色通道
    b: par.targetColor.b, // 目标蓝色通道
    onUpdate: () => {
      // 更新车身颜色
      modelRef.value.bodyMat!.color.set(par.color)
    },
  })
})

//  监听交互
watch(() => garageStore.interact.touch, () => {
  console.log('%c Line:488 🥟 touch', 'color:#b03734', garageStore.interact.touch)

  /**
   *  获取当前参数
   */
  const baseParam = params.value

  /**
   *  获取光材质
   */
  const lightMat = modelRef.value.lightMat //

  /**
   *  获取地板材质
   */
  const flooMat = modelRef.value.floor?.material as THREE.MeshPhysicalMaterial

  const wheel = modelRef.value.wheel // 获取轮子

  gsap.killTweensOf(baseParam) // 停止当前参数的动画
  gsap.killTweensOf(floorUniforms.uColor.value) // 停止地板颜色的动画

  if (garageStore.interact.touch) {
    const t1 = gsap.timeline() // 创建时间线动画

    t1.to(floorUniforms.uColor.value, {
      duration: 1.5, // 动画持续时间
      ease: 'power1.in', // 动画缓动函数
      r: baseParam.speedupColor.r, // 加速颜色红色通道
      g: baseParam.speedupColor.g, // 加速颜色绿色通道
      b: baseParam.speedupColor.b, // 加速颜色蓝色通道
    })

    t1.to(
      baseParam,
      {
        duration: 1.5, // 动画持续时间
        ease: 'power1.in', // 动画缓动函数
        lightOpacity: 0, // 光的不透明度
        onUpdate: () => {
          lightMat && (lightMat.opacity = baseParam.lightOpacity) // 更新光的不透明度
        },
      },
      0,
    )

    t1.to(
      baseParam,
      {
        duration: 1.5, // 动画持续时间
        ease: 'power1.in', // 动画缓动函数
        speedFactor: 1, // 速度因子
        floorEnvIntensity: 0.5, // 地板环境强度
        bloomIntensity: 2, // Bloom 强度
        bloomThreshold: 0.1, // Bloom 阈值
        wheelRoughness: 0, // 轮子粗糙度
        wheelEnvIntensity: 20, // 轮子环境强度
        floorNormalSpeed: 1, // 地板法线速度
        onUpdate: () => {
          uniforms.uSpeedFactor.value = baseParam.speedFactor // 更新速度因子
          flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity) // 更新地板环境强度
          wheel.forEach((item) => {
            const mat = item.material as THREE.MeshStandardMaterial

            mat.roughness = baseParam.wheelRoughness // 更新轮子粗糙度
            mat.envMapIntensity = baseParam.wheelEnvIntensity // 更新轮子环境强度
          })
          bloomRef.value.intensity = baseParam.bloomIntensity // 更新Bloom强度
          bloomRef.value.luminanceThreshold = baseParam.bloomThreshold // 更新Bloom阈值
        },
      },
      1,
    )
  }
  else {
    const t2 = gsap.timeline() // 创建时间线动画

    t2.to(baseParam, {
      duration: 1.5, // 动画持续时间
      ease: 'power1.in', // 动画缓动函数
      speedFactor: 0, // 速度因子
      floorEnvIntensity: 0, // 地板环境强度
      bloomIntensity: 1, // Bloom 强度
      bloomThreshold: 1, // Bloom 阈值
      wheelRoughness: 1, // 轮子粗糙度
      wheelEnvIntensity: 5, // 轮子环境强度
      floorNormalSpeed: 0, // 地板法线速度
      onUpdate: () => {
        uniforms.uSpeedFactor.value = baseParam.speedFactor // 更新速度因子
        flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity) // 更新地板环境强度
        wheel.forEach((item) => {
          const mat = item.material as THREE.MeshStandardMaterial

          mat.roughness = baseParam.wheelRoughness // 更新轮子粗糙度
          mat.envMapIntensity = baseParam.wheelEnvIntensity // 更新轮子环境强度
        })
        bloomRef.value.intensity = baseParam.bloomIntensity // 更新Bloom强度
        bloomRef.value.luminanceThreshold = baseParam.bloomThreshold // 更新Bloom阈值
      },
    })
    t2.to(
      floorUniforms.uColor.value,
      {
        duration: 1.5, // 动画持续时间
        ease: 'power1.in', // 动画缓动函数
        r: baseParam.initColor.r, // 初始颜色红色通道
        g: baseParam.initColor.g, // 初始颜色绿色通道
        b: baseParam.initColor.b, // 初始颜色蓝色通道
      },
      '-=1',
    )

    t2.to(
      baseParam,
      {
        duration: 1.5, // 动画持续时间
        ease: 'power1.in', // 动画缓动函数
        lightOpacity: 1, // 光的不透明度
        onUpdate: () => {
          // 更新光的不透明度
          lightMat && (lightMat.opacity = baseParam.lightOpacity)
        },
      },
      '-=1',
    )
  }
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
