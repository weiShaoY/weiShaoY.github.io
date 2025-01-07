import type * as THREE from 'three'

import { useGarageStore } from '@/store'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

export function addOrbitControls(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, composer: EffectComposer) {
  const garageStore = useGarageStore()

  garageStore.interact.controlDom = document.getElementById('controlRef')
  console.log('%c Line:322 🍋 garageStore.interact.controlDom', 'color:#93c0a4', garageStore.interact.controlDom)

  const controls = new OrbitControls(camera, garageStore.interact.controlDom)

  // 设置控制器目标
  controls.target.set(0, 1.5, 0)

  // 启用阻尼
  controls.enableDamping = true

  // 禁用缩放
  // controls.enableZoom = false

  // 更新控制器
  controls.update()

  composer = new EffectComposer(renderer)

  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new BloomPass(1.25)

  composer.addPass(bloomPass)
}
