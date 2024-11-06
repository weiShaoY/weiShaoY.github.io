<script setup lang="ts">
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center"
  >
    <p
      class="animate-text relative text-20 text-#707070 font-medium"
      data-text="weiShaoY"
    >
      weiShaoY
    </p>
  </div>
</template>

<style scoped>
/* 定义伪元素和动画效果 */
p::before {
  content: attr(data-text);
  position: absolute;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  border-right: 4px solid #fff;
  width: 0; /* 默认宽度 */
  animation: move 8s linear infinite;
  filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 50px #fff);
}

/* 自定义动画效果 */
@keyframes move {
  0%,
  10%,
  100% {
    width: 0;
  }
  70%,
  90% {
    width: 100%;
  }
}
</style>
