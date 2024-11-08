import type {
  Material,

  Mesh,

  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLProgramParametersWithUniforms,
  WebGLRenderer,
} from 'three'

import type CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import type { GLTF } from 'three-stdlib'

import { MeshoptDecoder } from 'meshopt-decoder'

import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { onMounted, watchEffect } from 'vue'

/**
 * 加载 GLTF 模型并添加到场景
 * @param url - 模型文件的路径
 * @param scene - THREE.Scene 对象，用于将加载后的模型添加到场景中
 * @returns 返回加载的模型组或 null（如果加载失败）
 */
function loadModel(url: string, scene: THREE.Scene): THREE.Group | null {
  const loader = new GLTFLoader()

  loader.setMeshoptDecoder(MeshoptDecoder)

  let model: THREE.Group | null = null

  loader.load(
    url,
    (gltf) => {
      model = gltf.scene
      scene.add(model) // 直接添加到场景
    },
    undefined,
    (error) => {
      console.error('加载 GLTF 模型出错:', error)
    },
  )
  return model
}

/**
 * 加载贴图的工具函数
 * @param url - 贴图资源的路径
 * `target.value` 最终会被赋值为加载的 `THREE.Texture` 实例
 */
function loadTexture(url: string, target: { value: THREE.Texture | null }) {
  const textureLoader = new THREE.TextureLoader()

  textureLoader.load(
    url,
    (texture) => {
      target.value = texture
    },
    undefined,
    (error) => {
      console.error('加载贴图资源出错:', error)
    },
  )
}

function printModel(modelParts: Object3D[], modelName = 'modelParts') {
  const strArray = modelParts.map((obj, i) => {
    const row = `const ${obj.name} = ${modelName}[${i}]-${obj.type};`

    return row
  })

  const str = strArray.join('\n')

  console.log(str)
  return str
}

// 扁平化模型
function flatModel(gltf: GLTF) {
  const modelArr: Mesh[] = []

  gltf.scene.traverse((child) => {
    modelArr.push(child as Mesh)
  })
  return modelArr
}

/**
 * 修改 GLTF 模型材质为指定的 CustomShaderMaterial
 * @param {Ref<GLTF | null>} gltf - GLTF 模型引用
 * @param {Ref<CustomShaderMaterial>} mat - 自定义材质引用
 */
function useModifyCSM(gltf: Ref<GLTF | null>, mat: Ref<CustomShaderMaterial>) {
  onMounted(() => {
    if (!gltf.value || !mat.value) {
      return
    }

    gltf.value.scene.traverse((child: Object3D) => {
      const mesh = child as Mesh

      if (mesh.isMesh) {
        mesh.material = mat.value
      }
    })
  })
}

/**
 * 修改 GLTF 模型的材质的 `onBeforeCompile` 回调
 * @param {Ref<GLTF | null>} gltf - GLTF 模型引用
 * @param {Function} onBeforeCompileFn - 自定义的 `onBeforeCompile` 回调函数
 */
function useModifyMaterial(gltf: Ref<GLTF | null>, onBeforeCompileFn: (shader: WebGLProgramParametersWithUniforms) => void) {
  onMounted(() => {
    if (!gltf.value) {
      return
    }

    gltf.value.scene.traverse((child: Object3D) => {
      const mesh = child as Mesh

      if (mesh.isMesh) {
        const mat = mesh.material as Material

        mat.onBeforeCompile = onBeforeCompileFn
      }
    })
  })
}

function useCubeCamera({ resolution = 512 }) {
  const cubeRenderTarget = ref<WebGLCubeRenderTarget | null>(null)

  const cubeCamera = ref<CubeCamera | null>(null)

  onMounted(() => {
    // 创建 CubeRenderTarget
    cubeRenderTarget.value = new WebGLCubeRenderTarget(resolution, {
      format: RGBFormat,
      type: UnsignedByteType,
      generateMipmaps: false,
      minFilter: NearestFilter,
      magFilter: NearestFilter,
    })

    // 创建 CubeCamera
    const near = 0.1

    const far = 1000

    cubeCamera.value = new CubeCamera(near, far, cubeRenderTarget.value)
  })

  // 返回渲染目标和立方体相机
  return {
    fbo: cubeRenderTarget,
    camera: cubeCamera,
  }
}

/**
 * 在 Vue 3 中模拟 React Three Fiber 的 useFrame，同时进行汽车动画处理。
 *
 * @param {object} options - 动画配置选项
 * @param {any} options.uniforms - 用于地面反射的 uniforms
 * @param {any} options.floorUniforms - 用于地面效果的 uniforms
 * @param {object} options.params - 动画参数
 * @param {Object3D} options.cargltf - 车辆的 GLTF 场景对象
 * @param {Object3D[]} options.modelRef - 模型引用，包含车轮等子对象
 * @param {Scene} options.scene - Three.js 场景
 * @param {WebGLRenderer} options.renderer - Three.js 渲染器
 * @param {PerspectiveCamera} options.camera - 立方体相机
 */
function useCarAnimation({
  uniforms,
  floorUniforms,
  params,
  cargltf,
  modelRef,
  scene,
  renderer,
  camera,
}: {
  uniforms: any
  floorUniforms: any
  params: { current: { floorNormalSpeed: number, speedFactor: number } }
  cargltf: { scene: Object3D }
  modelRef: { current: { wheel: Object3D[] } }
  scene: Scene
  renderer: WebGLRenderer
  camera: PerspectiveCamera
}) {
  let animationFrameId: number

  let lastTime = performance.now()

  const animate = () => {
    const currentTime = performance.now()

    const delta = (currentTime - lastTime) / 1000 // 计算 delta（秒）

    lastTime = currentTime

    // 更新时间
    uniforms.uTime.value += delta
    floorUniforms.uTime.value += delta * params.current.floorNormalSpeed * 20

    // 隐藏车模型以避免影响反射效果
    cargltf.scene.visible = false

    // 更新 CubeCamera 的渲染
    camera.update(renderer, scene)

    // 恢复车模型的可见性
    cargltf.scene.visible = true

    // 更新车轮旋转动画
    modelRef.current.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * params.current.speedFactor)
    })

    // 请求下一帧动画
    animationFrameId = requestAnimationFrame(animate)
  }

  // 在 Vue 3 中启动和停止动画循环
  onMounted(() => {
    animationFrameId = requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
  })
}

export {
  flatModel,
  loadModel,
  loadTexture,
  printModel,
  useCarAnimation,
  useCubeCamera,
  useModifyCSM,
  useModifyMaterial,
}
