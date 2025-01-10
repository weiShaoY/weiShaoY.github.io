import type * as THREE from 'three'

import type { ThreeContainerType } from './types'

import { useGarageStore } from '@/store'

import { gsap } from 'gsap'

/**
 * 封装的动画函数，用于根据触摸状态来执行不同的动画。
 */
export function watchMouseTouch(
  modelRef: ThreeContainerType.ModelRefType,
  sceneRenderParams: ThreeContainerType.SceneRenderParamsType,
  uniforms: ThreeContainerType.UniformsType,
  floorUniforms: ThreeContainerType.FloorUniformsType,
) {
  const garageStore = useGarageStore()

  //  监听交互
  watch(() => garageStore.interact.touch, () => {

    /**
     *  获取当前参数
     */
    const baseParam = sceneRenderParams

    /**
     *  获取光材质
     */
    const lightMat = modelRef.lightMat //

    /**
     *  获取地板材质
     */
    const flooMat = modelRef.floor?.material as THREE.MeshPhysicalMaterial

    const wheel = modelRef.wheel // 获取轮子

    gsap.killTweensOf(baseParam) // 停止当前参数的动画

    gsap.killTweensOf(floorUniforms.uColor.value) // 停止地板颜色的动画

    if (garageStore.interact.touch) {
      const t1 = gsap.timeline() // 创建时间线动画

      t1.to(floorUniforms.uColor.value, {
        duration: 1.5, // 动画持续时间
        ease: 'power1.in', // 动画缓动函数
        r: baseParam.speedupColor.r, // 加速颜色红色通道
        g: baseParam.speedupColor.g, // 加速颜色绿色通道
        b: baseParam.speedupColor.b, // 加速颜色蓝色通道
      })

      t1.to(
        baseParam,
        {
          duration: 1.5, // 动画持续时间
          ease: 'power1.in', // 动画缓动函数
          lightOpacity: 0, // 光的不透明度
          onUpdate: () => {
            lightMat && (lightMat.opacity = baseParam.lightOpacity) // 更新光的不透明度
          },
        },
        0,
      )

      t1.to(
        baseParam,
        {
          duration: 1.5, // 动画持续时间
          ease: 'power1.in', // 动画缓动函数
          speedFactor: 1, // 速度因子
          floorEnvIntensity: 0.5, // 地板环境强度
          bloomIntensity: 2, // Bloom 强度
          bloomThreshold: 0.1, // Bloom 阈值
          wheelRoughness: 0, // 轮子粗糙度
          wheelEnvIntensity: 20, // 轮子环境强度
          floorNormalSpeed: 1, // 地板法线速度
          onUpdate: () => {
            uniforms.uSpeedFactor.value = baseParam.speedFactor // 更新速度因子
            flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity) // 更新地板环境强度
            wheel.forEach((item) => {
              const mat = item.material as THREE.MeshStandardMaterial

              mat.roughness = baseParam.wheelRoughness // 更新轮子粗糙度
              mat.envMapIntensity = baseParam.wheelEnvIntensity // 更新轮子环境强度
            })
          },
        },
        1,
      )
    }
    else {
      const t2 = gsap.timeline() // 创建时间线动画

      t2.to(baseParam, {
        duration: 1.5, // 动画持续时间
        ease: 'power1.in', // 动画缓动函数
        speedFactor: 0, // 速度因子
        floorEnvIntensity: 0, // 地板环境强度
        bloomIntensity: 1, // Bloom 强度
        bloomThreshold: 1, // Bloom 阈值
        wheelRoughness: 1, // 轮子粗糙度
        wheelEnvIntensity: 5, // 轮子环境强度
        floorNormalSpeed: 0, // 地板法线速度
        onUpdate: () => {
          uniforms.uSpeedFactor.value = baseParam.speedFactor // 更新速度因子
          flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity) // 更新地板环境强度
          wheel.forEach((item) => {
            const mat = item.material as THREE.MeshStandardMaterial

            mat.roughness = baseParam.wheelRoughness // 更新轮子粗糙度
            mat.envMapIntensity = baseParam.wheelEnvIntensity // 更新轮子环境强度
          })
        },
      })
      t2.to(
        floorUniforms.uColor.value,
        {
          duration: 1.5, // 动画持续时间
          ease: 'power1.in', // 动画缓动函数
          r: baseParam.initColor.r, // 初始颜色红色通道
          g: baseParam.initColor.g, // 初始颜色绿色通道
          b: baseParam.initColor.b, // 初始颜色蓝色通道
        },
        '-=1',
      )

      t2.to(
        baseParam,
        {
          duration: 1.5, // 动画持续时间
          ease: 'power1.in', // 动画缓动函数
          lightOpacity: 1, // 光的不透明度
          onUpdate: () => {
          // 更新光的不透明度
            lightMat && (lightMat.opacity = baseParam.lightOpacity)
          },
        },
        '-=1',
      )
    }
  })
}
