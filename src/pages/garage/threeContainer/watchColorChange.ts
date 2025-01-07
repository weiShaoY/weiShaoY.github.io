import type { ThreeContainerType } from './types'

import { useGarageStore } from '@/store'

import { gsap } from 'gsap'

import * as three from 'three'

import { watch } from 'vue'

/**
 * 封装的函数，用于根据车身颜色的变化来动画化车身的颜色变化。
 *
 * @param {Ref<THREE.Object3D>} modelRef - 模型的引用，包含车身材质。
 */
export function watchColorChange(modelRef: Ref<ThreeContainerType.ModelRefType>) {
  const garageStore = useGarageStore()

  watch(
    () => garageStore.ui.bar.bodyColor, // 监听颜色变化
    () => {
      // 如果车身材质不存在，直接返回
      if (!modelRef.value.bodyMat) {
        return
      }

      const par = {
        // 当前颜色
        color: modelRef.value.bodyMat.color,

        // 目标颜色
        targetColor: new three.Color(garageStore.ui.bar.bodyColor),
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
          modelRef.value.bodyMat!.color.set(par.color)
        },
      })
    },
  )
}
