<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

</script>

<template>
  <div
    class="absolute inset-0 top-[120px] mx-auto max-w-7xl flex flex-row items-start gap-5 px-16 max-sm:px-6"
  >
    <!-- 左侧装饰条 -->
    <div
      class="mt-5 flex flex-col items-center justify-center"
    >
      <div
        class="h-5 w-5 rounded-full bg-primary"
      />

      <div
        class="h-40 w-1 from-primary to-[rgba(60,51,80,0)] bg-gradient-to-b sm:h-80"
      />
    </div>

    <!-- 右侧标题和描述 -->
    <div>
      <h1
        class="mt-2 select-none text-[80px] text-white font-black leading-[120px] max-sm:text-[30px] max-sm:leading-[50px]"
      >
        <span>Hi,I'm</span>

        <span
          class="ml-1 text-primary"
        >
          weiShaoY
        </span>
      </h1>

      <TypeIt
        class="mt-2 select-none text-[40px] text-secondary font-medium max-sm:text-[20px]"
        :string-list="['一个热爱编程的前端开发', '热爱计算机科学和IT互联网事业', '热爱编程、软路由、硬件、Diy等']"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
