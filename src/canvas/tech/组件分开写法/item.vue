<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import * as THREE from 'three'

import { DecalGeometry, OrbitControls } from 'three/addons'

import { loadTexture } from '@/utils'

const props = defineProps({
  /**
   * 图标 - 用于球体贴图的纹理路径
   * @type {string}
   */
  imageUrl: {
    type: String,
    required: true,
  },

  /**
   * 跳转地址
   * @type {string}
   */
  document: {
    type: String,
    default: '',
  },
})

/**
 *  是否显示加载loading
 */
const isLoading = ref(true)

const itemRef = ref<(HTMLCanvasElement | null)>()

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

/**
 *  网格
 */
let mesh: THREE.Mesh

/**
 *  双击事件
 */
function handleDoubleClick(event: MouseEvent) {
  // 阻止事件冒泡
  event.stopPropagation()

  // 打开链接
  window.open(props.document, '_blank', 'noopener,noreferrer')
}

/**
 * 添加光源
 */
function addLights() {
  /**
   *  环境光
   */
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)

  /**
   *  平行光
   */
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2)

  // 设置平行光位置
  directionalLight.position.set(0, 0, 0.05)

  // 将光源添加到场景
  scene.add(ambientLight, directionalLight)
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  /**
   *  创建轨道控制器
   */
  controls = new OrbitControls(camera, renderer.domElement)

  // 禁用缩放
  controls.enableZoom = false

  // 启用阻尼
  controls.enableDamping = true
}

/**
 *  添加模型
 */
async function addModel() {
  // 创建球体几何体 半径为1，细分等级为1
  const geometry = new THREE.IcosahedronGeometry(1, 2)

  // 加载纹理
  await loadTexture (props.imageUrl, (texture) => {
    // 设置纹理颜色空间
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

    /**
     *  创建球体网格对象，并添加到场景中。
     */
    mesh = new THREE.Mesh(geometry, baseMaterial)

    mesh.scale.set(3, 3, 3)

    // 将球体添加到场景中
    scene.add(mesh)

    // 定义贴图位置和方向
    const decalPositions = [

      //   正面
      {
        position: new THREE.Vector3(0, 0, 1),
        direction: new THREE.Euler(Math.PI * 2, 0, 0),
      },

      //   背面
      {
        position: new THREE.Vector3(0, 0, -1),
        direction: new THREE.Euler(0, Math.PI, 0),
      },

      //   左侧
      {
        position: new THREE.Vector3(-1, 0, 0),
        direction: new THREE.Euler(0, -Math.PI / 2, 0),
      },

      //   右侧
      {
        position: new THREE.Vector3(1, 0, 0),
        direction: new THREE.Euler(0, Math.PI / 2, 0),
      },

      //   顶部
      {
        position: new THREE.Vector3(0, 1, 0),
        direction: new THREE.Euler(-Math.PI / 2, 0, 0),
      },

      //   底部
      {
        position: new THREE.Vector3(0, -1, 0),
        direction: new THREE.Euler(Math.PI / 2, 0, 0),
      },
    ]

    // 创建材质
    const decalMaterial = new THREE.MeshBasicMaterial({
      map: texture, // 使用贴图
      transparent: true, // 贴图透明
      depthTest: true, // 启用深度测试

    })

    // 遍历位置数组创建贴图
    decalPositions.forEach(({ position, direction }) => {
      const decal = new THREE.Mesh(
        new DecalGeometry(
          mesh, // 球体网格对象
          position, // 贴图位置
          direction, // 贴图方向
          new THREE.Vector3(1, 1, 1), // 缩放比例
        ),
        decalMaterial, // 使用相同材质
      )

      mesh.add(decal) // 添加贴图到球体
    })
  })
}

onMounted(async () => {
  if (!itemRef.value) {
    return
  }

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(

    // 视角
    75,

    // 宽高比
    itemRef.value.offsetWidth / itemRef.value.offsetHeight,

    // 近裁剪面
    0.1,

    // 远裁剪面
    1000,
  )

  camera.position.set(0, 0, 5)

  /**
   *  创建 WebGL 渲染器
   */
  renderer = new THREE.WebGLRenderer({
    canvas: itemRef.value,

    // 开启抗锯齿
    antialias: true,

    // 保留绘图缓冲区
    preserveDrawingBuffer: true,
  })

  renderer.shadowMap.enabled = true

  // 设置设备像素比
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // 设置渲染器的尺寸
  renderer.setSize(itemRef.value.offsetWidth, itemRef.value.offsetHeight)

  addLights()

  addOrbitControls()

  await addModel().finally(() => {
    isLoading.value = false
  })

  /**
   *  动画循环函数
   */
  function animate() {
    requestAnimationFrame(animate)
    controls.update()

    // 旋转模型
    if (mesh) {
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01
    }

    renderer.render(scene, camera)
  }

  // 开始动画
  animate()
})

onUnmounted(() => {
  renderer.dispose()
  controls.dispose()
})

</script>

<template>
  <canvas
    ref="itemRef"
    v-canvas-loading="isLoading"
    class="cursor-pointer !h-full !w-full"
    @dblclick="handleDoubleClick"
  />
</template>

<style lang="scss" scoped>

</style>
