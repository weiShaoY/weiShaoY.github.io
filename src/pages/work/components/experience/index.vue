<!------------------------------------  我的经历  ------------------------------------------------->
<script lang="ts" setup>
import Developer from '@/canvas/developer/index.vue'

const workExperiences = [
  {
    id: 1,
    name: 'Framer',
    pos: 'Lead Web Developer',
    duration: '2022 - Present',
    title: 'Framer是我创建交互式原型的首选工具。我用它来实现设计,让利益相关者在开发之前体验用户流和交互。',
    icon: 'home-project-experience-1',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Figma',
    pos: 'Web Developer',
    duration: '2020 - 2022',
    title: 'Figma是我首选的协同设计平台。我利用它与团队成员和客户无缝协作,促进实时反馈和设计迭代。它基于云。',
    icon: 'home-project-experience-2',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Notion',
    pos: 'Junior Web Developer',
    duration: '2019 - 2020',
    title: 'Notion帮助我保持项目的有序性。我使用它进行项目管理、任务跟踪,并将其作为文档的中心枢纽,确保从设计说明到。',
    icon: 'home-project-experience-3',
    animation: 'salute',
  },
]

const animationName = ref('idle')

</script>

<template>
  <section
    id="work"
  >
    <div
      class="w-full"
    >
      <p
        class="text-4xl text-primary font-semibold max-sm:text-3xl"
      >
        我的工作经历
      </p>

      <div
        class="grid grid-cols-3 mt-12 gap-5 max-sm:grid-cols-1"
      >
        <div
          class="col-span-1 rounded-lg card-base"
        >
          <!-- 开发者模型 -->
          <Developer
            :animation-name="animationName"
          />
        </div>

        <div
          class="col-span-2 card-base max-sm:col-span-1"
        >
          <div
            class="px-5 py-10 max-sm:px-2.5 max-sm:py-5"
          >
            <div
              v-for="item in workExperiences"
              :key="item.id"
              class="group grid grid-cols-[auto_1fr] cursor-pointer items-start gap-5 rounded-lg px-5 transition-all duration-500 ease-in-out hover:bg-[#1c1c21] max-sm:px-2.5 hover:text-white"
              @click="animationName = item.animation"
              @pointerover="animationName = item.animation"
              @pointerout="animationName = 'idle'"
            >

              <div
                class="h-full flex flex-col items-center justify-start py-2"
              >
                <div
                  class="h-16 w-16 rounded-3xl bg-[#333333] p-2"
                >
                  <SvgIcon
                    :icon="item.icon"
                    :size="50"
                  />
                </div>

                <div
                  class="mt-4 h-full w-0.5 flex-1 bg-[#1c1c21] group-last:hidden group-hover:bg-white"
                />
              </div>

              <div
                class="p-5 max-sm:px-2.5 max-sm:py-5"
              >
                <p
                  class="text-secondary font-bold"
                >
                  {{ item.name }}
                </p>

                <p
                  class="mb-5 text-sm"
                >
                  {{ item.pos }} -- <span>{{ item.duration }}</span>
                </p>

                <p
                  class="transition-all duration-500 ease-in-out"
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

<style lang="scss" scoped>

</style>
