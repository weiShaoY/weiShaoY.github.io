<script setup lang="ts">
</script>

<template>
  <div
    class="relative h-full w-full flex items-center justify-center"
  >
    <p
      class="font-custom animate-text relative text-20 text-#707070 font-bold"
      data-text="weiShaoY"
    >
      weiShaoY
    </p>
  </div>
</template>

<style scoped>
/* 伪元素的自定义样式 */
p::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  clip-path: ellipse(60px 60px at 0% 50%);
  animation: move 8s ease-in-out infinite;
}

/* 定义动画效果 */
@keyframes move {
  50% {
    clip-path: ellipse(60px 60px at 100% 50%);
  }
  100% {
    clip-path: ellipse(60px 60px at 0% 50%);
  }
}
</style>
