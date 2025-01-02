<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

// 引入 Three.js 核心库
import * as THREE from 'three'

// 引入轨道控制器，用于交互控制
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 引入 DecalGeometry，用于创建贴图几何体
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry'

// 定义组件属性
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
  url: {
    type: String,
    default: '',
  },
})

/**
 *  定义一个响应式数组，用于存储 canvas 元素的引用
 */
const test = ref<(HTMLCanvasElement | null)>()

/**
 * 创建一个 3D 球体并应用 Decal 贴图
 * @param canvas HTMLCanvasElement - 渲染的目标画布
 * @param imageUrl string - 用于贴图的图像 URL
 * @param url string - 双击打开的链接
 */
function createBallWithDecal(canvas: HTMLCanvasElement, imageUrl: string, url: string) {
  /**
   *  创建一个场景对象
   */
  const scene = new THREE.Scene()

  /**
   *  创建一个透视相机
   */
  const camera = new THREE.PerspectiveCamera(

    // 视角
    75,

    // 宽高比
    canvas.offsetWidth / canvas.offsetHeight,

    // 近裁剪面
    0.1,

    // 远裁剪面
    1000,
  )

  camera.position.z = 5 // 设置相机的位置

  /**
   *  创建 WebGL 渲染器
   */
  const renderer = new THREE.WebGLRenderer({
    canvas, // 指定渲染的 canvas
    antialias: true, // 开启抗锯齿
    preserveDrawingBuffer: true, // 保留绘图缓冲区
  })

  renderer.shadowMap.enabled = true

  // 设置设备像素比
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // 设置渲染器的尺寸
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

  /**
   *  创建一个球体几何体
   */
  const geometry = new THREE.IcosahedronGeometry(1, 2) // 半径为1，细分等级为1

  /**
   *  加载纹理
   */
  const textureLoader = new THREE.TextureLoader()

  textureLoader.load(
    imageUrl, // 纹理图片的路径
    (texture) => {
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
      const mesh = new THREE.Mesh(geometry, baseMaterial)

      // mesh.castShadow = true

      // mesh.receiveShadow = true

      mesh.scale.set(3, 3, 3)

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

      // 将球体添加到场景中
      scene.add(mesh)

      // ///////////////////////////////////////////////////
      /**
       *  环境光
       */
      const ambientLight = new THREE.AmbientLight()

      ambientLight.intensity = 2

      // ambientLight.castShadow = true

      /**
       *  平行光
       */
      const directionalLight = new THREE.DirectionalLight()

      // 设置平行光位置
      directionalLight.position.set(0, 0, 0.05)

      // directionalLight.castShadow = true

      // 将光源添加到场景
      scene.add(ambientLight, directionalLight)

      // renderer.toneMapping = THREE.ACESFilmicToneMapping

      // 创建轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement)

      // 禁用缩放
      controls.enableZoom = false

      // 定义事件处理函数
      const handleDoubleClick = (event: MouseEvent) => {
        // 阻止事件冒泡
        event.stopPropagation()

        // 打开链接
        window.open(url, '_blank', 'noopener,noreferrer')
      }

      // 鼠标悬停时设置为指针
      const handlePointerOver = () => {
        document.body.style.cursor = 'pointer'
      }

      // 鼠标移出时恢复默认样式
      const handlePointerOut = () => {
        document.body.style.cursor = 'default'
      }

      // 绑定事件监听
      canvas.addEventListener('dblclick', handleDoubleClick)
      canvas.addEventListener('pointerover', handlePointerOver)
      canvas.addEventListener('pointerout', handlePointerOut)

      /**
       *  动画循环函数
       */
      const animate = () => {
        requestAnimationFrame(animate) // 请求下一帧动画
        // ball.rotation.x += 0.01 // 旋转球体
        // ball.rotation.y += 0.01
        renderer.render(scene, camera) // 渲染场景
      }

      // 开始动画
      animate()
    },
    undefined, // 加载进度回调（可选）
    (error) => {
      console.error('纹理加载失败:', error) // 加载失败时打印错误
    },
  )
}

// 在组件挂载时执行
onMounted(async () => {
  await nextTick() // 确保 DOM 已更新

  if (test.value) {
    createBallWithDecal(test.value, props.imageUrl, props.url)
  }
})

</script>

<template>
  <canvas
    ref="test"
    :style="{ width: '100%', height: '100%' }"
  />
</template>

<style lang="less" scoped>

</style>
