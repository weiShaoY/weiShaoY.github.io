<!------------------------------------    ------------------------------------------------->
<script setup lang="ts">

import { useRouter } from 'vue-router'

import Earth from '@/canvas/earth/index.vue'

import Keyboard from '@/canvas/keyboard/index.vue'

import Mail from '@/canvas/mail/index.vue'

import Tech from '@/canvas/tech/index.vue'

import { copyText } from '@/utils'

const hasCopied = ref(false)

const router = useRouter()

const emailUrl = import.meta.env.VITE_EMAIL_URL

function handleContactMe() {
  router.push({
    name: 'Contact',
  })
}

function handleCopy() {
  copyText(emailUrl)
  hasCopied.value = true
  window.$notification?.success({
    title: '邮箱复制成功',
    message: emailUrl,
  })

  setTimeout(() => {
    hasCopied.value = false
  }, 2000)
}
</script>

<template>
  <section
    id="info"
  >
    <div
      class="grid grid-cols-1 h-full gap-5"
    >
      <!-- 技术栈 -->
      <div
        class="col-span-2 row-span-3 max-sm:col-span-12"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-7 max-sm:p-4"
        >
          <div
            class="h-[266px] w-full cursor-pointer max-sm:h-fit"
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
        class="col-span-1 row-span-4 max-sm:col-span-12"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-7 max-sm:p-4"
        >
          <div
            class="h-[326px] w-full flex items-center justify-center rounded-3xl max-sm:h-fit"
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
        class="col-span-2 row-span-3 max-sm:col-span-12"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-7 max-sm:p-4"
        >
          <div
            class="h-[266px] cursor-pointer max-sm:w-full"
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
        class="col-span-1 row-span-2 max-sm:col-span-12"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-7 max-sm:p-4"
        >
          <div
            class="aspect-square h-[120px] w-full cursor-pointer max-sm:h-fit"
          >
            <Mail />
          </div>

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
                :icon="hasCopied ? 'home-about-tick' : 'home-about-copy'"
                class="!h-8 !w-8"
              />

              <p
                class="from-[60%] via-[60%] to-[100%] from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-gradient-to-r bg-clip-text text-2xl text-white font-medium max-sm:text-xl"
              >
                {{ emailUrl }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Github活动图 -->
      <GithubActivityGraph
        class="col-span-3 row-span-2 max-sm:col-span-12"
      />
    </div>
  </section>
</template>
