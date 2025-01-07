import type * as THREE from 'three'

import type { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import type ts from 'typescript'

//  命名空间
export namespace ThreeContainerType {

  /**
   * 主模型类型
   */
  export type ModelRefType = {

    /**
     * 轮子材质
     */
    wheel: THREE.Mesh[]

    /**
     * 车身材质
     */
    bodyMat: THREE.MeshStandardMaterial | null

    /**
     * 地板材质
     */
    floor: THREE.Mesh | null

    /**
     * 灯光材质
     */
    lightMat: THREE.MeshStandardMaterial | null
  }

  // /**
  //  *  Bloom效果
  //  */
  // export type BloomRefType = BloomPass & {

  //   // 强度
  //   strength: number

  //   // 内核大小
  //   kernelSize: number

  //   // 标准差（用于模糊效果）
  //   sigma: number

  //   // 分辨率
  //   resolution: number
  // }

  /**
   * 场景渲染参数类型
   * 包含模型、地板、光照等渲染相关的参数，用于控制场景中的各种视觉效果。
   */
  export type SceneRenderParamsType = {

    /**
     * 速度因子
     * 表示模型的运动速度影响因子，用于动态效果调整。
     */
    speedFactor: number

    /**
     * 初始颜色
     * 模型初始显示的颜色。
     */
    initColor: THREE.Color

    /**
     * 加速颜色
     * 模型在加速状态下显示的颜色。
     */
    speedupColor: THREE.Color

    /**
     * 地板颜色
     * 地板的基础显示颜色。
     */
    floorColor: THREE.Color

    /**
     * 地板法线速度
     * 控制地板法线贴图滚动的速度。
     */
    floorNormalSpeed: number

    /**
     * Bloom 强度
     * 场景中的高亮部分的发光效果强度。
     */
    bloomIntensity: number

    /**
     * Bloom 阈值
     * 控制 Bloom 效果触发的亮度阈值。
     */
    bloomThreshold: number

    /**
     * 光的不透明度
     * 调整光线材质的透明度。
     */
    lightOpacity: number

    /**
     * 地板环境强度
     * 控制地板的环境光照强度。
     */
    floorEnvIntensity: number

    /**
     * 轮子粗糙度
     * 控制车轮材质的粗糙度，值越高越粗糙。
     */
    wheelRoughness: number

    /**
     * 轮子环境强度
     * 控制车轮的环境光照强度。
     */
    wheelEnvIntensity: number
  }

  /**
   * 地板的着色器统一变量集合类型
   * 用于传递动态数据和控制地板的材质效果。
   */
  export type UniformsType = {

    /**
     * 地板时间统一变量
     * 用于动画效果中的时间控制，随着渲染帧不断更新。
     */
    uTime: THREE.Uniform<number>

    /**
     * 地板速度因子统一变量
     * 控制地板动画或效果中的速度比例。
     */
    uSpeedFactor: THREE.Uniform<number>
  }

  /**
   * 地板的着色器统一变量类型
   * 用于传递地板材质中需要的动态数据和配置参数。
   */
  export type FloorUniformsType = {

    /**
     * 地板颜色统一变量
     * 控制地板的基础颜色。
     */
    uColor: THREE.Uniform<THREE.Color>

    /**
     * 反射矩阵统一变量
     * 用于计算反射效果的变换矩阵。
     */
    uReflectMatrix: THREE.Uniform<THREE.Matrix4>

    /**
     * 反射纹理统一变量
     * 用于渲染地板反射效果的纹理。
     */
    uReflectTexture: THREE.Uniform<THREE.Texture>

    /**
     * 反射强度统一变量
     * 控制地板反射效果的强度。
     */
    uReflectIntensity: THREE.Uniform<number>

    /**
     * 强度统一变量
     * 控制地板整体材质的强度参数。
     */
    uIntensity: THREE.Uniform<number>

    /**
     * 层级统一变量
     * 可用于控制地板材质的层级效果，如叠加的纹理层数。
     */
    uLevel: THREE.Uniform<number>

    /**
     * 分辨率统一变量
     * 表示地板渲染时的屏幕分辨率，通常用于处理屏幕空间效果。
     */
    uResolution: THREE.Uniform<THREE.Vector2>

    /**
     * 时间统一变量
     * 用于动态效果的时间参数，如动画或特效的时间驱动。
     */
    uTime: THREE.Uniform<number>
  }

  /**
   *  贴图类型
   */
  export type MapsType = {

    /**
     * 汽车车身AO贴图
     * 初始值为 null，稍后动态加载。
     */
    carAo: THREE.Texture | null

    /**
     * 起始房间光贴图
     * 初始值为 null，稍后动态加载。
     */
    startRoomLight: THREE.Texture | null

    /**
     * 起始房间AO贴图
     * 初始值为 null，稍后动态加载。
     */
    startRoomAo: THREE.Texture | null

    /**
     * 地板粗糙度贴图
     * 初始值为 null，稍后动态加载。
     */
    floorRoughness: THREE.Texture | null

    /**
     * 地板法线贴图
     * 初始值为 null，稍后动态加载。
     */
    floorNormal: THREE.Texture | null
  }

}
