import type * as THREE from 'three'

/**
 * 打印扁平模型的所有部分
 * @param  modelParts - 扁平化后的模型数组
 * @param  modelName - 模型名称，用于生成打印代码
 * @returns  打印结果字符串
 */
function printModel(modelParts: THREE.Object3D[], modelName = 'modelParts') {
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
