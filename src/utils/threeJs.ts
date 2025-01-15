import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import * as THREE from 'three'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('/draco/') // 确保路径正确指向 Draco 解码器文件

/**
 * GLTF加载器并设置解码器
 */
const gltfLoader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)

gltfLoader.setDRACOLoader(dracoLoader)

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

/**
 * TextureLoader实例
 */
const textureLoader = new THREE.TextureLoader()

/**
 *  加载纹理
 * @param url 纹理路径
 * @param onLoad 加载完成回调
 */
export async function loadTexture(url: string, onLoad: (texture: THREE.Texture) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    textureLoader.load(url, (texture) => {
      onLoad(texture)
      resolve()
    }, undefined, error => reject(error))
  })
}
