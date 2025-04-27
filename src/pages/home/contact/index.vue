<script lang="ts" setup>

import Moon from '@/canvas/moon/index.vue'

import { sendContactEmail } from '@/utils'

type FormType = {

  /**
   *  姓名
   */
  name: string

  /**
   *  电子邮件
   */
  email: string

  /**
   *  留言
   */
  message: string
}
const formRef = ref<HTMLFormElement | null>(null)

const form = ref<FormType>({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)

async function handleSubmit(e: Event) {
  e.preventDefault()
  loading.value = true

  try {
    await sendContactEmail(form.value)

    window.$notification?.error({
      title: '邮件发送成功',
      message: '感谢您的留言😃!',
    })
    formRef.value?.reset()
  }
  catch (error) {
    console.error('邮件发送失败:', error)

    window.$notification?.error({
      title: '邮件发送失败',
      message: '我没有收到你的信息😢!',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="relative mx-auto h-full max-w-7xl w-full pt-20"
  >
    <section
      id="contact"
      class="px-5 py-20 text-[#afb0b6] sm:px-10"
    >

      <p
        class="text-3xl font-semibold sm:text-4xl"
      >
        联系我
      </p>

      <div
        class="grid grid-cols-1 mt-12 w-full gap-5 lg:grid-cols-2"
      >
        <!-- 左侧 -->
        <div
          v-light
          class="relative flex flex-col gap-5 rounded-lg px-5 py-10 shadow-[#0e0e10] shadow-2xl sm:p-10"
        >
          <form
            ref="formRef"
            class="mt-12 flex flex-col space-y-7"
            @submit="handleSubmit"
          >
            <label
              class="space-y-3"
            >
              <span
                class="text-lg text-[#afb0b6]"
              >
                姓名
              </span>

              <input
                v-model="form.name"
                type="text"
                name="name"
                required
                class="min-h-14 w-full rounded-lg bg-[#1c1c21] px-5 py-2 text-lg text-[#e4e4e6] shadow-[#0E0E10] shadow-2xl placeholder:text-[#62646c] focus:outline-[#DED9FC]"
                placeholder="例如, 张三"
              >
            </label>

            <label
              class="space-y-3"
            >
              <span
                class="text-lg text-[#afb0b6]"
              >
                电子邮件
              </span>

              <input
                v-model="form.email"
                type="email"
                name="email"
                required
                class="min-h-14 w-full rounded-lg bg-[#1c1c21] px-5 py-2 text-lg text-[#e4e4e6] shadow-[#0E0E10] shadow-2xl placeholder:text-[#62646c] focus:outline-[#DED9FC]"
                placeholder="例如, zhangSan@gmail.com"
              >
            </label>

            <label
              class="space-y-3"
            >
              <span
                class="text-lg text-[#afb0b6]"
              >
                您的留言
              </span>

              <textarea
                v-model="form.message"
                name="message"
                required
                rows="5"
                class="min-h-14 w-full rounded-lg bg-[#1c1c21] px-5 py-2 text-lg text-[#e4e4e6] shadow-[#0E0E10] shadow-2xl placeholder:text-[#62646c] focus:outline-[#DED9FC]"
                placeholder="分享您的想法或询问..."
              />
            </label>

            <button
              class="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a3a49] p-3 text-white transition-all active:scale-95 hover:bg-opacity-70"
              type="submit"
              :disabled="loading"
            >
              {{ loading ? "发送..." : "发送消息" }}
              <SvgIcon
                icon="arrow-top-right"
                size="18"
              />
            </button>
          </form>
        </div>

        <!-- 右侧 -->
        <div
          class="flex items-center justify-center rounded-lg"
        >
          <div
            class="aspect-square w-full"
          >
            <Moon />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
