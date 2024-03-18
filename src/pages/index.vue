<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()
</script>

<template>
  <div class="h-full p-x-10">
    <div class="grid gap-5 px-5 lg:grid-cols-4 md:grid-cols-3">
      <!-- About -->
      <div
        class="group indexGridBackgroundColor col-span-3 rounded-3xl p-8 lg:col-span-2 hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between gap-10"
          @click="router.push('/about')"
        >

          <div class="h-28 w-28 flex items-center overflow-hidden rounded-full">

            <img src="../images/avatar.jpg" alt="">
          </div>

          <div>
            <h1 class="mb-3 flex items-center gap-2 text-3xl font-bold">Hey, 我是 WeiShaoY
              <div class="w-fit" style="transform: rotateZ(30deg) translateZ(0px);">
                👋
              </div>
            </h1>

            <div class="flex items-center justify-between">
              <p class="md:text-lg">
                前端码农
                <span>💻</span>
              </p>

              <SvgIcon
                class="group-hover:color-primary"
                icon="icon-gengduo"
                :size="30"
              />
            </div>
          </div>
        </a>
      </div>

      <!-- Resume -->
      <div
        class="group indexGridBackgroundColor col-span-3 rounded-3xl p-8 md:col-auto hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-row items-center justify-start gap-10 md:flex-col md:items-start md:justify-between"
          @click="router.push('/resume')"
        >
          <SvgIcon
            class="group-hover:color-primary"
            icon="icon-wendang"
            :size="60"
          />
          <h1 class="text-3xl font-semibold">Resume</h1>
        </a>
      </div>

      <!-- Github -->
      <div
        class="group indexGridBackgroundColor col-span-3 rounded-3xl p-8 md:col-auto hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-row items-center justify-start gap-10 md:flex-col md:items-start md:justify-between"
          target="_blank"
          href="https://github.com/weiShaoY"
        >
          <SvgIcon
            class="group-hover:color-primary"
            icon="icon-github"
            :size="60"
          />
          <h1 class="text-3xl font-semibold">Resume</h1>
        </a>
      </div>

      <div class="group indexGridBackgroundColor col-span-5 rounded-3xl p-8 hover:drop-shadow-2xl hover:transition hover:duration-500">
        <div class="h-full flex flex-col justify-between gap-10">
          <h1 class="text-3xl font-semibold">
            My Projects
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
    </div>
  </div>
</template>
