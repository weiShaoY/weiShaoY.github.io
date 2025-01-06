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

const props = defineProps<{

  /**
   *  场景
   */
  scene: THREE.Scene

  /**
   *  相机
   */
  camera: THREE.PerspectiveCamera

  /**
   *  渲染器
   */
  renderer: THREE.WebGLRenderer
}>()

const garageStore = useGarageStore()

/**
 *  Bloom效果
 */
const bloomRef = ref<any>()

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

const params = ref({
  /**
   *  速度因子
   */
  speedFactor: 0,

  /**
   *  初始颜色
   */
  initColor: new three.Color('#fff'),

  /**
   *  加速颜色
   */
  speedupColor: new three.Color('#000'),

  /**
   *  地板颜色
   */
  floorColor: new three.Color('#fff'),

  /**
   *  地板法线速度
   */
  floorNormalSpeed: 0,

  /**
   *  Bloom 强度
   */
  bloomIntensity: 1,

  /**
   *  Bloom 阈值
   */
  bloomThreshold: 0.9,

  /**
   *  光的不透明度
   */
  lightOpacity: 1,

  /**
   *  地板环境强度
   */
  floorEnvIntensity: 0,

  /**
   *  轮子粗糙度
   */
  wheelRoughness: 1,

  /**
   *  轮子环境强度
   */
  wheelEnvIntensity: 5,
})

const textureLoader = new three.TextureLoader()

/**
 *  汽车车身AO贴图
 */
const carAoMap = textureLoader.load('/models/garage/textures/t_car_body_AO.raw.jpg')

// 设置汽车车身AO贴图的翻转
carAoMap.flipY = false

// 设置汽车车身AO贴图的色彩空间
carAoMap.colorSpace = three.LinearSRGBColorSpace

// 设置汽车车身AO贴图的最小过滤
carAoMap.minFilter = three.LinearFilter

// 设置汽车车身AO贴图的最大过滤
carAoMap.magFilter = three.LinearFilter

// 设置汽车车身AO贴图的通道
carAoMap.channel = 1

/**
 *  起始房间光贴图
 */
const startRoomLightMap = textureLoader.load('/models/garage/textures/t_startroom_light.raw.jpg')

// 设置起始房间光贴图的翻转
startRoomLightMap.flipY = false

// 设置起始房间光贴图的色彩空间
startRoomLightMap.colorSpace = three.LinearSRGBColorSpace

/**
 *  起始房间AO贴图
 */
const startRoomAoMap = textureLoader.load('/models/garage/textures/t_startroom_ao.raw.jpg')

// 设置起始房间AO贴图的翻转
startRoomAoMap.flipY = false

// 设置起始房间AO贴图的通道
startRoomAoMap.channel = 1

// 设置起始房间AO贴图的色彩空间
startRoomAoMap.colorSpace = three.LinearSRGBColorSpace

/**
 *  地板粗糙度贴图
 */
const floorRoughnessMap = textureLoader.load('/models/garage/textures/t_floor_roughness.webp')

// 设置地板粗糙度贴图的色彩空间
floorRoughnessMap.colorSpace = three.LinearSRGBColorSpace

// 设置地板粗糙度贴图的包裹方式
floorRoughnessMap.wrapS = floorRoughnessMap.wrapT = three.RepeatWrapping

/**
 *  地板法线贴图
 */
const floorNormalMap = textureLoader.load('/models/garage/textures/t_floor_normal.webp')

// 设置地板法线贴图的色彩空间
floorNormalMap.colorSpace = three.LinearSRGBColorSpace

// 设置地板法线贴图的包裹方式
floorNormalMap.wrapS = floorNormalMap.wrapT = three.RepeatWrapping

/**
 * 时间和速度因子
 */
const uniforms = {
  /**
   *  地板时间统一变量
   */
  uTime: new three.Uniform(0),

  /**
   *  地板速度因子统一变量
   */
  uSpeedFactor: new three.Uniform(0),
}

const floorUniforms = {
  /**
   *  地板颜色统一变量
   */
  uColor: new three.Uniform(new three.Color('white')),

  /**
   *  反射矩阵统一变量
   */
  uReflectMatrix: new three.Uniform(new three.Matrix4()),

  /**
   *  反射纹理统一变量
   */
  uReflectTexture: new three.Uniform(new three.Texture()),

  /**
   *  反射强度统一变量
   */
  uReflectIntensity: new three.Uniform(15),

  /**
   *  强度统一变量
   */
  uIntensity: new three.Uniform(1),

  /**
   *  层级统一变量
   */
  uLevel: new three.Uniform(0),

  /**
   *  分辨率统一变量
   */
  uResolution: new three.Uniform(new three.Vector2()),

  /**
   *  时间统一变量
   */
  uTime: new three.Uniform(0),
}

/**
 *  扁平化模型
 */

function getModel() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.setMeshoptDecoder(MeshoptDecoder)

  gltfLoader.load('/models/garage/models/sm_car.gltf', (gltf) => {
    // const modelParts = gltf.scene.children as THREE.Mesh[]

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
        mat.aoMap = carAoMap
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
    props.scene.add(gltf.scene)
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
    floorMat.roughnessMap = floorRoughnessMap

    // 设置地板法线贴图
    floorMat.normalMap = floorNormalMap

    // 设置地板AO贴图
    floorMat.aoMap = startRoomAoMap

    // 设置地板光贴图
    floorMat.lightMap = startRoomLightMap

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

    props.scene.add(gltf.scene)
  })
}

// const { matrix, renderTarget } = useReflect(modelRef.value.current.floor!, {
//   resolution: [innerWidth, innerHeight],
//   ignoreObjects: [modelRef.value.current.floor!, gltf.scene, startRommgltf.scene],
// })

onMounted(() => {
  // 调用模型处理函数
  getModel()

  /**
   *  创建轨道控制器
   */
  const controls = new OrbitControls(props.camera, props.renderer.domElement)

  // const controls = new OrbitControls(props.camera, garageStore.interact.controlDom)

  // 设置控制器目标
  controls.target.set(0, 1.5, 0)

  // 更新控制器
  controls.update()

  // 创建效果组合器
  const composer = new EffectComposer(props.renderer)

  // 添加渲染通道
  composer.addPass(new RenderPass(props.scene, props.camera))

  // 添加Bloom通道
  composer.addPass(new BloomPass(1.25))

  bloomRef.value = new BloomPass(1.25)

  const animate = () => {
    requestAnimationFrame(animate)

    // 更新时间统一变量
    uniforms.uTime.value += 0.05

    // 更新地板时间统一变量
    floorUniforms.uTime.value += 0.05

    // 渲染场景
    composer.render()
  }

  animate()

  // 设置 资源加载完成
  garageStore.ui.loading.ready = true
})

//  监听颜色变化
watch(() => garageStore.ui.bar.bodyColor, () => {
  // 如果车身材质不存在，返回
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
      modelRef.value.bodyMat!.color.set(par.color) // 更新车身颜色
    },
  })
})

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
  <div />
</template>

<style scoped>

</style>
