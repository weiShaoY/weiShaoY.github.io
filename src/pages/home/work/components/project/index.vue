<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import Computer from '@/canvas/computer/index.vue'

import { myProjectList } from './data'

/**
 *  选中的项目索引
 */
const selectedProjectIndex = ref(0)

/**
 *  选中的项目
 */
const selectedProject = computed(() => {
  return myProjectList[selectedProjectIndex.value]
})

/**
 * 处理项目切换的逻辑，支持前进和后退
 * @param {("previous" | "next")} direction 导航方向，"previous"表示前一个项目，"next"表示下一个项目
 */
function handleProjectChange(direction: 'previous' | 'next') {
  if (direction === 'previous') {
    selectedProjectIndex.value = selectedProjectIndex.value === 0
      ? myProjectList.length - 1
      : selectedProjectIndex.value - 1
  }
  else if (direction === 'next') {
    selectedProjectIndex.value = selectedProjectIndex.value === myProjectList.length - 1
      ? 0
      : selectedProjectIndex.value + 1
  }
}

function handleOpenSite() {
  window.open(selectedProject.value.href)
}

</script>

<template>
  <section
    class="px-5 py-20 sm:px-10"
  >
    <div
      class="w-full text-[#afb0b6]"
    >
      <p
        class="text-3xl font-semibold sm:text-4xl"
      >
        我的精选作品
      </p>

      <div
        class="grid grid-cols-1 mt-12 w-full gap-5 lg:grid-cols-2"
      >
        <!-- 左侧 -->
        <div
          class="relative flex flex-col gap-5 px-5 py-10 shadow-[#0e0e10] shadow-2xl sm:p-10"
        >
          <!-- 项目展示图 -->
          <div
            class="absolute right-0 top-0"
          >
            <img
              :src="selectedProject.spotlight"
              alt="spotlight"
              class="h-96 w-full rounded-xl object-cover"
            >
          </div>

          <!-- 项目 logo -->
          <div
            class="w-fit rounded-lg p-3 backdrop-blur-3xl backdrop-filter"
          >
            <img
              :src="selectedProject.logo"
              class="h-10 w-10 shadow-sm"
              alt="logo"
            >
          </div>

          <!-- 项目描述 -->
          <div
            class="my-5 flex flex-col gap-5 text-[#afb0b6]"
          >
            <p
              v-animated-text
              class="animatedText text-2xl text-white font-semibold"
            >
              {{ selectedProject.title }}
            </p>

            <p
              v-animated-text
              class="text-lg"
            >
              {{ selectedProject.desc }}
            </p>

            <p
              v-animated-text
              class="text-lg"
            >
              {{ selectedProject.subdesc }}
            </p>
          </div>

          <!-- 项目标签和链接 -->
          <div
            class="flex flex-wrap items-center justify-between gap-5"
          >
            <div
              class="flex items-center gap-3"
            >
              <button
                v-for="(tag) in selectedProject.tags"
                :key="tag.name"
                className="p-2 bg-[#f5f5f5] bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg hover:bg-opacity-20 active:scale-95 transition-all"
                type="button"
              >
                <SvgIcon
                  :icon="tag.icon"
                  :size="30"
                />
              </button>
            </div>

            <button
              class="flex cursor-pointer items-center gap-2 rounded-lg bg-[#f5f5f5] bg-opacity-10 p-3 transition-all active:scale-95 hover:bg-opacity-20"
              type="button"
              @click="handleOpenSite"
            >
              <span>查看实时网站</span>

              <SvgIcon
                icon="arrow-top-right"
                size="{22}"
                color="#FEA67E"
              />
            </button>
          </div>

          <!-- 导航按钮 -->
          <div
            class="mt-7 flex items-center justify-between"
          >
            <button
              class="cursor-pointer rounded-full bg-[#f5f5f5] bg-opacity-10 p-3 transition-all active:scale-95 hover:bg-opacity-20"
              @click="handleProjectChange('previous')"
            >
              <SvgIcon
                icon="arrow-left"
                :size="30"
              />
            </button>

            <button
              class="cursor-pointer rounded-full bg-[#f5f5f5] bg-opacity-10 p-3 transition-all active:scale-95 hover:bg-opacity-20"
              @click="handleProjectChange('next')"
            >
              <SvgIcon
                icon="arrow-right"
                :size="30"
              />
            </button>
          </div>
        </div>

        <!-- 右侧 -->
        <div
          class="relative h-96 w-full border border-[#1c1c21] rounded-lg border-solid bg-[#0e0e10] md:h-full"
        >
          <Computer
            :video="selectedProject.video"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped></style>
