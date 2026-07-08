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

    window.$notification?.success({
      title: '邮件发送成功',
      message: '感谢您的留言😃!',
    })
    formRef.value?.reset()
  }
  catch {
    window.$notification.error('邮件发送失败')

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
    class="relative mx-auto h-full max-w-7xl w-full px-10 py-40 max-sm:px-5"
  >
    <section
      id="contact"
      class=""
    >
      <p
        class="text-4xl text-primary font-semibold max-sm:text-3xl"
      >
        联系我
      </p>

      <div
        class="grid grid-cols-2 mt-12 w-full gap-5 max-sm:grid-cols-1"
      >
        <!-- 左侧 -->
        <div
          v-light
          class="relative flex flex-col gap-5 card-base p-10 shadow-[#0e0e10] shadow-2xl max-sm:px-5 max-sm:py-10"
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
                class="text-lg text-secondary"
              >
                姓名
              </span>

              <input
                v-model="form.name"
                type="text"
                name="name"
                required
                class="min-h-14 w-full rounded-lg bg-[#1c1c21] px-5 py-2 text-lg text-primary shadow-[#0E0E10] shadow-2xl placeholder:text-info focus:outline-[#DED9FC]"
                placeholder="例如, 张三"
              >
            </label>

            <label
              class="space-y-3"
            >
              <span
                class="text-lg text-secondary"
              >
                电子邮件
              </span>

              <input
                v-model="form.email"
                type="email"
                name="email"
                required
                class="min-h-14 w-full rounded-lg bg-[#1c1c21] px-5 py-2 text-lg text-primary shadow-[#0E0E10] shadow-2xl placeholder:text-info focus:outline-[#DED9FC]"
                placeholder="例如, zhangSan@gmail.com"
              >
            </label>

            <label
              class="space-y-3"
            >
              <span
                class="text-lg text-secondary"
              >
                您的留言
              </span>

              <textarea
                v-model="form.message"
                name="message"
                required
                rows="5"
                class="min-h-14 w-full rounded-lg bg-[#1c1c21] px-5 py-2 text-lg text-primary shadow-[#0E0E10] shadow-2xl placeholder:text-info focus:outline-[#DED9FC]"
                placeholder="分享您的想法或询问..."
              />
            </label>

            <button
              class="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a3a49] p-3 text-secondary transition-all active:scale-95 hover:bg-opacity-70 hover:text-primary!"
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
