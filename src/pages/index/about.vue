<script lang="ts" setup>
</script>

<template>
  <div class="px-10 container">
    <h1 class="flex items-center justify-center text-5xl font-bold md:text-7xl">
      ABOUT ME
    </h1>

    <div class="my-10 flex flex-col gap-3 text-2xl">
      <p class="last:mt-10">
        Hey ,我是weiShaoY, 一个热爱编程的前端开发. 💻 🚀
      </p>

      <p class="last:mt-10">
        热爱编程、软路由、手工、房间改造. 🔨💡
      </p>

      <p class="last:mt-10">
        热爱计算机科学和 IT 互联网事业，希望能成为一名优秀的开发者. 🙌
      </p>

      <p class="last:mt-10">
        这是我的技术栈
      </p>
    </div>

    <div class="flex flex-wrap content-center gap-7">
      <a
        class="hover:cursor-pointer hover:color-#FC490B"
        href="https://www.w3school.com.cn/"
        target="_blank"
      >
        <SvgIcon icon="icon-html" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#1872B6"
        target="_blank"
        href="https://www.w3schools.com/css/"
      >
        <SvgIcon icon="icon-css" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#F0DB4F"
        target="_blank"
        href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"
      >
        <SvgIcon icon="icon-javaScript" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#0076C6"
        target="_blank"
        href="https://www.typescriptlang.org/"
      >
        <SvgIcon icon="icon-typeScript" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#41B883"
        target="_blank"
        href="https://cn.vuejs.org/"
      >
        <SvgIcon icon="icon-vue" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#61DBFB"
        target="_blank"
        href="https://reactjs.org/"
      >
        <SvgIcon icon="icon-react" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#17BAB9"
        target="_blank"
        href="https://tailwindcss.com/"
      >
        <SvgIcon icon="icon-tailwindcss" :size="80" />
      </a>

      <a
        class="hover:cursor-pointer hover:color-#636363"
        target="_blank"
        href="https://unocss.dev/"
      >
        <SvgIcon icon="icon-unocss" :size="80" />
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
