<script setup lang="ts">

import type {
  Mesh,
  MeshPhysicalMaterial,

  MeshStandardMaterial,
} from 'three'

import { useTestStore } from '@/store'

import gsap from 'gsap'

import * as THREE from 'three'

import {
  CineonToneMapping,
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

import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import { loadModel, loadTexture } from './utils'

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
const speedupGltf = loadModel('/models/sm_speedup.gltf', scene)

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

    const flooMat = modelRef.value.floor?.material as MeshPhysicalMaterial

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

            wheel.forEach((item: Mesh) => {
              const mat = item.material as MeshStandardMaterial

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

          wheel.forEach((item: Mesh) => {
            const mat = item.material as MeshStandardMaterial

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

  // ////////////////////////////////////////////////////////////////////////////////////////

  // 设置相机的位置
  camera.position.set(...cameraOptions.position)

  // 设置渲染器的尺寸和色调映射
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = CineonToneMapping
  renderer.outputEncoding = THREE.sRGBEncoding

  /**
   *  环境光
   */
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)

  /**
   *  平行光
   */
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  // 设置平行光的位置
  directionalLight.position.set(5, 10, 7.5)

  // 设置环境光的颜色
  scene.add(ambientLight, directionalLight)

  // 将渲染器添加到 DOM
  if (threeCanvasContainer.value) {
    threeCanvasContainer.value.appendChild(renderer.domElement)
  }

  // 监听窗口尺寸变化
  window.addEventListener('resize', onWindowResize)

  // 渲染循环
  const animate = () => {
    requestAnimationFrame(animate)

    // 更新模型的旋转
    if (carGltf) {
      // 每次渲染增加一点Y轴旋转
      carGltf.rotation.y += 0.01
    }

    renderer.render(scene, camera)
  }

  animate()
})

/**
 *  调整窗口大小
 */
function onWindowResize() {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  if (renderer) {
    renderer.dispose()
  }
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
