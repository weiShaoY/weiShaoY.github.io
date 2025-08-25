<script setup lang="ts">

const activeIndex = defineModel<number>()

const menuList = [
  {
    index: 1,
    name: '经济概览',
  },
  {
    index: 2,
    name: '经济概览',
  },

  {
    index: 3,
    name: '经济概览',
  },
  {
    index: 4,
    name: '经济概览',
  },
  {
    index: 5,
    name: '经济概览',
  },
  {
    index: 6,
    name: '经济概览',
  },
]

function handleClick(index: number) {
  activeIndex.value = index
}

</script>

<template>
  <div
    class="absolute left-0 right-0 top-[40px] z-3 flex justify-center"
  >
    <div
      class="m-menu flex"
    >
      <div
        v-for="item in menuList"
        :key="item.index"
        class="m-menu-item pointer-events-auto relative z-1 mx-3 h-8 w-25 flex cursor-pointer items-center justify-center bg-[length:100%] text-4 !bg-[length:100%] !color-[#A3AEB5]"
        :class="{
          'is-active': item.index === activeIndex,
          '!mr-200': item.index === 3,
        }"
        @click="handleClick(item.index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-menu-item {
  background-image: url('../../assets/images/menu-btn.png');

  &:hover,
  &.is-active {
    color: white !important;
    background-image: url('../../assets/images/menu-btn-hover.png');
    &:after {
      display: block;
      width: 100px;
      height: 32px;
      background-size: 100%;
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -16px;
      z-index: -1;
      opacity: 1;
      background: rgba(0, 170, 255, 0.55);
      border-radius: 32px;
      transform: scale(1.1, 1.2);
      animation: menuActiveScale 1s infinite;
    }
  }
}
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
