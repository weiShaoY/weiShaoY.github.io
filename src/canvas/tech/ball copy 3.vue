<script lang="ts" setup>
import * as THREE from 'three'

import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { onMounted, ref } from 'vue'

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

  /**
   *  加载纹理贴图
   */
  const textureLoader = new THREE.TextureLoader()

  textureLoader.load(props.image, (texture) => {
    /**
     *  创建20面体
     */
    const geometry = new THREE.IcosahedronGeometry(1, 1)

    /**
     *  材质
     */
    const material = new THREE.MeshStandardMaterial({
      // map: texture,
      flatShading: true,

      // color: '#22C55E',
    })

    /**
     *  创建球体网格
     */
    const ball = new THREE.Mesh(geometry, material)

    ball.castShadow = true

    ball.receiveShadow = true

    ball.scale.set(3, 3, 3)

    scene.add(ball)

    // const decal = new DecalGeometry(ball, new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1))

    // const decalMaterial = new THREE.MeshBasicMaterial({
    //   map: texture,

    //   transparent: true,
    // })

    // const mesh1 = new THREE.Mesh(decal, decalMaterial)

    // ball.attach(mesh1)
    const decal = new DecalGeometry(
      new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshPhongMaterial({
        specular: 0x111111,
        map: texture,
        shininess: 25,
      })), // 目标网格
      new THREE.Vector3(0, 0, 1), // 投射位置（例如，Z轴上的点）
      new THREE.Vector3(0, 0, -1), // 投射方向（例如，从正Z轴向负Z轴）
      new THREE.Vector3(1, 1, 1), // 尺寸（例如，贴花的宽、高、深）
    )

    const decalMaterial = new THREE.MeshPhongMaterial({
      specular: 0x444444,
      map: texture,
      normalScale: new THREE.Vector2(1, 1),
      shininess: 30,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      wireframe: false,
    })

    const mesh1 = new THREE.Mesh(decal, decalMaterial)

    mesh1.scale.set(5, 5, 5)

    const box = new THREE.BoxHelper(mesh1, 0xFFFF00)

    scene.add(box)

    // 确保贴花正确添加到球体
    ball.attach(mesh1)
    scene.add(ball)

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

    /**
     * 渲染循环，更新球体旋转和控制器状态
     */
    const animate = () => {
      requestAnimationFrame(animate)
      ball.rotation.x += 0.005
      ball.rotation.y += 0.005
      controls.update() // 更新控制器状态
      renderer.render(scene, camera)
    }

    animate()
  })
}

// 在组件挂载时初始化场景
onMounted(createBallScene)
</script>

<template>
  <div
    ref="canvasContainer"
    class="h-full w-full"
  />
</template>

<style lang="less" scoped>

</style>
