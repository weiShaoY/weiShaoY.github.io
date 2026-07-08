<!------  2025-08-25---22:28---星期一  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import img_bottomMenuBg from '@/assets/images/bigScreen/bottom-menu-bg.png'

import img_bottomMenuBtnHover from '@/assets/images/bigScreen/bottom-menu-btn-hover.png'

import img_bottomMenuBtn from '@/assets/images/bigScreen/bottom-menu-btn.png'

import { mSvglineAnimation } from '../../components'

const activeIndex = ref(1)

const menuList = [
  {
    index: 1,
    name: '热点话题',
  },

  {
    index: 2,
    name: '应急预案',
  },

  {
    index: 3,
    name: '舆情监控',
  },

  {
    index: 4,
    name: '通信指挥',
  },
]
</script>

<template>
  <div
    class="bottom-tray absolute bottom-0 left-2/4 z-[3] ml-[-960px] box-border h-[90px] w-[1920px] flex justify-center bg-contain pt-5"
    :style="{
      backgroundImage: `url(${img_bottomMenuBg})`,
    }"
  >
    <!-- svg线条动画 -->
    <mSvglineAnimation
      class="bottom-svg-line-left absolute bottom-[-21px] right-1/2 mr-[-5px] h-[57px] w-[721px]"
      :width="721"
      :height="57"
      color="#30DCFF"
      :stroke-width="2"
      :dir="[0, 1]"
      :length="50"
      path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142"
    />

    <mSvglineAnimation
      class="bottom-svg-line-left bottom-svg-line-right absolute bottom-[-21px] left-1/2 ml-[-5px] h-[57px] w-[721px] -scale-x-100"
      :width="721"
      :height="57"
      color="#30DCFF"
      :stroke-width="2"
      :dir="[0, 1]"
      :length="50"
      path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142"
    />
    <!-- 做箭头 -->
    <div
      class="bottom-tray-arrow h-7 flex items-center"
    >
      <SvgIcon
        icon="bigScreen-bottom-menu-arrow-big"
        class="arrowAnimate1"
      />

      <SvgIcon
        icon="bigScreen-bottom-menu-arrow-small"
        class="arrowAnimate2"
      />
    </div>

    <!-- 底部菜单 -->
    <div
      class="bottom-menu flex px-5"
    >
      <div
        v-for="item in menuList"
        :key="item.index"
        class="bottom-menu-item pointer-events-auto h-8 w-25 cursor-pointer bg-[length:100%] text-center text-4 leading-[30px] tracking-[1.6px]"
        :class="{
          'is-active': item.index === activeIndex,
        }"
        :style="{
          backgroundImage: `url(${item.index === activeIndex ? img_bottomMenuBtnHover : img_bottomMenuBtn})`,
        }"
        @click="activeIndex = item.index"
      >
        <span
          class="block h-8 w-25 from-[rgba(117,232,255,1)] to-[rgba(255,255,255,1)] bg-gradient-to-b bg-clip-text text-transparent font-bold"
          :style="{
          }"
        >{{ item.name }}
        </span>
      </div>
    </div>

    <!-- 右箭头 -->
    <div
      class="bottom-tray-arrow h-7 flex items-center -scale-x-100"
    >
      <SvgIcon
        icon="bigScreen-bottom-menu-arrow-big"
        class="arrowAnimate1"
      />

      <SvgIcon
        icon="bigScreen-bottom-menu-arrow-small"
        class="arrowAnimate2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.arrowAnimate1 {
  animation: arrowAnimation1 2s ease-in-out infinite;
}

.arrowAnimate2 {
  animation: arrowAnimation2 2s ease-in-out infinite;
}

@keyframes arrowAnimation1 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes arrowAnimation2 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(90%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
