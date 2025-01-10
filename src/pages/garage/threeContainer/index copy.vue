<script lang="ts" setup>
import { useGarageStore } from '@/store'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

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

// 引用 canvas 元素
const threeContainerRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene | null = null

let camera: THREE.PerspectiveCamera | null = null

let renderer: THREE.WebGLRenderer | null = null

let composer: EffectComposer | null = null

let cubeCamera: THREE.CubeCamera | null = null

let fbo: THREE.WebGLCubeRenderTarget | null = null

const garageStore = useGarageStore()

let carGltf: GLTF | null = null

let startRommGltf: GLTF | null = null

let sm_speedupGltf: GLTF | null = null

const modelRef = {
  wheel: [] as THREE.Mesh[],
  bodyMat: null as THREE.MeshStandardMaterial | null,
  floor: null as THREE.Mesh | null,
  lightMat: null as THREE.MeshStandardMaterial | null,
}

const sceneRenderParams = {
  speedFactor: 0,
  initColor: new THREE.Color('#fff'),
  speedupColor: new THREE.Color('#000'),
  floorColor: new THREE.Color('#fff'),
  floorNormalSpeed: 0,
  bloomIntensity: 1,
  bloomThreshold: 0.9,
  lightOpacity: 1,
  floorEnvIntensity: 0,
  wheelRoughness: 1,
  wheelEnvIntensity: 5,
}

const maps = {
  carAo: null as THREE.Texture | null,
  startRoomLight: null as THREE.Texture | null,
  startRoomAo: null as THREE.Texture | null,
  floorRoughness: null as THREE.Texture | null,
  floorNormal: null as THREE.Texture | null,
}

const uniforms = {
  uTime: new THREE.Uniform(0),
  uSpeedFactor: new THREE.Uniform(0),
}

const floorUniforms = {
  uColor: new THREE.Uniform(new THREE.Color('white')),
  uReflectMatrix: new THREE.Uniform(new THREE.Matrix4()),
  uReflectTexture: new THREE.Uniform(new THREE.Texture()),
  uReflectIntensity: new THREE.Uniform(15),
  uIntensity: new THREE.Uniform(1),
  uLevel: new THREE.Uniform(0),
  uResolution: new THREE.Uniform(new THREE.Vector2()),
  uTime: new THREE.Uniform(0),
}

/**
 * 处理窗口大小调整
 */
function onWindowResize() {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

/**
 * 添加光源
 */
function addLights() {
  if (!scene) { return }

  const ambientLight = new THREE.AmbientLight(0x404040, 0.5)

  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 10, 0)
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100)

  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)
}

/**
 * 添加贴图
 */
function addTextures() {
  const textureLoader = new THREE.TextureLoader()

  maps.carAo = textureLoader.load('/models/garage/textures/t_car_body_AO.raw.jpg', (texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.LinearSRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
  })

  maps.startRoomLight = textureLoader.load('/models/garage/textures/t_startroom_light.raw.jpg', (texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.LinearSRGBColorSpace
  })

  maps.startRoomAo = textureLoader.load('/models/garage/textures/t_startroom_ao.raw.jpg', (texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.LinearSRGBColorSpace
  })

  maps.floorRoughness = textureLoader.load('/models/garage/textures/t_floor_roughness.webp', (texture) => {
    texture.colorSpace = THREE.LinearSRGBColorSpace
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  })

  maps.floorNormal = textureLoader.load('/models/garage/textures/t_floor_normal.webp', (texture) => {
    texture.colorSpace = THREE.LinearSRGBColorSpace
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  })
}

/**
 * 添加控制器
 */
function addOrbitControls() {
  if (!camera || !renderer) { return }

  const controlDom = document.getElementById('controlRef')

  if (!controlDom) { return }

  const controls = new OrbitControls(camera, controlDom)

  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI / 2
  controls.minPolarAngle = 0
  controls.update()

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene!, camera))
  composer.addPass(new BloomPass(1.25))
}

/**
 * 添加模型
 */
async function addModels() {
  const gltfLoader = new GLTFLoader()

  gltfLoader.setMeshoptDecoder(MeshoptDecoder)

  await new Promise<void>((resolve) => {
    gltfLoader.load('/models/garage/models/sm_car.gltf', (gltf) => {
      gltf.scene.rotation.y = Math.PI
      carGltf = gltf

      const modelParts = flatModel(carGltf)

      const body = modelParts.find(part => part.name === 'body') as THREE.Mesh

      const bodyMat = body.material as THREE.MeshStandardMaterial

      bodyMat.envMapIntensity = 5
      bodyMat.color = new THREE.Color('#26d6e9')

      modelParts.forEach((item: THREE.Mesh) => {
        if (item.isMesh) {
          const mat = item.material as THREE.MeshStandardMaterial

          mat.aoMap = maps.carAo
        }
      })

      const wheel = modelParts[35] as THREE.Mesh

      wheel.children.forEach((child) => {
        const mesh = child as THREE.Mesh

        const mat = mesh.material as THREE.MeshStandardMaterial

        mat.envMapIntensity = 5
        modelRef.wheel.push(mesh)
      })

      modelRef.bodyMat = bodyMat
      scene!.add(gltf.scene)
      resolve()
    })
  })

  await new Promise<void>((resolve) => {
    gltfLoader.load('/models/garage/models/sm_speedup.gltf', (gltf) => {
      sm_speedupGltf = gltf

      const mat = new CustomShaderMaterial({
        baseMaterial: THREE.MeshPhysicalMaterial,
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      })

      useModifyCSM(gltf, mat)
      scene!.add(gltf.scene)
      resolve()
    })
  })

  await new Promise<void>((resolve) => {
    gltfLoader.load('/models/garage/models/sm_startroom.raw.gltf', (gltf) => {
      startRommGltf = gltf
      const modelParts = flatModel(startRommGltf)

      const light = modelParts[1] as THREE.Mesh

      const lightMat = light.material as THREE.MeshPhysicalMaterial

      lightMat.emissive = new THREE.Color('white')
      lightMat.toneMapped = false
      lightMat.transparent = true

      light.material = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
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
      scene!.add(gltf.scene)
      resolve()
    })
  })
}

const clock = new THREE.Clock()

function animate() {
  if (!renderer || !scene || !camera) { return }

  requestAnimationFrame(animate)
  const delta = clock.getDelta()

  uniforms.uTime.value += delta
  floorUniforms.uTime.value += delta * sceneRenderParams.floorNormalSpeed * 20
  cubeCamera?.update(renderer, scene)

  modelRef.wheel.forEach((child) => {
    child.rotateZ(-delta * 30 * sceneRenderParams.speedFactor)
  })

  composer?.render()
  renderer.render(scene, camera)
}

onMounted(async () => {
  if (!threeContainerRef.value) { return }

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(0, 2, 5)

  renderer = new THREE.WebGLRenderer({
    canvas: threeContainerRef.value,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = THREE.CineonToneMapping

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new BloomPass(1.25))

  addLights()
  addOrbitControls()
  await addModels()
  addTextures()

  const { matrix, renderTarget } = useReflect(modelRef.floor!, {
    resolution: [innerWidth, innerHeight],
    ignoreObjects: [modelRef.floor!, sm_speedupGltf!.scene, startRommGltf!.scene],
  })

  floorUniforms.uReflectTexture.value = renderTarget.texture
  renderTarget.texture.minFilter = THREE.LinearFilter
  renderTarget.texture.magFilter = THREE.LinearFilter
  floorUniforms.uReflectMatrix.value = matrix
  floorUniforms.uResolution.value.set(renderTarget.width, renderTarget.height)

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
    type: THREE.UnsignedByteType,
    generateMipmaps: false,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
  })

  cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget)
  fbo = cubeRenderTarget
  scene.environment = fbo.texture

  animate()

  watchColorChange(modelRef)
  watchMouseTouch(modelRef, sceneRenderParams, uniforms, floorUniforms)
  window.addEventListener('resize', onWindowResize)
  garageStore.ui.loading.ready = true
})

onUnmounted(() => {
  renderer?.dispose()
  window.removeEventListener('resize', onWindowResize)
})

</script>

<template>
  <canvas
    ref="threeContainerRef"
    class="h-screen w-full"
  />
</template>

<style scoped>
.h-screen {
  height: 100vh;
}
.w-full {
  width: 100%;
}
</style>
