<script setup lang="ts">

import type { MeshStandardMaterial } from 'three'

import { useTestStore } from '@/store'

import gsap from 'gsap'

import * as THREE from 'three'

import {
  Color,
  DoubleSide,
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearSRGBColorSpace,
  Matrix4,
  MeshBasicMaterial,
  NearestFilter,
  RepeatWrapping,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  Uniform,
  UnsignedByteType,
  Vector2,
} from 'three'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import floorFrag from './shaders/sketch/floorfrag.glsl'

import floorVertex from './shaders/sketch/floorver.glsl'

import fragmentShader from './shaders/sketch/fragment.glsl'

import vertexShader from './shaders/sketch/vertex.glsl'

import {
  flatModel,
  loadModel,
  loadTexture,
  printModel,
  useCarAnimation,
  useCubeCamera,
  useModifyCSM,
  useModifyMaterial,
} from './utils'

const testStore = useTestStore()

/**
 * 模型的引用和材质
 */
const modelRef = ref<TestType.model>({
  wheel: [],
  bodyMat: null,
  floor: null,
  lightMat: null,
})

/**
 *  bloom
 */
const bloomRef = ref<any>(null)

/**
 * 动画参数
 */
const params = ref<TestType.params>({
  speedFactor: 0,
  initColor: new Color('#fff'),
  speedupColor: new Color('#000'),
  floorColor: new Color('#fff'),
  floorNormalSpeed: 0,
  bloomIntensity: 1,
  bloomThreshold: 0.9,
  lightOpacity: 1,
  floorEnvIntensity: 0,
  wheelRoughness: 1,
  wheelEnvIntensity: 5,
})

/**
 * uniforms 是一个包含动画相关参数的响应式对象。
 * 这些参数用于控制材质动画效果的速度和时间。
 */
const uniforms = ref({
  /**
   * @property {Uniform} uTime - 动画时间参数，用于控制材质动画的播放时间，初始值为 0。
   */
  uTime: new Uniform(0),

  /**
   * @property {Uniform} uSpeedFactor - 动画速度因子，用于控制动画速度，初始值为 0。
   */
  uSpeedFactor: new Uniform(0),
})

/**
 * floorUniforms 是一个包含地板渲染相关的 Uniform 参数的响应式对象。
 * 这些参数用于自定义地板材质的外观和效果。
 */
const floorUniforms = ref({
  /**
   * @property {Uniform} uColor - 地板的基础颜色，默认是白色。
   */
  uColor: new Uniform(new Color('white')),

  /**
   * @property {Uniform} uReflectMatrix - 反射矩阵，用于控制地板反射效果的方向和强度。
   */
  uReflectMatrix: new Uniform(new Matrix4()),

  /**
   * @property {Uniform} uReflectTexture - 反射纹理，用于为地板提供反射效果的纹理图像。
   */
  uReflectTexture: new Uniform(new Texture()),

  /**
   * @property {Uniform} uReflectIntensity - 反射强度，决定地板反射效果的强弱，默认为 15。
   */
  uReflectIntensity: new Uniform(15),

  /**
   * @property {Uniform} uIntensity - 整体强度，用于控制地板材质的明亮度，默认为 1。
   */
  uIntensity: new Uniform(1),

  /**
   * @property {Uniform} uLevel - 层次级别，控制地板渲染的层次或高度，默认为 0。
   */
  uLevel: new Uniform(0),

  /**
   * @property {Uniform} uResolution - 屏幕分辨率，影响地板材质的精细度，默认为 Vector2 类型的对象。
   */
  uResolution: new Uniform(new Vector2()),

  /**
   * @property {Uniform} uTime - 时间参数，用于控制动画效果，默认值为 0。
   */
  uTime: new Uniform(0),
})

const mat = computed(() => {
  return new CustomShaderMaterial({
    baseMaterial: ShaderMaterial,
    uniforms: uniforms.value,
    vertexShader,
    fragmentShader,
    silent: true,
    transparent: true,
    depthWrite: false,
  })
})

/**
 *  Canvas 容器的引用类型
 */
const threeCanvasContainer = ref<HTMLDivElement | null>(null)

/**
 *  相机配置
 */
const cameraOptions = {
  fov: 45,
  near: 0.1,
  position: [0, 2, 5] as [number, number, number],
  far: 500,
}

/**
 *  场景
 */
const scene = new THREE.Scene()

/**
 *  相机
 */
const camera = new THREE.PerspectiveCamera(
  cameraOptions.fov,
  window.innerWidth / window.innerHeight,
  cameraOptions.near,
  cameraOptions.far,
)

/**
 *  渲染器
 */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
})

/**
 *  加载车模型
 */
const carGltf = loadModel('/models/sm_car.gltf', scene)

/**
 *  加载起始房间模型
 */
const startRommgGltf = loadModel('/models/sm_startroom.raw.gltf', scene)

/**
 *  加载加速模型
 */
const gltf = loadModel('/models/sm_speedup.gltf', scene)

/**
 * AO 贴图
 */
const aoMap = ref<THREE.Texture | null>(null)

loadTexture('/textures/t_car_body_AO.raw.jpg', aoMap)

/**
 * 环境光贴图
 */
const lightMap = ref<THREE.Texture | null>(null)

loadTexture('/textures/t_startroom_light.raw.jpg', lightMap)

/**
 *  起始房间的 AO 贴图
 */
const startRoomAoMap = ref<THREE.Texture | null>(null)

loadTexture('/textures/t_startroom_ao.raw.jpg', startRoomAoMap)

/**
 *  地板的粗糙度贴图
 */
const floorroughnessMap = ref<THREE.Texture | null>(null)

loadTexture('/textures/t_floor_roughness.webp', floorroughnessMap)

/**
 *   地板的法线贴图
 */
const floornormalMap = ref<THREE.Texture | null>(null)

loadTexture('/textures/t_floor_normal.webp', floornormalMap)

watch(
  () => testStore.game.bodyColor,
  (newColor) => {
    if (!modelRef.value?.bodyMat) {
      return
    }

    const par = {
      color: modelRef.value.bodyMat.color,
      targetColor: new Color(newColor),
    }

    // 执行颜色渐变动画
    gsap.to(par.color, {
      duration: 0.35,
      ease: 'power1.out',
      r: par.targetColor.r,
      g: par.targetColor.g,
      b: par.targetColor.b,
      onUpdate: () => {
        // 更新模型颜色
        if (modelRef.value.bodyMat) {
          modelRef.value.bodyMat.color.set(par.color)
        }
      },
    })
  },
)
watch(
  () => testStore.interact.touch,
  (touch) => {
    const baseParam = params.value

    const lightMat = modelRef.value.lightMat

    const flooMat = modelRef.value.floor?.material as THREE.MeshPhysicalMaterial

    const wheel = modelRef.value.wheel

    // 清除已有动画
    gsap.killTweensOf(baseParam)

    gsap.killTweensOf(floorUniforms.value.uColor.value)

    if (touch) {
      // 触摸动画
      const t1 = gsap.timeline()

      t1.to(floorUniforms.value.uColor.value, {
        duration: 1.5,
        ease: 'power1.in',
        r: baseParam.speedupColor.r,
        g: baseParam.speedupColor.g,
        b: baseParam.speedupColor.b,
      })

      t1.to(
        baseParam,
        {
          duration: 1.5,
          ease: 'power1.in',
          lightOpacity: 0,
          onUpdate: () => {
            if (lightMat) {
              lightMat.opacity = baseParam.lightOpacity
            }
          },
        },
        0,
      )

      t1.to(
        baseParam,
        {
          duration: 1.5,
          ease: 'power1.in',
          speedFactor: 1,
          floorEnvIntensity: 0.5,
          bloomIntensity: 2,
          bloomThreshold: 0.1,
          wheelRoughness: 0,
          wheelEnvIntensity: 20,
          floorNormalSpeed: 1,
          onUpdate: () => {
            uniforms.value.uSpeedFactor.value = baseParam.speedFactor
            if (flooMat) {
              flooMat.envMapIntensity = baseParam.floorEnvIntensity
            }

            wheel.forEach((item: THREE.Mesh) => {
              const mat = item.material as THREE.MeshStandardMaterial

              mat.roughness = baseParam.wheelRoughness
              mat.envMapIntensity = baseParam.wheelEnvIntensity
            })

            if (bloomRef.value) {
              bloomRef.value.intensity = baseParam.bloomIntensity
              bloomRef.value.luminanceThreshold = baseParam.bloomThreshold
            }
          },
        },
        1,
      )
    }
    else {
      // 释放触摸动画
      const t2 = gsap.timeline()

      t2.to(baseParam, {
        duration: 1.5,
        ease: 'power1.in',
        speedFactor: 0,
        floorEnvIntensity: 0,
        bloomIntensity: 1,
        bloomThreshold: 1,
        wheelRoughness: 1,
        wheelEnvIntensity: 5,
        floorNormalSpeed: 0,

        onUpdate: () => {
          uniforms.value.uSpeedFactor.value = baseParam.speedFactor
          if (flooMat) {
            flooMat.envMapIntensity = baseParam.floorEnvIntensity
          }

          wheel.forEach((item: THREE.Mesh) => {
            const mat = item.material as THREE.MeshStandardMaterial

            mat.roughness = baseParam.wheelRoughness
            mat.envMapIntensity = baseParam.wheelEnvIntensity
          })

          bloomRef.value.intensity = baseParam.bloomIntensity
          bloomRef.value.luminanceThreshold = baseParam.bloomThreshold
        },
      })

      t2.to(
        floorUniforms.value.uColor.value,
        {
          duration: 1.5,
          ease: 'power1.in',
          r: baseParam.initColor.r,
          g: baseParam.initColor.g,
          b: baseParam.initColor.b,
        },
        '-=1',
      )

      t2.to(
        baseParam,
        {
          duration: 1.5,
          ease: 'power1.in',
          lightOpacity: 1,
          onUpdate: () => {
            if (lightMat) {
              lightMat.opacity = baseParam.lightOpacity
            }
          },
        },
        '-=1',
      )
    }
  },
)
function handleModel() {
  const modelParts = flatModel(carGltf)

  const modelParts2 = flatModel(gltf)

  // 处理 body
  const body = modelParts[2] as THREE.Mesh

  const bodyMat = body.material as THREE.MeshStandardMaterial

  bodyMat.envMapIntensity = 5

  bodyMat.color = new Color('#26d6e9')

  // 处理轮胎
  modelParts.forEach((item) => {
    if (item.isMesh) {
      const mat = item.material as THREE.MeshStandardMaterial

      mat.aoMap = aoMap.value
    }
  })

  const wheel = modelParts[35] as THREE.Mesh

  wheel.children.forEach((child) => {
    const mesh = child as THREE.Mesh

    const mat = mesh.material as THREE.MeshStandardMaterial

    mat.envMapIntensity = 5

    modelRef.value.wheel.push(mesh)
  })

  // 处理灯光材质

  const light = modelParts2[1] as THREE.Mesh

  const lightMat = light.material as THREE.MeshPhysicalMaterial

  lightMat.emissive = new Color('white')
  lightMat.toneMapped = false
  lightMat.transparent = true

  light.material = new MeshBasicMaterial({
    color: 0xFFFFFF,
    side: DoubleSide,
    transparent: true,
    alphaTest: 0.01,
  })

  // 处理地板
  const floor = modelParts2[2] as THREE.Mesh

  const floorMat = floor.material as THREE.MeshStandardMaterial

  floorMat.roughnessMap = floorroughnessMap.value
  floorMat.normalMap = floornormalMap.value
  floorMat.aoMap = startRoomAoMap.value
  floorMat.lightMap = lightMap.value

  const floorCsmMat = new CustomShaderMaterial({
    baseMaterial: floorMat,
    uniforms: floorUniforms,
    vertexShader: floorVertex,
    fragmentShader: floorFrag,
  })

  floor.material = floorCsmMat

  modelRef.value.bodyMat = bodyMat
  modelRef.value.floor = floor

  modelRef.value.lightMat = lightMat as MeshStandardMaterial
}

const { matrix, renderTarget } = useReflect(modelRef.value.floor!, {
  resolution: [innerWidth, innerHeight],
  ignoreObjects: [modelRef.value.floor!, gltf.scene, startRommgltf.scene],
})

// /////////////////////////////////////////////////
onMounted(() => {
  // 处理资源文件
  if (floorroughnessMap.value) {
    // 设置贴图的颜色空间
    floorroughnessMap.value.colorSpace = LinearSRGBColorSpace

    // 设置贴图的环绕方式
    floorroughnessMap.value.wrapS = floorroughnessMap.value.wrapT = RepeatWrapping
  }

  if (floornormalMap.value) {
    // 设置贴图的颜色空间
    floornormalMap.value.colorSpace = LinearSRGBColorSpace

    // 设置贴图的环绕方式
    floornormalMap.value.wrapS = floornormalMap.value.wrapT = RepeatWrapping
  }

  if (aoMap.value) {
    // 取消Y轴翻转
    aoMap.value.flipY = false

    // 设置贴图的颜色空间
    aoMap.value.colorSpace = LinearSRGBColorSpace

    // 设置最小过滤方式
    aoMap.value.minFilter = NearestFilter

    // 设置最大过滤方式
    aoMap.value.magFilter = NearestFilter

    // 设置渲染通道
    aoMap.value.channel = 1
  }

  if (startRoomAoMap.value) {
    startRoomAoMap.value.flipY = false
    startRoomAoMap.value.channel = 1
    startRoomAoMap.value.flipY = false
    startRoomAoMap.value.colorSpace = LinearSRGBColorSpace
  }

  if (lightMap.value) {
    // 设置渲染通道
    lightMap.value.channel = 1

    // 取消Y轴翻转
    lightMap.value.flipY = false
    lightMap.value.colorSpace = SRGBColorSpace
  }

  useModifyCSM(gltf, mat.value)

  // 调用模型处理函数
  handleModel()

  // 设置地板材质的分辨率 Uniform 值
  floorUniforms.value.uResolution.value.set(
    renderTarget.width,
    renderTarget.height,
  )

  testStore.loaded.ready = true

  const { fbo, camera } = useCubeCamera({
    resolution: 512,
  })

  fbo.texture.type = UnsignedByteType
  fbo.texture.generateMipmaps = false
  fbo.texture.minFilter = NearestFilter
  fbo.texture.magFilter = NearestFilter

  useCarAnimation({
    uniforms,
    floorUniforms,
    params,
    cargltf,
    modelRef,
    scene,
    renderer,
    camera,
  })
})

</script>

<template>
  <div
    ref="threeCanvasContainer"
    class="webgl"
  />
</template>

<style scoped lang="less">
@import url(./main.less);
.webgl {
  width: 100%;
  height: 100%;
}
</style>
