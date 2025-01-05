import type { Object3D } from 'three'

import type * as THREE from 'three'

/**
 * 打印扁平模型的所有部分
 * @param {Object3D[]} modelParts - 扁平化后的模型数组
 * @param {string} modelName - 模型名称，用于生成打印代码
 * @returns {string} 打印结果字符串
 */
function printModel(modelParts: Object3D[], modelName = 'modelParts') {
  const strArray = modelParts.map((obj, i) => {
    const row = `const ${obj.name || `part${i}`} = ${modelName}[${i}]-${obj.type};`

    return row
  })

  const str = strArray.join('\n')

  console.log(str)
  return str
}

/**
 * 扁平化模型，提取所有 Mesh 对象
 */
function flatModel(gltf: any) {
  const modelArr: THREE.Mesh[] = []

  gltf.scene.traverse((child: any) => {
    modelArr.push(child as THREE.Mesh)
  })
  return modelArr
}

export {
  flatModel,
  printModel,
}
