<script setup lang="ts">
import img_menuBtnHover from '@/assets/images/bigScreen/menu-btn-hover.png'

import img_menuBtn from '@/assets/images/bigScreen/menu-btn.png'

const activeIndex = ref(1)

const menuList = [
  {
    index: 1,
    name: '态势总览',
  },
  {
    index: 2,
    name: '风险预警',
  },

  {
    index: 3,
    name: '情报研判',
  },
  {
    index: 4,
    name: '任务管理',
  },
  {
    index: 5,
    name: '装备管理',
  },
  {
    index: 6,
    name: '人员管理',
  },
]

function handleClick(index: number) {
  activeIndex.value = index
}

</script>

<template>
  <div
    class="top-menu absolute left-0 right-0 top-[40px] z-3 flex justify-center"
  >
    <div
      class="m-menu flex"
    >
      <div
        v-for="item in menuList"
        :key="item.index"
        class="m-menu-item pointer-events-auto relative z-1 mx-3 h-8 w-25 flex cursor-pointer items-center justify-center bg-[length:100%] text-4 !bg-[length:100%] !color-[#A3AEB5]"
        :class="{
          'is-active !color-white': item.index === activeIndex,
          '!mr-200': item.index === 3,
        }"
        :style="{
          backgroundImage: `url(${item.index === activeIndex ? img_menuBtnHover : img_menuBtn})`,
        }"
        @click="handleClick(item.index)"
      >
        <!-- 伪元素 -->
        <div
          v-if="item.index === activeIndex"
          class="absolute left-1/2 top-1/2 z-[-1] ml-[-50px] mt-[-16px] block h-8 w-25 scale-[1.1,1.2] rounded-4 bg-[length:100%] bg-[rgba(0,170,255,0.55)] opacity-100 content-['']"
          :style="{
            animation: 'menuActiveScale 1s linear infinite',
          }"
        />

        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@keyframes menuActiveScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1, 1.2);
  }
  100% {
    transform: scale(1.1, 1.2);
    opacity: 0;
  }
}
</style>
