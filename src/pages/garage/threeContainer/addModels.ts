import type * as THREE from 'three'

import type { ThreeContainerType } from './types'

import * as three from 'three'

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import floorFrag from './shaders/sketch/floorfrag.glsl'

import floorVertex from './shaders/sketch/floorver.glsl'

import fragmentShader from './shaders/sketch/fragment.glsl'

import vertexShader from './shaders/sketch/vertex.glsl'

import { flatModel, useModifyCSM } from './utils'

export function addModels(
  scene: THREE.Scene,
  modelRef: Ref<ThreeContainerType.ModelRefType>,
  maps: Ref<ThreeContainerType.MapsType>,
  uniforms: Ref<ThreeContainerType.UniformsType>,
  floorUniforms: Ref<ThreeContainerType.FloorUniformsType>,
  carGltf: Ref<ThreeContainerType.carGltfType>,
) {
  const gltfLoader = new GLTFLoader()

  // 设置模型加载器的解码器
  gltfLoader.setMeshoptDecoder(MeshoptDecoder)

  gltfLoader.load('/models/garage/models/sm_car.gltf', (gltf) => {
    carGltf.value = gltf
    console.log('%c Line:40 🍆 carGltf', 'color:#7f2b82', carGltf)

    const modelParts = flatModel(gltf)

    /**
     *  车身部分
     */
    const body = modelParts.find(part => part.name === 'body') as THREE.Mesh

    /**
     *  车身材质
     */
    const bodyMat = body.material as THREE.MeshStandardMaterial

    //  设置车身材质的环境强度
    bodyMat.envMapIntensity = 5

    //  设置车身颜色
    bodyMat.color = new three.Color('#26d6e9')

    modelParts.forEach((item: THREE.Mesh) => {
      if (item.isMesh) {
        const mat = item.material as THREE.MeshStandardMaterial

        //  设置材质的AO贴图
        mat.aoMap = maps.value.carAo
      }
    })

    /**
     *  获取轮子部分
     */
    const wheel = modelParts[35] as THREE.Mesh

    wheel.children.forEach((child) => {
      const mesh = child as THREE.Mesh

      const mat = mesh.material as THREE.MeshStandardMaterial

      //  设置轮子环境贴图强度
      mat.envMapIntensity = 5

      // 保存轮子的引用
      modelRef.value.wheel.push(mesh)
    })

    //  保存车身材质的引用
    modelRef.value.bodyMat = bodyMat

    // 添加 模型
    scene.add(gltf.scene)
  })

  gltfLoader.load('/models/garage/models/sm_startroom.raw.gltf', (gltf) => {
    // 获取模型部分

    const modelParts = flatModel(gltf)

    // 获取光部分
    const light = modelParts[1] as THREE.Mesh

    const lightMat = light.material as THREE.MeshPhysicalMaterial

    // 设置光的发光颜色
    lightMat.emissive = new three.Color('white')

    // 设置光不进行色调映射
    lightMat.toneMapped = false

    // 设置光透明
    lightMat.transparent = true

    light.material = new three.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: three.DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    })

    /**
     *  获取地板部分
     */
    const floor = modelParts[2] as THREE.Mesh

    /**
     *  获取地板材质
     */
    const floorMat = floor.material as THREE.MeshPhysicalMaterial

    // 设置地板粗糙度贴图
    floorMat.roughnessMap = maps.value.floorRoughness

    // 设置地板法线贴图
    floorMat.normalMap = maps.value.floorNormal

    // 设置地板AO贴图
    floorMat.aoMap = maps.value.startRoomAo

    // 设置地板光贴图
    floorMat.lightMap = maps.value.startRoomLight

    // 设置地板环境贴图强度
    floorMat.envMapIntensity = 0

    /**
     *  创建地板的自定义材质
     */
    const floorCsmMat = new CustomShaderMaterial({
      baseMaterial: floorMat,
      uniforms: floorUniforms,
      vertexShader: floorVertex,

      fragmentShader: floorFrag,
      silent: true,
    })

    // 设置地板的自定义材质
    floor.material = floorCsmMat

    // 设置反射纹理
    // floorUniforms.uReflectTexture.value = renderTarget.texture

    // // 设置反射纹理的最小过滤
    // renderTarget.texture.minFilter = LinearFilter

    // // 设置反射纹理的最大过滤
    // renderTarget.texture.magFilter = LinearFilter

    // 设置反射矩阵
    // floorUniforms.uReflectMatrix.value = matrix

    // 保存地板的引用
    modelRef.value.floor = floor

    // 保存光材质的引用
    modelRef.value.lightMat = light.material as THREE.MeshStandardMaterial

    scene.add(gltf.scene)
  })

  gltfLoader.load('/models/garage/models/sm_speedup.gltf', (gltf) => {
    const mat = new CustomShaderMaterial({
      baseMaterial: three.MeshStandardMaterial,
      uniforms,
      vertexShader,
      fragmentShader,
      silent: true,
      transparent: true,
      depthWrite: false,
    } as any)

    useModifyCSM(gltf, mat)

    scene.add(gltf.scene)
  })
}
