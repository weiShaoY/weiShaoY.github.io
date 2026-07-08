import type { ThreeContainerType } from './types'

import { gsap } from 'gsap'

import * as three from 'three'

import { watch } from 'vue'

import { useGarageStore } from '@/stores'

/**
 * 封装的函数，用于根据车身颜色的变化来动画化车身的颜色变化。
 *
 * @param {Ref<THREE.Object3D>} modelRef - 模型的引用，包含车身材质。
 */
export function watchColorChange(modelRef: ThreeContainerType.ModelRefType) {
  const garageStore = useGarageStore()

  // 监听颜色变化
  watch(
    () => garageStore.state.carColor,
    () => {
      // 如果车身材质不存在，直接返回
      if (!modelRef.bodyMat) {
        return
      }

      const par = {
        // 当前颜色
        color: modelRef.bodyMat.color,

        // 目标颜色
        targetColor: new three.Color(garageStore.state.carColor),
      }

      // 使用 GSAP 动画过渡颜色变化
      gsap.to(par.color, {
        // 动画持续时间
        duration: 0.65,

        // 动画缓动函数
        ease: 'power1.out',

        // 目标红色通道
        r: par.targetColor.r,

        // 目标绿色通道
        g: par.targetColor.g,

        // 目标蓝色通道
        b: par.targetColor.b,
        onUpdate: () => {
          // 更新车身颜色
          modelRef.bodyMat!.color.set(par.color)
        },
      })
    },
  )
}
