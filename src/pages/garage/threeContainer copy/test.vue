<script setup>
import floorFrag from '@/three/shaders/sketch/floorfrag.glsl'

import floorVertex from '@/three/shaders/sketch/floorver.glsl'

import fragmentShader from '@/three/shaders/sketch/fragment.glsl'

import gsap from 'gsap'

import {
  Color,
  CubeCamera,
  DoubleSide,
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearSRGBColorSpace,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NearestFilter,
  PCFSoftShadowMap,
  PerspectiveCamera,
  RepeatWrapping,
  RGBFormat,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  sRGBEncoding,
  Texture,
  Uniform,
  UnsignedByteType,
  Vector2,
  WebGLCubeRenderTarget,
  WebGLRenderer,
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue'

// Shader imports
import vertexShader from '@/three/shaders/sketch/vertex.glsl'

const threeContainerRef = ref(null)

const scene = new Scene()

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500)

const renderer = new WebGLRenderer({
  antialias: true,
})

const bloomRef = ref(null)

const modelRef = reactive({
  wheel: [],
  bodyMat: null,
  floor: null,
  lightMat: null,
})

const params = reactive({
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

const uniforms = reactive({
  uTime: new Uniform(0),
  uSpeedFactor: new Uniform(0),
})

const floorUniforms = reactive({
  uColor: new Uniform(new Color('white')),
  uReflectMatrix: new Uniform(new Matrix4()),
  uReflectTexture: new Uniform(new Texture()),
  uReflectIntensity: new Uniform(15),
  uIntensity: new Uniform(1),
  uLevel: new Uniform(0),
  uResolution: new Uniform(new Vector2()),
  uTime: new Uniform(0),
})

let controls, composer, gltfLoader, textureLoader, carGltf, startRoomGltf, speedupGltf

let aoMap, lightMap, startRoomAoMap, floorroughnessMap, floornormalMap

let matrix, renderTarget, fbo, cubeCamera

function initThree() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.outputEncoding = sRGBEncoding
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  camera.position.set(0, 2, 5)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 1.5, 0)
  controls.update()

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloomPass = new BloomPass(1.25)

  composer.addPass(bloomPass)
  bloomRef.value = bloomPass

  threeContainerRef.value.appendChild(renderer.domElement)
}

function loadAssets() {
  gltfLoader = new GLTFLoader()
  textureLoader = new THREE.TextureLoader()

  gltfLoader.load('/models/sm_car.gltf', (gltf) => {
    carGltf = gltf
    handleModel()
  })

  gltfLoader.load('/models/sm_startroom.raw.gltf', (gltf) => {
    startRoomGltf = gltf
    handleModel()
  })

  gltfLoader.load('/models/sm_speedup.gltf', (gltf) => {
    speedupGltf = gltf
    handleModel()
  })

  aoMap = textureLoader.load('/models/garage/textures/t_car_body_AO.raw.jpg', (texture) => {
    texture.flipY = false
    texture.colorSpace = LinearSRGBColorSpace
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.channel = 1
  })

  lightMap = textureLoader.load('/models/garage/textures/t_startroom_light.raw.jpg', (texture) => {
    texture.flipY = false
    texture.colorSpace = SRGBColorSpace
  })

  startRoomAoMap = textureLoader.load('/models/garage/textures/t_startroom_ao.raw.jpg', (texture) => {
    texture.flipY = false
    texture.colorSpace = LinearSRGBColorSpace
    texture.channel = 1
  })

  floorroughnessMap = textureLoader.load('/models/garage/textures/t_floor_roughness.webp', (texture) => {
    texture.colorSpace = LinearSRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
  })

  floornormalMap = textureLoader.load('/models/garage/textures/t_floor_normal.webp', (texture) => {
    texture.colorSpace = LinearSRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
  })

  fbo = new WebGLCubeRenderTarget(512, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipMapLinearFilter,
  })
  cubeCamera = new CubeCamera(1, 100000, fbo)
  fbo.texture.type = UnsignedByteType
  fbo.texture.generateMipmaps = false
  fbo.texture.minFilter = NearestFilter
  fbo.texture.magFilter = NearestFilter
}

function handleModel() {
  if (!carGltf || !startRoomGltf) { return }

  const modelParts = flatModel(carGltf)

  const modelParts2 = flatModel(startRoomGltf)

  const body = modelParts[2]

  const bodyMat = body.material

  bodyMat.envMapIntensity = 5
  bodyMat.color = new Color('#26d6e9')
  modelParts.forEach((item) => {
    if (item.isMesh) {
      const mat = item.material

      mat.aoMap = aoMap
    }
  })

  const wheel = modelParts[35]

  wheel.children.forEach((child) => {
    const mesh = child

    const mat = mesh.material

    mat.envMapIntensity = 5
    modelRef.wheel.push(mesh)
  })

  const light = modelParts2[1]

  const lightMat = light.material

  lightMat.emissive = new Color('white')
  lightMat.toneMapped = false
  lightMat.transparent = true
  light.material = new MeshBasicMaterial({
    color: 0xFFFFFF,
    side: DoubleSide,
    transparent: true,
    alphaTest: 0.01,
  })

  const floor = modelParts2[2]

  const floorMat = floor.material

  floorMat.roughnessMap = floorroughnessMap
  floorMat.normalMap = floornormalMap
  floorMat.aoMap = startRoomAoMap
  floorMat.lightMap = lightMap
  floorMat.envMapIntensity = 0

  const floorCsmMat = new CustomShaderMaterial({
    baseMaterial: floorMat,
    uniforms: floorUniforms,
    vertexShader: floorVertex,
    fragmentShader: floorFrag,
    silent: true,
  })

  floor.material = floorCsmMat
  floorUniforms.uReflectTexture.value = fbo.texture
  fbo.texture.minFilter = LinearFilter
  fbo.texture.magFilter = LinearFilter

  floorUniforms.uReflectMatrix.value = new Matrix4()

  modelRef.bodyMat = bodyMat
  modelRef.floor = floor
  modelRef.lightMat = light.material
}

function animate() {
  requestAnimationFrame(animate)
  uniforms.uTime.value += 0.05
  floorUniforms.uTime.value += 0.05
  modelRef.wheel.forEach((child) => {
    child.rotateZ(-0.05 * 30 * params.speedFactor)
  })
  composer.render()
}

onMounted(() => {
  initThree()
  loadAssets()
  animate()
})

onUnmounted(() => {
  // 清理 Three.js 资源
  renderer.dispose()
})

watch(
  () => params,
  (newParams) => {
    gsap.to(modelRef.bodyMat.color, {
      duration: 0.35,
      ease: 'power1.out',
      r: newParams.initColor.r,
      g: newParams.initColor.g,
      b: newParams.initColor.b,
      onUpdate: () => {
        modelRef.bodyMat.color.set(newParams.initColor)
      },
    })

    if (newParams.touch) {
      const t1 = gsap.timeline()

      t1.to(floorUniforms.uColor.value, {
        duration: 1.5,
        ease: 'power1.in',
        r: newParams.speedupColor.r,
        g: newParams.speedupColor.g,
        b: newParams.speedupColor.b,
      })

      t1.to(newParams, {
        duration: 1.5,
        ease: 'power1.in',
        lightOpacity: 0,
        onUpdate: () => {
          modelRef.lightMat.opacity = newParams.lightOpacity
        },
      }, 0)

      t1.to(newParams, {
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
          uniforms.uSpeedFactor.value = newParams.speedFactor
          modelRef.floor.material.envMapIntensity = newParams.floorEnvIntensity
          modelRef.wheel.forEach((item) => {
            const mat = item.material

            mat.roughness = newParams.wheelRoughness
            mat.envMapIntensity = newParams.wheelEnvIntensity
          })
          bloomRef.value.intensity = newParams.bloomIntensity
          bloomRef.value.luminanceThreshold = newParams.bloomThreshold
        },
      }, 1)
    }
    else {
      const t2 = gsap.timeline()

      t2.to(newParams, {
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
          uniforms.uSpeedFactor.value = newParams.speedFactor
          modelRef.floor.material.envMapIntensity = newParams.floorEnvIntensity
          modelRef.wheel.forEach((item) => {
            const mat = item.material

            mat.roughness = newParams.wheelRoughness
            mat.envMapIntensity = newParams.wheelEnvIntensity
          })
          bloomRef.value.intensity = newParams.bloomIntensity
          bloomRef.value.luminanceThreshold = newParams.bloomThreshold
        },
      })

      t2.to(floorUniforms.uColor.value, {
        duration: 1.5,
        ease: 'power1.in',
        r: newParams.initColor.r,
        g: newParams.initColor.g,
        b: newParams.initColor.b,
      }, '-=1')

      t2.to(newParams, {
        duration: 1.5,
        ease: 'power1.in',
        lightOpacity: 1,
        onUpdate: () => {
          modelRef.lightMat.opacity = newParams.lightOpacity
        },
      }, '-=1')
    }
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div
    ref="threeContainer"
    class="three-container"
  />
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
