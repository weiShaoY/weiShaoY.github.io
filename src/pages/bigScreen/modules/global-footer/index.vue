<!------  2025-08-25---22:28---星期一  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <div
    class="bottom-tray"
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
        icon="bgScreen-bottom-menu-arrow-big"
        class="arrowAnimate1"
      />

      <SvgIcon
        icon="bgScreen-bottom-menu-arrow-small"
        class="arrowAnimate2"
      />
    </div>

    <!-- 底部菜单 -->
    <div
      class="bottom-menu"
    >
      <div
        class="bottom-menu-item is-active"
      >
        <span>人口概览</span>
      </div>

      <div
        class="bottom-menu-item"
      >
        <span>小标题</span>
      </div>

      <div
        class="bottom-menu-item"
      >
        <span>小标题</span>
      </div>

      <div
        class="bottom-menu-item"
      >
        <span>小标题</span>
      </div>
    </div>

    <!-- 右箭头 -->
    <div
      class="bottom-tray-arrow h-7 flex items-center -scale-x-100"
    >
      <SvgIcon
        icon="bgScreen-bottom-menu-arrow-big"
        class="arrowAnimate1"
      />

      <SvgIcon
        icon="bgScreen-bottom-menu-arrow-small"
        class="arrowAnimate2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.arrowAnimate1 {
  animation: arrowAnimate1 2s ease-in-out infinite;
}

.arrowAnimate2 {
  animation: arrowAnimate2 2s ease-in-out infinite;
}

@keyframes arrowAnimate1 {
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
@keyframes arrowAnimate2 {
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
