<script setup lang="ts" generic="T extends any, O extends any">
import Map from './components/map.vue'
</script>

<template>
  <div class="m-x-auto h-full flex flex-col justify-between container">
    <div class="grid grid-cols-4 gap-5 px-5">
      <!-- About -->
      <div
        class="group indexGridBackgroundColor col-span-2 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer hover:color-primary hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between"
          @click="router.push('/index/about')"
        >
          <div class="m-b-2 flex items-center">
            <div class="h-24 w-24 flex items-center overflow-hidden rounded-full">

              <img src="@/assets/images/avatar.jpg" alt="">
            </div>

            <div class="flex flex-1 items-center justify-center text-3xl font-bold">
              Hey, 我是 WeiShaoY 👋
            </div>

          </div>

          <div>

            <p class="text-4 lh-7">
              一个热爱编程的前端开发  💻
            </p>

            <p class="text-4 lh-7">
              热爱计算机科学和 IT 互联网事业  🚀
            </p>

            <p class="text-4 lh-7">
              热爱编程、软路由、手工、房间改造  🔨
            </p>

            <p class="text-4 lh-7">
              希望能成为一名为开源做出贡献的优秀开发者  🙌
            </p>

          </div>
        </a>
      </div>

      <!-- Coding -->
      <div
        class="indexGridBackgroundColor col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer hover:color-primary hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between max-xl:flex-row max-xl:items-center"
          @click="router.push('/coding')"
        >
          <SvgIcon
            icon="icon-daima"
            :size="60"
          />
          <h1 class="text-3xl font-semibold">Coding</h1>
        </a>
      </div>

      <!-- Github -->
      <div
        class="indexGridBackgroundColor col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer hover:color-primary hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between max-xl:flex-row max-xl:items-center"
          target="_blank"
          href="https://github.com/weiShaoY"
        >
          <SvgIcon
            icon="icon-github"
            :size="60"
          />
          <h1 class="text-3xl font-semibold">Github</h1>
        </a>
      </div>

      <!-- 技术栈 -->
      <div class="group indexGridBackgroundColor col-span-4 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer hover:drop-shadow-2xl hover:transition hover:duration-500">
        <div class="h-full flex flex-col justify-between">
          <h1 class="text-3xl font-semibold group-hover:color-primary">
            我的技术栈
          </h1>

          <div class="flex flex-wrap content-center gap-7">
            <a
              class="hover:cursor-pointer hover:color-#FC490B"
              href="https://www.w3school.com.cn/"
              target="_blank"
            >
              <SvgIcon icon="icon-html" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#1872B6"
              target="_blank"
              href="https://www.w3schools.com/css/"
            >
              <SvgIcon icon="icon-css" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#F0DB4F"
              target="_blank"
              href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"
            >
              <SvgIcon icon="icon-javaScript" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#0076C6"
              target="_blank"
              href="https://www.typescriptlang.org/"
            >
              <SvgIcon icon="icon-typeScript" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#41B883"
              target="_blank"
              href="https://cn.vuejs.org/"
            >
              <SvgIcon icon="icon-vue" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#61DBFB"
              target="_blank"
              href="https://reactjs.org/"
            >
              <SvgIcon icon="icon-react" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#17BAB9"
              target="_blank"
              href="https://tailwindcss.com/"
            >
              <SvgIcon icon="icon-tailwindcss" :size="50" />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#636363"
              target="_blank"
              href="https://unocss.dev/"
            >
              <SvgIcon icon="icon-unocss" :size="50" />
            </a>
          </div>
        </div>
      </div>

      <!-- 地图 -->
      <!-- :class="isMobile ? 'h-90' : 'h-120'" -->
      <div
        class="*: col-span-4 h-120 max-xl:col-span-4 max-md:h-90"
      >
        <Map />
      </div>
    </div>
  </div>
</template>
