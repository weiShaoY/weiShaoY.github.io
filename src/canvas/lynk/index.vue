<script setup lang="ts">

import { isMobile } from '@/utils'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const imageUrl = 'https://api.lolimi.cn/API/dmtx/api.php' // 替换为实际的纹理 URL

const desktopRef = ref<(HTMLCanvasElement | null)>()

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
 *  模型
 */
let model: THREE.Group

// 定义模型文件路径
const GLBs = [
  {
    name: 'EXT',
    path: '/models/lynkco09/model/Lynkco09_EXT_d.glb',
  },
  {
    name: 'INT',
    path: '/models/lynkco09/model/Lynkco09_INT_d.glb',
  },
  {
    name: 'Sunproof',
    path: '/models/lynkco09/model/Lynkco09_Sunproof_d.glb',
  },
  {
    name: 'Trunk',
    path: '/models/lynkco09/model/Lynkco09_Trunk_d.glb',
  },
  {
    name: 'Tires',
    path: '/models/lynkco09/model/Lynkco09_Tires_d.glb',
  },
  {
    name: 'LBDoor',
    path: '/models/lynkco09/model/Lynkco09_LBDoor_d.glb',
  },
  {
    name: 'LFDoor',
    path: '/models/lynkco09/model/Lynkco09_LFDoor_d.glb',
  },
  {
    name: 'RFDoor',
    path: '/models/lynkco09/model/Lynkco09_RFDoor_d.glb',
  },
  {
    name: 'RBDoor',
    path: '/models/lynkco09/model/Lynkco09_RBDoor_d.glb',
  },
]

// 动画集合
const tweenCollection = {
  LBDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  RBDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  LFDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  RFDoor: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
  Trunk: {
    tween: null,
    from: {
      value: null,
    },
    to: {
      value: null,
    },
  },
}

// 定义缓动函数
function easeOutCirc(x) {
  return Math.sqrt(1 - (x - 1) ** 4)
}

function pickupObjects(event) {
  const container = refContainer.value

  if (container) {
    const scW = container.clientWidth

    const scH = container.clientHeight

    const offsetLeft = container.offsetLeft

    const offsetTop = container.offsetTop

    const mouse = new THREE.Vector2()

    mouse.x = ((event.clientX - offsetLeft) / scW) * 2 - 1
    mouse.y = -((event.clientY - offsetTop) / scH) * 2 + 1

    const raycaster = new THREE.Raycaster()

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
      if (intersects[0].object.name.includes('Door') || intersects[0].object.name.includes('Trunk')) {
        const doorName = intersects[0].object.name.split('_')[0]

        const door = models.find(item => item.name === doorName)

        if (door && door.outer && door.status) {
          setupTweenDoor(door, door.status)
        }
      }

      if (intersects[0].object.name.includes('INT')) {
        controls.autoRotate = false
        const INT = models.find(item => item.name === 'INT')

        setupTweenCarIn(INT)
      }
    }
  }
}

function setupTweenDoor(door, status) {
  const { from, to } = door.rotateDirection[status]

  if (status === 'open') {
    door.status = 'close'
  }

  if (status === 'close') {
    door.status = 'open'
  }

  let lastLocation = null

  if (tweenCollection[door.name].tween) {
    lastLocation = {
      value: tweenCollection[door.name].from.value,
    }
    tweenCollection[door.name].tween.stop()
  }
  else {
    lastLocation = {
      value: from.value,
    }
  }

  tweenCollection[door.name].tween = new TWEEN.Tween(lastLocation)
    .to(to, 1000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate((lastLocation) => {
      door.outer.rotation[door.rotateDirection.rotateAxis] = THREE.MathUtils.degToRad(lastLocation.value)
      tweenCollection[door.name].from.value = lastLocation.value
    })
    .onComplete(() => {
      tweenCollection[door.name] = {
        tween: null,
        from: {
          value: null,
        },
        to: {
          value: null,
        },
      }
    })
    .start()
}

function setupTweenCarIn(model) {
  const { x: cx, y: cy, z: cz } = camera.position

  const { x: tocx, y: tocy, z: tocz } = model.carInCameraPosition

  setupTweenCamera(
    {
      cx,
      cy,
      cz,
      ox: 0,
      oy: 0,
      oz: 0,
    },
    {
      cx: tocx,
      cy: tocy,
      cz: tocz,
      ox: 0,
      oy: tocy,
      oz: 0.1,
    },
  )

  function setupTweenCamera(source, target) {
    const carTween = new TWEEN.Tween(source)
      .to(target, 2000)
      .easing(three.Easing.Quadratic.Out)

    carTween.onUpdate((that) => {
      camera.position.set(that.cx, that.cy, that.cz)
      controls.target.set(that.ox, that.oy, that.oz)
    })
    carTween.start()
  }
}

/**
 * 添加光源
 */
function addLights() {
  /**
   *  环境光
   */
  const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 3)

  scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xFFFFFF, 1)

  scene.add(pointLight)

  const spotLight = new THREE.SpotLight(0xFFFFFF, 1)

  spotLight.position.set(-20, 50, 10)
  spotLight.angle = 0.12
  spotLight.penumbra = 1
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024

  scene.add(spotLight)
}

/**
 *  添加轨道
 */
function addOrbitControls() {
  controls = new OrbitControls(camera, renderer.domElement)

  // 禁用缩放
  controls.enableZoom = false

  // 禁用平移
  controls.enablePan = false

  // 限制旋转范围
  controls.maxPolarAngle = Math.PI / 2

  // 限制旋转范围
  controls.minPolarAngle = Math.PI / 2

  // 启用阻尼
  controls.enableDamping = true
}

/**
 * 加载 3D 模型
 */
function addModel() {
  const loader = new GLTFLoader()

  loader.load(
    '/models/desktop/index.gltf',
    (gltf) => {
      model = gltf.scene

      // 根据设备调整模型属性
      const position: [number, number, number] = isMobile ? [-2.5, -3, -1.5] : [0, -5, -1.5]

      const scale = isMobile ? 0.4 : 1

      model.position.set(...position)

      model.rotation.set(-0.01, -0.2, -0.1)

      model.scale.set(scale, scale, scale)

      scene.add(model)
    },
    undefined,
    (error) => {
      console.error('模型加载失败:', error)
    },
  )
}

/**
 * 初始化 Three.js 场景
 */
function initThree(canvas: HTMLCanvasElement) {
  scene = new THREE.Scene()

  // 设置场景背景透明
  scene.background = null

  camera = new THREE.PerspectiveCamera(

    // 视角

    45,

    // 宽高比
    canvas.offsetWidth / canvas.offsetHeight,

    // 近裁剪面
    0.1,

    // 远裁剪面
    1000,
  )

  // 设置相机的位置
  camera.position.set(20, 3, 5)

  /**
   *  创建渲染器，开启 alpha 通道支持透明背景
   */
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: false,
    alpha: true,
  })

  // 设置渲染器的尺寸
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

  //  设置像素比 (如果设备支持高像素比，则设置渲染器的像素比为 devicePixelRatio，使画面更加清晰)
  renderer.setPixelRatio(window.devicePixelRatio || 1)

  // 启用阴影
  renderer.shadowMap.enabled = true

  // 添加光源
  addLights()

  // 添加轨道控制器
  addOrbitControls()

  // 加载模型
  addModel()

  // 监听窗口大小调整事件
  window.addEventListener('resize', onWindowResize)

  /**
   * 渲染循环
   */
  function animate() {
    requestAnimationFrame(animate)
    controls?.update()
    renderer.render(scene, camera)
  }

  animate()
}

/**
 * 处理窗口大小调整
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (desktopRef.value) {
    initThree(desktopRef.value)
  }
})

onUnmounted(() => {
  renderer.dispose()
  controls.dispose()
  window.removeEventListener('resize', onWindowResize)
})

</script>

<template>
  <canvas
    ref="desktopRef"
    class="overflow-hidden !h-full !w-full"
  />
</template>
