<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup></script>

<template>
  <div
    class="absolute inset-0 top-[120px] mx-auto max-w-7xl flex flex-row items-start gap-5 px-6 sm:px-16"
  >
    <!-- 左侧装饰条 -->
    <div
      class="mt-5 flex flex-col items-center justify-center"
    >
      <div
        class="h-5 w-5 rounded-full bg-[#915eff]"
      />

      <div
        class="h-40 w-1 from-[#804dee] to-[rgba(60,51,80,0)] bg-gradient-to-b sm:h-80"
      />
    </div>

    <!-- 右侧标题和描述 -->
    <div>
      <h1
        class="xs:text-[50px] mt-2 select-none text-[40px] text-white font-black lg:text-[80px] sm:text-[60px] lg:leading-[98px]"
      >
        <span>Hi,I'm</span>

        <span
          class="ml-1 text-[#915eff]"
        >
          weiShaoY
        </span>
      </h1>

      <p
        class="xs:text-[18px] mt-2 select-none text-[16px] text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[22px] lg:leading-[40px]"
      >
        一个热爱编程的前端开发
        <br
          class="hidden sm:block"
        >
        热爱计算机科学和IT互联网事业
        <br
          class="hidden sm:block"
        >
        热爱编程、软路由、硬件、Diy等
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
