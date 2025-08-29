<script setup lang="ts">
import autofit from 'autofit.js'

import gsap from 'gsap'

import { Assets } from './assets'

import MapScene from './comments/mapScene/index.vue'

import GlobalCountCard from './modules/global-count-card/index.vue'

import GlobalDecorativeLine from './modules/global-decorative-line/index.vue'

import GlobalFooter from './modules/global-footer/index.vue'

import GlobalHeader from './modules/global-header/index.vue'

import GlobalLeftChart from './modules/global-left-chart/index.vue'

import GlobalMenu from './modules/global-menu/index.vue'

import GlobalRadar from './modules/global-radar/index.vue'

import GlobalRightChart from './modules/global-right-chart/index.vue'

import emitter from './utils/emitter'

const assets = shallowRef<Assets | null>(null)

const mapSceneRef = ref<InstanceType<typeof MapScene> | null>(null)

/**
 * 地图开始动画播放完成
 */
function handleMapPlayComplete() {
  const tl = gsap.timeline({
    paused: false,
  })

  const leftCards = gsap.utils.toArray('.left-card')

  const rightCards = gsap.utils.toArray('.right-card')

  const countCards = gsap.utils.toArray('.top-count-card')

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

  // 资源加载完成
  assets.value.instance.on('onLoad', () => {
    onLoadCallback && onLoadCallback()
  })
}

onBeforeUnmount(() => {
  emitter.$off('mapPlayComplete', handleMapPlayComplete)
})
onMounted(() => {
  // 开始全屏loading
  homeMittBus.emit('startLoading', 3)

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

    // 关闭全屏loading
    homeMittBus.emit('closeLoading')

    // 播放场景
    if (mapSceneRef.value) {
      mapSceneRef.value.play()
    }
  })
})

</script>

<template>
  <div
    class="large-screen relative mx-auto h-full w-full bg-[#050F33] text-3.5"
  >
    <!-- 地图 -->
    <MapScene
      ref="mapSceneRef"
    />

    <div
      id="large-screen"
      class="large-screen-wrap"
    >

      <!-- 头部 -->
      <GlobalHeader />

      <!-- 顶部菜单 -->
      <GlobalMenu />

      <!-- 顶部统计卡片 -->
      <GlobalCountCard />

      <!-- 底部托盘 -->
      <GlobalFooter />

      <!-- 底部雷达 -->
      <GlobalRadar />

      <!-- 左右装饰线 -->
      <GlobalDecorativeLine />

      <!-- 左边布局 图表 -->
      <GlobalLeftChart />

      <!-- 右边布局 图表 -->
      <GlobalRightChart />

    </div>
  </div>

  <BackHomeButton />
</template>

<style lang="scss">
body {
  font-family: 'SourceHanSansCN', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', Helvetica, 'Segoe UI',
    'Arial', 'Roboto', 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  background: #000;
  -webkit-user-select: none; /*webkit浏览器*/
  user-select: none;
}

.large-screen {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

// 360旋转
@keyframes rotate360Animate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

///////////////////// 初始化动画 /////////////////////
// 头部
.m-header {
  transform: translateY(-100%);
  opacity: 0;
}

// 顶部菜单
.top-menu {
  transform: translateY(-250%);
  opacity: 0;
}

// 顶部计数卡片
.top-count-card {
  transform: translateY(150%);
  opacity: 0;
}

// 底部托盘
.bottom-tray {
  transform: translateY(100%);
  opacity: 0;
}

// 左边卡片
.left-card {
  transform: translateX(-150%);
  opacity: 0;
}

// 右边卡片
.right-card {
  transform: translateX(150%);
  opacity: 0;
}
</style>
