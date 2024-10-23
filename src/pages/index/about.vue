<script setup lang="ts" generic="T extends any, O extends any">
import Map from './components/map.vue'

const router = useRouter()
</script>

<template>
  <div
    class="m-x-auto flex-col flex-1 p-t-10 container"
  >
    <div
      class="grid grid-cols-4 flex-grow-0 gap-5 p-x-5"
    >
      <!-- About -->
      <div
        class="group relative col-span-2 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between"
          @click="router.push('/index/about')"
        >
          <div
            class="m-b-2 flex items-center max-xl:flex-col"
          >

            <div
              class="h-20 w-20 flex items-center overflow-hidden rounded-full max-xl:m-b-4"
            >

              <img
                src="@/assets/images/avatar.jpg"
                alt=""
              >

            </div>

            <div
              class="flex flex-1 items-center justify-center text-8 font-bold max-xl:text-5"
            >
              Hey, Here Is WeiShaoY !
            </div>

          </div>

          <div
            class="text-5 font-600 max-xl:text-4"
          >

            <p
              class="lh-7"
            >
              一个热爱编程的前端开发  💻
            </p>

            <p
              class="lh-7"
            >
              热爱计算机科学和IT互联网事业  🚀
            </p>

            <p
              class="lh-7"
            >
              热爱编程、软路由、硬件、Diy等  🔨
            </p>

          </div>
        </a>
      </div>

      <!-- Coding -->
      <div
        v-lightCard="{
          light: {
            color: '#ffffff',
            width: 100,
          },
        }"
        class="col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between max-xl:flex-row max-xl:items-center"
          @click="router.push('/coding')"
        >
          <SvgIcon
            name="daiMa"
            :size="60"
          />

          <h1
            class="text-3xl font-600"
          >
            Coding
          </h1>
        </a>
      </div>

      <!-- Github -->
      <div
        class="col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <a
          class="h-full flex flex-col justify-between max-xl:flex-row max-xl:items-center"
          target="_blank"
          href="https://github.com/weiShaoY"
        >
          <SvgIcon
            name="github"
            :size="60"
          />

          <h1
            class="text-3xl font-600"
          >
            Github
          </h1>
        </a>
      </div>

      <!-- 技术栈 -->
      <div
        class="group col-span-4 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:drop-shadow-2xl hover:transition hover:duration-500"
      >
        <div
          class="h-full flex flex-col justify-between"
        >
          <h1
            class="m-b-4 text-3xl font-600 max-xl:text-6 group-hover:color-primary"
          >
            My Technology Stack
          </h1>

          <div
            class="flex flex-wrap content-center gap-7"
          >
            <a
              class="hover:cursor-pointer hover:color-#FC490B"
              href="https://www.w3school.com.cn/"
              target="_blank"
            >
              <SvgIcon
                name="html"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#1872B6"
              target="_blank"
              href="https://www.w3schools.com/css/"
            >
              <SvgIcon
                name="css"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#F0DB4F"
              target="_blank"
              href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"
            >
              <SvgIcon
                name="javaScript"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#0076C6"
              target="_blank"
              href="https://www.typescriptlang.org/"
            >
              <SvgIcon
                name="typeScript"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#41B883"
              target="_blank"
              href="https://cn.vuejs.org/"
            >
              <SvgIcon
                name="vue"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#61DBFB"
              target="_blank"
              href="https://reactjs.org/"
            >
              <SvgIcon
                name="react"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#17BAB9"
              target="_blank"
              href="https://tailwindcss.com/"
            >
              <SvgIcon
                name="tailwindCss"
                :size="50"
              />
            </a>

            <a
              class="hover:cursor-pointer hover:color-#636363"
              target="_blank"
              href="https://unocss.dev/"
            >
              <SvgIcon
                name="unocss"
                :size="50"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div
      class="m-t-10 flex-1 max-xl:flex-auto max-xl:!h-90"
    >
      <Map />
    </div>
  </div>
</template>
