<script setup lang="ts" generic="T extends any, O extends any">
import { useRouter } from 'vue-router'

import Map from './components/map.vue'

// 路由对象
const router = useRouter()

// 技术栈数据数组
const techStack = [
  { name: 'html', size: 50, color: '#FC490B', url: 'https://www.w3school.com.cn/' },
  { name: 'css', size: 50, color: '#1872B6', url: 'https://www.w3schools.com/css/' },
  { name: 'javaScript', size: 50, color: '#F0DB4F', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript' },
  { name: 'typeScript', size: 50, color: '#0076C6', url: 'https://www.typescriptlang.org/' },
  { name: 'vue', size: 50, color: '#41B883', url: 'https://cn.vuejs.org/' },
  { name: 'react', size: 50, color: '#61DBFB', url: 'https://reactjs.org/' },
  { name: 'tailwindCss', size: 50, color: '#17BAB9', url: 'https://tailwindcss.com/' },
  { name: 'unocss', size: 50, color: '#636363', url: 'https://unocss.dev/' },
]

/**
 *  用于存储当前悬浮的图标名称
 */
const currentHoverName = ref<string>('')

function handleMouseOver(name: string) {
  currentHoverName.value = name
}

function handleMouseLeave() {
  currentHoverName.value = ''
}
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
        v-light
        class="group relative col-span-2 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition"
      >
        <a
          class="h-full flex flex-col justify-between"
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
            >一个热爱编程的前端开发 💻</p>

            <p
              class="lh-7"
            >热爱计算机科学和IT互联网事业 🚀</p>

            <p
              class="lh-7"
            >热爱编程、软路由、硬件、Diy等 🔨</p>
          </div>
        </a>
      </div>

      <!-- Coding -->
      <div
        v-light
        class="col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition"
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
          >Coding</h1>
        </a>
      </div>

      <!-- Github -->
      <div
        v-light
        class="col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl"
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
          >Github</h1>
        </a>
      </div>

      <!-- 技术栈 -->
      <div
        v-light="{
          rotate: false,
        }"
        class="group col-span-2 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:drop-shadow-2xl hover:transition"
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
            class="child flex flex-wrap content-center gap-7"
          >
            <a
              v-for="tech in techStack"
              :key="tech.name"
              :href="tech.url"
              target="_blank"
              @mouseover="handleMouseOver(tech.name)"
              @mouseleave="handleMouseLeave"
            >
              <SvgIcon
                :name="tech.name"
                :size="tech.size"
                :style="{ color: currentHoverName === tech.name ? tech.color : '' }"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- Command -->
      <div
        v-light
        class="col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition"
      >
        <a
          class="h-full flex flex-col justify-between max-xl:flex-row max-xl:items-center"
          @click="router.push('/command')"
        >
          <SvgIcon
            name="command"
            :size="60"
          />

          <h1
            class="text-3xl font-600"
          >
            Command
          </h1>
        </a>
      </div>

      <!-- Test -->
      <div
        v-light
        class="col-span-1 rounded-3xl p-8 max-xl:col-span-4 hover:cursor-pointer theme-item hover:color-primary hover:drop-shadow-2xl hover:transition"
      >
        <a
          class="h-full flex flex-col justify-between max-xl:flex-row max-xl:items-center"
          @click="router.push('/command')"
        >
          <SvgIcon
            name="test"
            :size="60"
          />

          <h1
            class="text-3xl font-600"
          >
            Test
          </h1>
        </a>
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
