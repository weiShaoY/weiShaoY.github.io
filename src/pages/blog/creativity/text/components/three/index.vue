<script setup lang="ts">
</script>

<template>
  <div
    class="relative h-full w-full flex items-center justify-center"
  >
    <h2
      class="firstText absolute left-1/2 top-[calc(50%_+_20px)] transform stroke-1 text-20 text-transparent font-semibold -translate-x-1/2 -translate-y-1/2"
    >
      weiShaoY
    </h2>

    <h2
      class="lastText animate-wave absolute left-1/2 top-[calc(50%_+_20px)] transform text-20 text-primary font-semibold -translate-x-1/2 -translate-y-1/2"
    >
      weiShaoY
    </h2>
  </div>
</template>

<style scoped>
@layer utilities {
  /* 自定义 stroke 样式 */
  .stroke-1 {
    -webkit-text-stroke: 1px #f5c666;
  }

  /* 自定义 keyframes 动画 */
  @keyframes wave {
    0%,
    100% {
      clip-path: polygon(0% 47%, 10% 48%, 28% 54%, 54% 50%, 50% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
    }

    50% {
      clip-path: polygon(0% 60%, 16% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
    }
  }

  /* 添加动画类 */
  .animate-wave {
    animation: wave 3s ease-in-out infinite;
  }
}
</style>
