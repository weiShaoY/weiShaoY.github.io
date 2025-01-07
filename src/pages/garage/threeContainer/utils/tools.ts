// useModifyMaterial.ts

import type {
  Material,
  Mesh,
  Object3D,
  WebGLProgramParameters,
} from 'three'

import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import type CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { onMounted } from 'vue'

/**
 * 修改GLTF模型中的材质为自定义着色器材质
 * @param {GLTF} gltf - GLTF模型对象
 * @param {CustomShaderMaterial} mat - 自定义着色器材质
 */
export function useModifyCSM(gltf: GLTF, mat: CustomShaderMaterial) {
  onMounted(() => {
    gltf.scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh

        mesh.material = mat
      }
    })
  })
}

/**
 * 修改GLTF模型中的材质的onBeforeCompile回调函数
 * @param {GLTF} gltf - GLTF模型对象
 * @param {(shader: WebGLProgramParameters) => void} onBeforeCompileFn - 用于修改着色器的回调函数
 */
export function useModifyMaterial(gltf: GLTF, onBeforeCompileFn: (shader: WebGLProgramParameters) => void) {
  onMounted(() => {
    gltf.scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh

        const mat = mesh.material as Material

        mat.onBeforeCompile = onBeforeCompileFn
      }
    })
  })
}
