import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * GLTF加载器并设置解码器
 */
const gltfLoader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)

/**
 *  加载模型
 * @param url 模型路径
 * @param onLoad 加载完成回调
 */
export async function loadGLTFModel(url: string, onLoad: (gltf: GLTF) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    gltfLoader.load(url, (gltf) => {
      onLoad(gltf)
      resolve()
    }, undefined, error => reject(error))
  })
}
