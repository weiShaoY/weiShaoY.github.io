<script lang="ts" setup>
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import {
  nextTick,
  onMounted,
  ref,
} from 'vue'

// 定义组件属性
const props = defineProps({
  /**
   * 图标 - 用于球体贴图的纹理路径
   * @type {string}
   */
  image: {
    type: String,
    required: true,
  },

  /**
   * 跳转地址
   * @type {string}
   */
  url: {
    type: String,
    default: '',
  },
})

// 引用用于挂载 Canvas 的容器
const canvasContainer = ref<HTMLDivElement | null>(null)

/**
 * 创建并初始化 Three.js 场景，设置球体纹理、灯光、控制器等
 * 仅在 canvasContainer 存在时执行
 */
function createBallScene() {
  if (!canvasContainer.value) {
    return
  }

  /**
   *  初始化 Three.js 场景
   */
  const scene = new THREE.Scene()

  /**
   *  初始化 Three.js 相机
   */
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000,
  )

  camera.position.z = 5

  /**
   *  初始化 Three.js 渲染器
   */
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })

  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  )
  canvasContainer.value.appendChild(renderer.domElement)

  /**
   *  环境光
   */
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)

  scene.add(ambientLight)

  /**
   *  定向光
   */
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 0, 0.05)

  scene.add(directionalLight)

  // 创建 20 面体几何体
  const icosahedron = new THREE.IcosahedronGeometry(1, 1)

  const image = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(props.image),
  })

  const cubeG = new THREE.BoxGeometry(1, 1, 1)

  const cube = new THREE.Mesh(cubeG, [image, image, image, image, image, image])

  scene.add(cube)

  // 设置交互事件
  /**
   * 双击事件，跳转到指定 URL
   * @param {MouseEvent} event 鼠标事件对象
   */
  renderer.domElement.addEventListener('dblclick', (event: MouseEvent) => {
    event.stopPropagation()
    if (props.url) {
      window.open(props.url, '_blank', 'noopener,noreferrer')
    }
  })

  /**
   *  设置 OrbitControls 以启用鼠标控制
   */
  const controls = new OrbitControls(camera, renderer.domElement)

  controls.enableDamping = true // 开启惯性效果
  controls.dampingFactor = 0.05 // 调整惯性阻尼
  controls.rotateSpeed = 0.8 // 控制旋转速度

  // 动画循环，更新场景并渲染
  const animate = () => {
    requestAnimationFrame(animate)

    // 更新控制器状态
    controls.update()

    // 渲染场景
    renderer.render(scene, camera)
  }

  animate() // 启动动画循环
}

// 在组件挂载时初始化场景
onMounted(() => {
  nextTick(createBallScene)
})
</script>

<template>
  <div
    ref="canvasContainer"
    class="h-full w-full overflow-hidden"
  />
</template>

<style lang="less" scoped></style>
