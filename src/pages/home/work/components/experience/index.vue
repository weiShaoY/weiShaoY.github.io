<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import Developer from '@/canvas/developer/index.vue'

const workExperiences = [
  {
    id: 1,
    name: 'Framer',
    pos: 'Lead Web Developer',
    duration: '2022 - Present',
    title:
			'Framer是我创建交互式原型的首选工具。我用它来实现设计，让利益相关者在开发之前体验用户流和交互。',
    icon: 'home-project-experience-1',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Figma',
    pos: 'Web Developer',
    duration: '2020 - 2022',
    title:
			'Figma是我首选的协同设计平台。我利用它与团队成员和客户无缝协作，促进实时反馈和设计迭代。它基于云。',
    icon: 'home-project-experience-2',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Notion',
    pos: 'Junior Web Developer',
    duration: '2019 - 2020',
    title:
			'Notion帮助我保持项目的有序性。我使用它进行项目管理、任务跟踪，并将其作为文档的中心枢纽，确保从设计说明到。',
    icon: 'home-project-experience-3',
    animation: 'salute',
  },
]

const animationName = ref('idle')

</script>

<template>
  <section
    id="work"
    class="px-5 py-20 sm:px-10"
  >
    <div
      class="w-full text-[#afb0b6]"
    >
      <p
        class="text-3xl font-semibold sm:text-4xl"
      >
        我的工作经历
      </p>

      <div
        class="grid grid-cols-1 mt-12 gap-5 lg:grid-cols-3"
      >
        <div
          class="col-span-1 border border-[#1c1c21] rounded-lg border-solid bg-[#0e0e10]"
        >
          <!-- 开发者模型 -->
          <Developer
            :animation-name="animationName"
          />
        </div>

        <div
          class="col-span-2 border border-[#1c1c21] rounded-lg border-solid bg-[#0e0e10]"
        >
          <div
            class="px-2.5 py-5 sm:px-5 sm:py-10"
          >
            <div
              v-for="item in workExperiences"
              :key="item.id"
              class="grid grid-cols-[auto_1fr] cursor-pointer items-start gap-5 rounded-lg px-2.5 transition-all duration-500 ease-in-out hover:bg-[#1c1c21] sm:px-5"
              @click="animationName = item.animation"
              @pointerover="animationName = item.animation"
              @pointerout="animationName = 'idle'"
            >

              <div
                class="h-full flex flex-col items-center justify-start py-2"
              >
                <div
                  class="h-16 w-16 rounded-3xl bg-[#1a1a1a] p-2"
                >
                  <SvgIcon
                    :icon="item.icon"
                    :size="50"
                  />
                </div>

                <div
                  class="mt-4 h-full w-0.5 flex-1 bg-[#1c1c21] group-last:hidden group-hover:bg-[#3a3a49]"
                />
              </div>

              <div
                class="px-2.5 py-5 sm:p-5"
              >
                <p
                  class="text-[#e4e4e6] font-bold"
                >
                  {{ item.name }}
                </p>

                <p
                  class="mb-5 text-sm"
                >
                  {{ item.pos }} -- <span>{{ item.duration }}</span>
                </p>

                <p
                  class="transition-all duration-500 ease-in-out group-hover:text-white"
                >
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>

</style>
