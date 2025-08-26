<script setup lang="ts">
import gsap from 'gsap'

import * as THREE from 'three'

import { OrbitControls } from 'three/addons'

import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import ring2 from '@/assets/images/bgScreen/pie/ring2.png'

import ring3 from '@/assets/images/bgScreen/pie/ring3.png'

import ring4 from '@/assets/images/bgScreen/pie/ring4.png'

import { emptyObject } from '../../mini3d'

type PropsType = {

  /**
   *  饼图数据
   */
  data?: {
    name: string
    value: number
  }[]

  /**
   *  颜色数组
   */
  colors?: number[]

  /**
   *  透明度
   */
  opacity?: number

  /**
   *  延迟时间
   */
  delay?: number

  /**
   *  循环完成回调
   */
  loopComplete?: () => void
}

const props = withDefaults(defineProps<PropsType>(), {
  data: () => [],
  colors: () => [0x20FAAE, 0xEAB108, 0x2FA4E7, 0x00FFFF, 0xFC5430],
  opacity: 0.5,
  delay: 5000,
  loopComplete: () => {},
})

const data = props.data ?? []

const colors = props.colors ?? [0x20FAAE, 0xEAB108, 0x2FA4E7, 0x00FFFF, 0xFC5430]

const opacity = props.opacity ?? 0.5

const delay = props.delay ?? 5000

const loopComplete = props.loopComplete ?? (() => {})

// refs
const pieDom = ref<HTMLElement | null>(null)

// state
const width = ref(300)

const height = ref(200)

const activeIndex = ref(0)

const count = ref(0)

const timer = ref<number | null>(null)

// three.js objects
let scene: THREE.Scene | null = null

let camera: THREE.PerspectiveCamera | null = null

let renderer: THREE.WebGLRenderer | null = null

let controls: OrbitControls | null = null

let axes: THREE.AxesHelper | null = null

const pieGroup = new THREE.Group()

let prevMesh: THREE.Mesh | null = null

// computed
const currentData = computed(() => {
  return {
    ...(data[activeIndex.value] || {
    }),
    count: count.value,
  }
})

// methods
function getTexture(url: string) {
  const texture = new THREE.TextureLoader().load(url)

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createPlane(opt: {
  url: string
  width: number
  position: THREE.Vector3
  animate?: boolean
  color?: string | null
}) {
  const defaultOpt = {
    url: 'texture/ring1.png',
    width: 5.5,
    position: new THREE.Vector3(0, 0, 0),
    animate: false,
    color: null,
  }

  const options = Object.assign(defaultOpt, opt)

  const geometry = new THREE.PlaneGeometry(options.width, options.width)

  const material = new THREE.MeshBasicMaterial({
    map: getTexture(options.url),
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: false,
  })

  if (options.color) {
    material.color = new THREE.Color(options.color)
  }

  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.copy(options.position)
  mesh.rotation.x = (-1 * Math.PI) / 2
  if (options.animate) {
    gsap.to(mesh.rotation, {
      z: 2 * Math.PI,
      repeat: -1,
      ease: 'none',
      duration: 3,
    })
  }

  scene!.add(mesh)
}

function addRing(opt: Partial<{
  innerRadius: number
  outerRadius: number
  thickness: number
  startAngle: number
  endAngle: number
  color: THREE.Color
  segments: number
}>): THREE.Mesh {
  const defaultOpt = {
    innerRadius: 1.5,
    outerRadius: 2,
    thickness: 0.5,
    startAngle: 0,
    endAngle: Math.PI / 2,
    color: new THREE.Color(0x00FFFF),
    segments: 120,
  }

  const options = Object.assign(defaultOpt, opt)

  const outerShape = new THREE.Shape()

  outerShape.arc(0, 0, options.outerRadius, options.startAngle, options.endAngle)
  const outerPoints = outerShape.getPoints(options.segments)

  const innerShape = new THREE.Shape()

  innerShape.arc(0, 0, options.innerRadius, options.endAngle, options.startAngle, true)
  const innerPoints = innerShape.getPoints(options.segments)

  const shape = new THREE.Shape(outerPoints.concat(innerPoints))

  const extrudeSettings = {
    steps: 1,
    depth: options.thickness,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 0,
  }

  const extruGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

  const material = new THREE.MeshLambertMaterial({
    color: options.color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
  })

  const mesh = new THREE.Mesh(extruGeometry, material.clone())

  mesh.renderOrder = 10
  mesh.rotation.x = (-1 * Math.PI) / 2
  return mesh
}

function chooseRing(newActiveIndex = 0, isFirst = false) {
  const prevIndex = newActiveIndex - 1 < 0 ? data.length - 1 : newActiveIndex - 1

  prevMesh = pieGroup.children[prevIndex] as THREE.Mesh
  activeIndex.value = newActiveIndex
  const chooseMesh = pieGroup.children[newActiveIndex] as THREE.Mesh

  if (!isFirst) {
    gsap.to((prevMesh as THREE.Mesh).scale, {
      z: 1,
    })
    gsap.to((prevMesh as THREE.Mesh).material, {
      opacity,
    })
  }

  gsap.to((chooseMesh as THREE.Mesh).scale, {
    z: 2,
  })
  gsap.to((chooseMesh as THREE.Mesh).material, {
    opacity: 0.8,
  })
}

function loopChange() {
  let index = activeIndex.value + 1

  if (index >= data.length) {
    index = 0
    loopComplete && loopComplete()
  }

  chooseRing(index)
}

function createPie() {
  let startAngle = 0

  let endAngle = 0

  for (let i = 0; i < data.length; i++) {
    const percent = data[i].value / count.value

    startAngle = i === 0 ? 0 : endAngle + 0.0001
    endAngle = endAngle + 2 * Math.PI * percent - 0.0001
    const ring = addRing({
      startAngle,
      endAngle,
      color: new THREE.Color(colors[i % colors.length]),
    })

    ring.name = `ring${i}`
    pieGroup.add(ring)
  }

  scene!.add(pieGroup)
  chooseRing(activeIndex.value, true)
  timer.value = window.setInterval(loopChange, delay)
}

function init() {
  scene = new THREE.Scene()
  initCamera()
  initRenderer()
  initLight()
  initAxes()
  initControls()
  createPlane({
    url: ring2,
    width: 5,
    position: new THREE.Vector3(0, 0, -0.01),
    color: '#00ffff',
  })
  createPlane({
    url: ring3,
    width: 6.5,
    position: new THREE.Vector3(0, 0, -0.02),
    color: '#00ffff',
  })
  createPlane({
    url: ring4,
    width: 5.5,
    position: new THREE.Vector3(0, 0, -0.03),
    animate: true,
    color: '#00ffff',
  })
  createPie()
  loop()
}

function initCamera() {
  const rate = width.value / height.value

  camera = new THREE.PerspectiveCamera(30, rate, 0.1, 1500)
  camera.position.set(6.023813305272227, 4.838542633695233, 6.111272698256137)
  camera.lookAt(0, 0, 0)
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width.value, height.value)
  pieDom.value?.appendChild(renderer.domElement)
}

function initLight() {
  const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 2)

  directionalLight1.position.set(200, 300, 200)
  const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 2)

  directionalLight2.position.set(-200, -300, -200)
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)

  scene!.add(directionalLight1)
  scene!.add(directionalLight2)
  scene!.add(ambientLight)
}

function initAxes() {
  axes = new THREE.AxesHelper(0)
  scene!.add(axes)
}

function initControls() {
  controls = new OrbitControls(camera!, renderer!.domElement)
  controls.maxPolarAngle = Math.PI
  controls.autoRotate = false
  controls.enableDamping = true
  controls.enabled = false
}

function loop() {
  renderer!.setAnimationLoop(() => {
    renderer!.render(scene!, camera!)
    controls && controls.update()
  })
}

// function start() {
//   loop()
//   if (controls) {
//     controls.enabled = true
//   }

//   timer.value = window.setInterval(loopChange, delay)
// }

function stop() {
  if (timer.value) {
    clearInterval(timer.value)
  }

  if (controls) {
    controls.enabled = false
  }

  if (renderer) {
    renderer.setAnimationLoop(null)
  }
}

// function getScene() {
//   return scene
// }

// function getRender() {
//   return renderer
// }

// function resize() {
//   width.value = pieDom.value?.offsetWidth ?? 300
//   height.value = pieDom.value?.offsetHeight ?? 200
//   const aspect = width.value / height.value

//   camera!.aspect = aspect
//   camera!.updateProjectionMatrix()
//   renderer!.setSize(width.value, height.value)
//   renderer!.setPixelRatio(window.devicePixelRatio)
// }

function destroy() {
  if (prevMesh) {
    gsap.set(prevMesh.scale, {
      z: 1,
    })
    gsap.set(prevMesh.material, {
      opacity,
    })
  }

  stop()
  if (renderer) {
    emptyObject(pieGroup)
    renderer.dispose()
    renderer.forceContextLoss()
    controls?.dispose()
    if (pieDom.value) {
      pieDom.value.innerHTML = ''
    }

    scene = null
    camera = null
    renderer = null
    controls = null
    axes = null
  }
}

onMounted(() => {
  width.value = pieDom.value?.offsetWidth ?? 300
  height.value = pieDom.value?.offsetHeight ?? 200
  count.value = data.map(item => item.value).reduce((prev, current) => prev + current, 0)
  init()
})

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }

  destroy()
})

</script>

<template>
  <div
    class="three-pie-wrap relative z-2 h-full w-full"
  >
    <div
      ref="pieDom"
      class="three-pie h-full w-full"
    />

    <div
      class="three-pie-slot pointer-events-none absolute left-0 top-0 h-full w-full flex items-center justify-center"
    >
      <slot
        :data="currentData"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
