<!------------------------------------    ------------------------------------------------->
<script setup lang="ts">
import contactImage from '@/assets/images/home-about-info-contact.png'

// import passionImage from '@/assets/images/home-about-info-passion.png'

import Earth from '@/canvas/earth/index.vue'

import Keyboard from '@/canvas/keyboard/index.vue'

import Tech from '@/canvas/tech/index.vue'

import { copyText } from '@/utils'

import { useRouter } from 'vue-router'

const hasCopied = ref(false)

const router = useRouter()

function handleContactMe() {
  router.push({
    name: 'Contact',
  })
}

function handleCopy() {
  copyText('1604705673@qq.com')
  hasCopied.value = true

  setTimeout(() => {
    hasCopied.value = false
  }, 2000)
}
</script>

<template>
  <section
    id="info"
    class="px-5 py-20 sm:px-10"
  >
    <div
      class="grid grid-cols-1 h-full gap-5 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6"
    >
      <!-- 技术栈 -->
      <div
        class="xl:col-span-2 xl:row-span-3"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-4 sm:p-7"
        >
          <div
            class="h-fit w-full cursor-pointer sm:h-[266px]"
          >
            <Tech />
          </div>

          <div>
            <p
              class="mb-2 text-xl text-white font-semibold"
            >
              技术栈
            </p>

            <p
              class="text-base text-[#afb0b6]"
            >
              我擅长各种语言、框架和工具，它们让我能够构建强大且可扩展的应用程序
            </p>
          </div>
        </div>
      </div>

      <!-- 地球部分 -->
      <div
        class="col-span-1 xl:row-span-4"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-4 sm:p-7"
        >
          <div
            class="h-fit w-full flex items-center justify-center rounded-3xl sm:h-[326px]"
          >
            <Earth
              :height="326"
            />
          </div>

          <div>
            <p
              class="mb-2 text-xl text-white font-semibold"
            >
              我对时区、通讯和位置非常灵活
            </p>

            <p
              class="text-base text-[#afb0b6]"
            >
              我居住在湖南长沙，愿意进行远程工作。
            </p>

            <button
              class="mx-auto mt-10 w-full flex cursor-pointer items-center justify-center gap-4 rounded-md bg-[#1c1c21] p-3 text-white transition-all active:scale-95"
              type="button"
              @click="handleContactMe"
            >
              <span
                class="relative h-3 w-3 flex"
              >
                <span
                  class="absolute h-full w-full inline-flex animate-ping rounded-full bg-[#4ade80] opacity-75"
                />

                <span
                  class="relative h-3 w-3 inline-flex rounded-full bg-[#22c55e]"
                />
              </span>
              联系我
            </button>
          </div>
        </div>
      </div>

      <!-- 编码热情部分 -->
      <div
        class="xl:col-span-2 xl:row-span-3"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-4 sm:p-7"
        >
          <!-- <img
            :src="passionImage"
            alt="grid-3"
            class="h-fit w-full object-contain sm:h-[266px]"
          > -->
          <div
            class="h-fit w-full cursor-pointer sm:h-[266px]"
          >
            <Keyboard />
          </div>

          <div>
            <p
              class="mb-2 text-xl text-white font-semibold"
            >
              我对编码的热情
            </p>

            <p
              class="text-base text-[#afb0b6]"
            >
              我喜欢通过代码解决问题和构建事物,喜欢探索新技术并提高自己的技能。
            </p>
          </div>
        </div>
      </div>

      <!-- 联系我部分 -->
      <div
        class="xl:col-span-1 xl:row-span-2"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-4 sm:p-7"
        >
          <img
            :src="contactImage"
            alt="grid-4"
            class="h-fit w-full object-cover md:h-[126px] sm:h-[276px] sm:object-top"
          >

          <div
            class="space-y-2"
          >
            <p
              class="text-center text-base text-[#afb0b6]"
            >
              联系我
            </p>

            <div
              class="h-10 flex cursor-pointer items-center justify-center gap-2"
              @click="handleCopy"
            >

              <SvgIcon
                :icon="hasCopied ? 'tick' : 'copy'"
                class="!h-8 !w-8"
              />

              <p
                class="from-[60%] via-[60%] to-[100%] from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-gradient-to-r bg-clip-text text-white font-medium lg:text-2xl md:text-xl"
              >
                1604705673@qq.com
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
