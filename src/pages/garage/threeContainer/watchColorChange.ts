import type { ModelRefType } from '../types'

import { useGarageStore } from '@/store'

import gsap from 'gsap'

import * as three from 'three'

export function watchColorChange(modelRef: ModelRefType) {
  const garageStore = useGarageStore()

  // 如果车身材质不存在，返回
  if (!modelRef.bodyMat) {
    return
  }

  const par = {
    // 当前颜色
    color: modelRef.bodyMat.color,

    // 目标颜色
    targetColor: new three.Color(garageStore.ui.bar.bodyColor),
  }

  gsap.to(par.color, {
    duration: 0.65, // 动画持续时间
    ease: 'power1.out', // 动画缓动函数
    r: par.targetColor.r, // 目标红色通道
    g: par.targetColor.g, // 目标绿色通道
    b: par.targetColor.b, // 目标蓝色通道
    onUpdate: () => {
      modelRef.bodyMat!.color.set(par.color) // 更新车身颜色
    },
  })
}
