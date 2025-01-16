<script lang="ts" setup>
import {
  isMobile,
  loadTexture,
  techStack,
} from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

// 定义技术栈数据
const technologies = [
  techStack.html,
  techStack.css,
  techStack.javaScript,
  techStack.typeScript,
  techStack.node,
  techStack.react,
  techStack.vue,
  techStack.tailwindCss,
  techStack.unocss,
  techStack.threeJs,
  techStack.git,
  techStack.pinia,
]

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

// 获取容器引用
const containerRef = ref<HTMLDivElement | null>(null)

// 定义组件中的场景、相机和渲染器
let scene: THREE.Scene

let camera: THREE.OrthographicCamera

let renderer: THREE.WebGLRenderer

let controls: OrbitControls

let animationFrameId: number

let raycaster: THREE.Raycaster

let mouse: THREE.Vector2

/**
 * 创建二十面体几何体并添加贴图
 */
async function createIcosahedrons() {
  const geometry = new THREE.IcosahedronGeometry(1, 2)

  /**
   *  每行的列数
   */
  const numColumns = isMobile ? 4 : 6

  const numRows = Math.ceil(technologies.length / numColumns) // 行数

  const spacing = 3 // 间距

  for (let i = 0; i < technologies.length; i++) {
    const tech = technologies[i]

    await loadTexture(tech.image, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace

      const baseMaterial = new THREE.MeshStandardMaterial({

        /**
         * color: 材质的基本颜色，这里设置为浅米色（#fff8ef）。
         * 如果提供了贴图 (map)，颜色会与贴图混合。
         */
        color: '#fff8ef',

        /**
         * polygonOffset: 启用多边形偏移，避免深度冲突（z-fighting）。
         * 默认为 false，这里设置为 true 以开启功能。
         */
        polygonOffset: true,

        /**
         * polygonOffsetFactor: 多边形偏移因子，决定偏移强度。
         * 设置为 -5，确保多边形的深度值减小，从而更好地控制叠加效果。
         */
        polygonOffsetFactor: 2,

        /**
         * flatShading: 是否使用平面着色。
         * 设置为 true，以生成平滑边缘的低多边形外观。
         */
        flatShading: true,

      })

      const mesh = new THREE.Mesh(geometry, baseMaterial)

      // 计算行列索引
      const row = Math.floor(i / numColumns)

      const col = i % numColumns

      // 计算中心对称位置
      const x = (col - (numColumns - 1) / 2) * spacing

      const y = (row - (numRows - 1) / 2) * -spacing

      mesh.position.set(x, y, 0)
      mesh.userData.rotationSpeed = {
        x: Math.random() * 0.02,
        y: Math.random() * 0.02,
      }
      mesh.userData.tech = tech

      const decalPositions = [
        {
          position: new THREE.Vector3(0, 0, 1),
          direction: new THREE.Euler(0, 0, 0),
        },
        {
          position: new THREE.Vector3(0, 0, -1),
          direction: new THREE.Euler(0, Math.PI, 0),
        },
        {
          position: new THREE.Vector3(-1, 0, 0),
          direction: new THREE.Euler(0, -Math.PI / 2, 0),
        },
        {
          position: new THREE.Vector3(1, 0, 0),
          direction: new THREE.Euler(0, Math.PI / 2, 0),
        },
        {
          position: new THREE.Vector3(0, 1, 0),
          direction: new THREE.Euler(-Math.PI / 2, 0, 0),
        },
        {
          position: new THREE.Vector3(0, -1, 0),
          direction: new THREE.Euler(Math.PI / 2, 0, 0),
        },
      ]

      const decalMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
      })

      decalPositions.forEach(({ position, direction }) => {
        const decal = new THREE.Mesh(
          new DecalGeometry(mesh, position, direction, new THREE.Vector3(1, 1, 1)),
          decalMaterial,
        )

        mesh.add(decal)
      })

      scene.add(mesh)
    })
  }
}

/**
 * 动画更新函数
 */
function animate() {
  animationFrameId = requestAnimationFrame(animate)
  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const { rotationSpeed } = child.userData

      if (rotationSpeed) {
        child.rotation.x += rotationSpeed.x
        child.rotation.y += rotationSpeed.y
      }
    }
  })

  controls.update()
  renderer.render(scene, camera)
}

/**
 * 处理鼠标点击事件
 */
function handleDoubleClick(event: MouseEvent) {
  if (!containerRef.value) {
    return
  }

  // 计算鼠标在屏幕上的位置
  const rect = containerRef.value.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // 使用Raycaster检测点击的物体
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object as THREE.Mesh

    const tech = intersectedObject.userData.tech

    // 打开链接
    window.open(tech.document, '_blank', 'noopener,noreferrer')
  }
}

onMounted(() => {
  if (!containerRef.value) {
    return
  }

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  const aspect = containerRef.value.offsetWidth / containerRef.value.offsetHeight

  const d = isMobile ? 6 : 5 // 设置视锥体的大小

  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000)
  camera.zoom = 1.4 // 调整zoom属性，放大视图
  camera.updateProjectionMatrix()

  camera.position.set(0, 0, 10)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: containerRef.value,
    antialias: true,
  })
  renderer.setSize(containerRef.value.offsetWidth, containerRef.value.offsetHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // 创建光源
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(5, 5, 5)
  scene.add(ambientLight, directionalLight)

  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  controls.enableZoom = false

  // 创建Raycaster和鼠标向量
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // 添加二十面体
  createIcosahedrons()

  // 添加鼠标点击事件监听
  containerRef.value.addEventListener('dblclick', handleDoubleClick)

  // 开始动画
  animate()

  // 响应窗口大小调整
  const handleResize = () => {
    if (!containerRef.value) {
      return
    }

    const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight

    camera.left = -d * aspect
    camera.right = d * aspect
    camera.top = d
    camera.bottom = -d
    camera.updateProjectionMatrix()
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  }

  window.addEventListener('resize', handleResize)

  isLoading.value = false

  // 清理函数
  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
    renderer.dispose()
    window.removeEventListener('resize', handleResize)
    containerRef.value?.removeEventListener('click', handleDoubleClick)
    scene.clear()
  })
})
</script>

<template>
  <canvas
    ref="containerRef"
    v-canvas-loading="{
      isLoading,
      size: 80,
    }"

    class="cursor-pointer !h-full !w-full"
  />
</template>
