<script>
import {
  AmbientLight,
  DirectionalLight,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three'

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

const canvasContainer = ref(null)

let scene, camera, renderer, ball, animationId

function handleDoubleClick() {
  window.open(props.url, '_blank', 'noopener,noreferrer')
}

function handlePointerOver() {
  document.body.style.cursor = 'pointer'
}

function handlePointerOut() {
  document.body.style.cursor = 'default'
}

function createBall() {
  // 创建球体几何体
  const geometry = new IcosahedronGeometry(1, 1)

  const material = new MeshStandardMaterial({
    color: '#fff8ef',
    flatShading: true,
  })

  ball = new Mesh(geometry, material)
  ball.scale.set(3, 3, 3)

  // 加载贴图并创建六个面的 Decal
  const loader = new TextureLoader()

  loader.load(props.image, (texture) => {
    const offsets = [
      {
        position: new Vector3(0, 0, 1),
        rotation: [Math.PI * 2, 0, 0],
      },
      {
        position: new Vector3(0, 0, -1),
        rotation: [0, Math.PI, 0],
      },
      {
        position: new Vector3(1, 0, 0),
        rotation: [0, Math.PI / 2, 0],
      },
      {
        position: new Vector3(-1, 0, 0),
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        position: new Vector3(0, 1, 0),
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        position: new Vector3(0, -1, 0),
        rotation: [Math.PI / 2, 0, 0],
      },
    ]

    offsets.forEach(({ position, rotation }) => {
      const decal = new Mesh(
        geometry.clone(),
        new MeshStandardMaterial({
          map: texture,
          transparent: true,
        }),
      )

      decal.position.copy(position)
      decal.rotation.set(...rotation)
      ball.add(decal)
    })
  })

  return ball
}

function initScene() {
  // 创建场景
  scene = new Scene()

  // 创建相机
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // 添加光源
  const ambientLight = new AmbientLight(0xFFFFFF, 2)

  const directionalLight = new DirectionalLight(0xFFFFFF, 2)

  directionalLight.position.set(0, 0, 0.05)

  scene.add(ambientLight, directionalLight)

  // 添加球体
  const ball = createBall()

  scene.add(ball)

  // 初始化渲染器
  renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  canvasContainer.value.appendChild(renderer.domElement)

  // 添加事件监听
  renderer.domElement.addEventListener('pointerover', handlePointerOver)
  renderer.domElement.addEventListener('pointerout', handlePointerOut)

  // 渲染动画
  const animate = () => {
    ball.rotation.y += 0.01
    ball.rotation.x += 0.005
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  animate()
}

onMounted(() => {
  initScene()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer.domElement.removeEventListener('pointerover', handlePointerOver)
  renderer.domElement.removeEventListener('pointerout', handlePointerOut)
  renderer.dispose()
})
</script>

<template>
  <div
    ref="canvasContainer"
    class="h-full w-full overflow-hidden"
    @dblclick="handleDoubleClick"
  />
</template>

<style>

</style>
