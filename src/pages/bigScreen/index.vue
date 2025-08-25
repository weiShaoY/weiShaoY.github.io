<script setup lang="ts">
import type MapScene from './comments/mapScene/index.vue'

import autofit from 'autofit.js'

import gsap from 'gsap'

import { Assets } from './assets'

import GlobalCountCard from './modules/global-count-card/index.vue'

import GlobalDecorativeLine from './modules/global-decorative-line/index.vue'

import GlobalFooter from './modules/global-footer/index.vue'

import GlobalHeader from './modules/global-header/index.vue'

import GlobalMenu from './modules/global-menu/index.vue'

import emitter from './utils/emitter'

const assets = shallowRef<Assets | null>(null)

const mapSceneRef = ref<InstanceType<typeof MapScene> | null>(null)

const state = reactive({
  // 进度
  progress: 0,

  // 当前顶部导航索引
  activeIndex: 1,

  // 卡片统计数据
  totalView: [
    {
      icon: 'xiaoshoujine',
      zh: '2024年生产总值',
      en: 'Gross Domestic Product in 2024',
      value: 31500,
      unit: '亿元',
      decimals: 0,
    },
    {
      icon: 'zongxiaoliang',
      zh: '2024年常驻人数',
      en: 'resident population in 2024',
      value: 15000,
      unit: '万人',
      decimals: 0,
    },
  ],
})

/**
 * 地图开始动画播放完成
 */
function handleMapPlayComplete() {
  const tl = gsap.timeline({
    paused: false,
  })

  const leftCards = gsap.utils.toArray('.left-card')

  const rightCards = gsap.utils.toArray('.right-card')

  const countCards = gsap.utils.toArray('.count-card')

  tl.addLabel('start', 0.5)
  tl.addLabel('menu', 0.5)
  tl.addLabel('card', 1)
  tl.addLabel('countCard', 3)
  tl.to('.m-header', {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
  }, 'start')
  tl.to('.bottom-tray', {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
  }, 'start')
  tl.to(
    '.top-menu',
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
    },
    '-=1',
  )
  tl.to('.bottom-radar', {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
  }, '-=2')
  tl.to(leftCards, {
    x: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1.5,
    ease: 'power4.out',
  }, 'card')
  tl.to(rightCards, {
    x: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1.5,
    ease: 'power4.out',
  }, 'card')
  tl.to(
    countCards,
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out',
    },
    'card',
  )
}

// 初始化加载资源
function initAssets(onLoadCallback: (() => void) | undefined) {
  assets.value = new Assets()

  // 资源加载进度
  const params = {
    progress: 0,
  }

  assets.value.instance.on('onProgress', (path: string, itemsLoaded: number, itemsTotal: number) => {
    const p = Math.floor((itemsLoaded / itemsTotal) * 100)

    gsap.to(params, {
      progress: p,
      onUpdate: () => {
        state.progress = Math.floor(params.progress)
      },
    })
  })

  // 资源加载完成
  assets.value.instance.on('onLoad', () => {
    onLoadCallback && onLoadCallback()
  })
}

onBeforeUnmount(() => {
  emitter.$off('mapPlayComplete', handleMapPlayComplete)
})
onMounted(() => {
  // 监听地图播放完成，执行事件
  emitter.$on('mapPlayComplete', handleMapPlayComplete)

  // 自动适配
  assets.value = autofit.init({
    dh: 1080,
    dw: 1920,
    el: '#large-screen',
    resize: true,
  }) as any

  // 初始化资源
  initAssets(async () => {
    // 加载地图
    emitter.$emit('loadMap', assets.value)

    // 播放场景
    if (mapSceneRef.value) {
      mapSceneRef.value.play()
    }
  })
})

</script>

<template>
  <div
    class="large-screen"
  >
    <!-- 地图 -->
    <!-- <MapScene
      ref="mapSceneRef"
    /> -->

    <div
      id="large-screen"
      class="large-screen-wrap"
    >

      <!-- 头部 -->
      <GlobalHeader />

      <!-- 顶部菜单 -->
      <GlobalMenu
        v-model="state.activeIndex"
      />

      <!-- 顶部统计卡片 -->
      <GlobalCountCard
        :total-view="state.totalView"
      />

      <!-- 底部托盘 -->
      <GlobalFooter />

      <!-- 左右装饰线 -->
      <GlobalDecorativeLine />

      <!-- <div
        class="large-screen-left-zsline"
      />

      <div
        class="large-screen-right-zsline"
      /> -->

    </div>
  </div>

  <BackHomeButton />
</template>

<style lang="scss">
@use './home.scss';
</style>
