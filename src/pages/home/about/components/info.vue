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
      class="grid grid-cols-3 h-full w-full gap-5"
    >
      <!-- 技术栈 -->
      <div
        class="col-span-2 row-span-3 max-sm:col-span-3"
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
              class="text-regular mb-2 text-xl font-semibold"
            >
              技术栈
            </p>

            <p
              class="text-base"
            >
              我擅长各种语言、框架和工具，它们让我能够构建强大且可扩展的应用程序
            </p>
          </div>
        </div>
      </div>

      <!-- 地球部分 -->
      <div
        class="col-span-1 row-span-4 max-sm:col-span-3"
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
              class="text-regular mb-2 text-xl font-semibold"
            >
              我对时区、通讯和位置非常灵活
            </p>

            <p
              class="text-base"
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
        class="col-span-2 row-span-3 max-sm:col-span-3"
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
              class="text-regular mb-2 text-xl font-semibold"
            >
              我对编码的热情
            </p>

            <p
              class="text-base"
            >
              我喜欢通过代码解决问题和构建事物,喜欢探索新技术并提高自己的技能。
            </p>
          </div>
        </div>
      </div>

      <!-- 联系我部分 -->
      <div
        class="col-span-1 row-span-2 max-sm:col-span-3"
      >
        <div
          class="h-full w-full flex flex-col gap-5 border border-[#1c1c21] rounded-lg border-solid bg-[#0E0E10] p-7 max-sm:p-4"
        >
          <div
            class="aspect-square h-[120px] w-full cursor-pointer max-sm:h-fit"
          >
            <Mail />
          </div>

          <button
            class="mx-auto mt-10 w-full flex cursor-pointer items-center justify-center gap-4 rounded-md bg-[#1c1c21] p-3 text-white transition-all active:scale-95"
            type="button"
            @click="handleCopy"
          >
            <span
              class="relative h-3 w-3 flex"
            >
              <span
                class="absolute h-full w-full inline-flex animate-ping rounded-full bg-[#CC171D] opacity-75"
              />

              <span
                class="relative h-3 w-3 inline-flex rounded-full bg-[#CC171D]"
              />
            </span>
            {{ emailUrl }}
          </button>
        </div>
      </div>

      <!-- Github活动图 -->

      <!-- github-readme-stats -->
      <div
        class="col-span-1 row-span-2 max-sm:col-span-3"
      >
        <img
          src="https://github-readme-stats.vercel.app/api?username=weiShaoY&theme=chartreuse-dark&show_icons=true&hide_border=true&count_private=true&locale=cn&bg_color=0E0E10&line_height=36"
          alt=""
          class="h-full w-full"
        >
      </div>

      <div
        class="col-span-1 row-span-2 max-sm:col-span-3"
      >
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=weiShaoY&theme=chartreuse-dark&hide_border=true&include_all_commits=true&count_private=truechart&locale=cn&bg_color=0E0E10&layout=compact"
          alt=""
          class="h-60 w-full"
        >
      </div>

      <div
        class="col-span-1 row-span-2 max-sm:col-span-3"
      >
        <img
          src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=weiShaoY&theme=highcontrast"
          alt=""
          class="h-60 w-full"
        >

        <!-- <img
          src="https://github-readme-activity-graph.vercel.app/graph?username=weiShaoY&theme=merko&hide_border=true&radius=8&bg_color=0E0E10&line=00ff00&point=ffffff&custom_title=Github%20%E8%B4%A1%E7%8C%AE%E5%9B%BE"
          alt=""
          class="h-[212px] w-full"
        > -->

        <!-- <img
          src="https://pixel-profile.vercel.app/api/github-stats?username=weiShaoY&theme=crt&pixelate_avatar=false"
          alt=""
          class="h-[212px] w-full"
        > -->
      </div>

    </div>

  </section>
</template>
