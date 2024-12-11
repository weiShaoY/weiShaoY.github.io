<script setup lang="ts">
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import {
  onBeforeUnmount,
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

const threeContainer = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene

let camera: THREE.PerspectiveCamera

let renderer: THREE.WebGLRenderer

let controls: OrbitControls

let mesh: THREE.Mesh

const decals: THREE.Sprite[] = []

function initThree() {
  if (!threeContainer.value) { return }

  // 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xEEEEEE)

  // 相机
  camera = new THREE.PerspectiveCamera(75, threeContainer.value.clientWidth / threeContainer.value.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // 渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  threeContainer.value.appendChild(renderer.domElement)

  // 控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25
  controls.screenSpacePanning = false
  controls.maxPolarAngle = Math.PI / 2

  // 灯光
  const ambientLight = new THREE.AmbientLight(0x404040) // soft white light

  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 0, 0.05).normalize()
  scene.add(directionalLight)

  // 几何体和材质
  const geometry = new THREE.IcosahedronGeometry(1, 1)

  const material = new THREE.MeshStandardMaterial({
    color: 0xFFF8EF,
    flatShading: true,
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // 纹理贴图映射到- -个矩形平面上
  const geometry1 = new THREE.PlaneGeometry(256, 256) // 矩形平面

  // 贴图（Decal）
  const loader = new THREE.TextureLoader()

  loader.load(props.image, (texture) => {
    const material = new THREE.MeshStandardMaterial({
    // 设置颜色纹理贴图: Textur e对象作为材质map属性的属性值
      map: texture, // 设置 颜色贴图属性值
    }) // 材质对象Material

    const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh

    scene.add(mesh) // 网格模型添加到场景中

    // const spriteMaterial = new THREE.SpriteMaterial({
    //   map: texture,
    // })

    // const spriteSize = 2 // 调整贴图大小

    // for (let i = 0; i < 6; i++) {
    //   const sprite = new THREE.Sprite(spriteMaterial)

    //   sprite.scale.set(spriteSize, spriteSize, 1)

    //   // 根据方向设置位置和旋转
    //   switch (i) {
    //     case 0: // 正面
    //       sprite.position.set(0, 0, 1)
    //       sprite.rotation.y = Math.PI * 2
    //       break
    //     case 1: // 背面
    //       sprite.position.set(0, 0, -1)
    //       sprite.rotation.y = Math.PI
    //       break
    //     case 2: // 右侧
    //       sprite.position.set(1, 0, 0)
    //       sprite.rotation.y = Math.PI / 2
    //       break
    //     case 3: // 左侧
    //       sprite.position.set(-1, 0, 0)
    //       sprite.rotation.y = -Math.PI / 2
    //       break
    //     case 4: // 顶部
    //       sprite.position.set(0, 1, 0)
    //       sprite.rotation.x = -Math.PI / 2
    //       break
    //     case 5: // 底部
    //       sprite.position.set(0, -1, 0)
    //       sprite.rotation.x = Math.PI / 2
    //       break
    //   }

    //   scene.add(sprite)
    //   decals.push(sprite)
    // }
    // 创建DecalGeometry，并将贴图应用到几何体表面
  })

  // 交互
  const raycaster = new THREE.Raycaster()

  const mouse = new THREE.Vector2()

  function onMouseMove(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  function onDoubleClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    // 这里你可以添加打开URL的逻辑，但Vue中通常不直接在DOM事件中处理路由，而是使用Vue Router
    // 例如: window.open('your-url', '_blank', 'noopener,noreferrer');
  }

  function onPointerOver() {
    document.body.style.cursor = 'pointer'
  }

  function onPointerOut() {
    document.body.style.cursor = 'default'
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('dblclick', onDoubleClick)

  // 添加鼠标事件监听器到mesh（注意：Three.js的Mesh对象不直接支持事件监听，需要通过其他方式实现，如Raycaster）
  const intersectObjects = (objects: THREE.Object3D[], recursive: boolean = true) => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objects, recursive)

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object

      if (intersectedObject === mesh) {
        onPointerOver()
      }
    }
    else {
      onPointerOut()
    }
  }

  // 动画循环
  const animate = () => {
    requestAnimationFrame(animate)

    // 更新控制器
    controls.update()

    // 检测鼠标与mesh的交互
    intersectObjects(scene.children)

    // 渲染场景
    renderer.render(scene, camera)
  }

  animate()
}

onMounted(() => {
  initThree()
})

onBeforeUnmount(() => {
  // 清理资源
  renderer.dispose()
  scene.dispose()

  // 其他需要清理的资源...
})
</script>

<template>
  <div
    ref="threeContainer"
    class="h-full w-full overflow-hidden"
  />
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh; /* 或其他你需要的尺寸 */
  overflow: hidden;
}
</style>
