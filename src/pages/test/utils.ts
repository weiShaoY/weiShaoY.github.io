import { MeshoptDecoder } from 'meshopt-decoder'

import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

export {
  loadModel,
  loadTexture,
}
