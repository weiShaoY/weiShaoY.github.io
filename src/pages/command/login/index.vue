<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

import { CommandApi } from '@/api'

import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 状态码枚举
 */
enum ResultCode {
  Success = 200,
  Error = 500,
}

const formRef = ref<FormInstance>()

const formData = ref({
  username: 'admin',
  password: '123456',
})

const formRules = ref<FormRules> ({
  username: [{
    required: true,
    message: '请输入用户警号',
    trigger: 'blur',
  }],
  password: [{
    required: true,
    message: '请输入用密码',
    trigger: 'blur',
  }],
})

const isLoading = ref(false)

/**
 * 提交登录表单
 */
async function handleSubmit() {
  if (!formRef.value) {
    return
  }

  try {
    const valid = await formRef.value.validate()

    if (!valid) {
      return
    }

    isLoading.value = true

    // 延时辅助函数
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const res = await CommandApi.login({
      body: JSON.stringify({
        username: formData.value.username,
        password: formData.value.password,
      }),
    })

    if (res.code === ResultCode.Success && res.data) {
      // 处理 token、用户信息等逻辑
      await delay(1000)
      window.$notification?.success('登录成功')

      router.push({
        name: 'CommandSearch',
      })
    }
    else {
      window.$message?.error(res.message)
    }
  }
  catch (err) {
    console.error('表单校验失败或登录异常:', err)
  }
  finally {
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }
}
</script>

<template>
  <GoHomeButton />

  <div
    class="h-full min-h-screen w-full flex items-center justify-center bg-[#103289]"
  >

    <div
      class="flex-col items-center gap-6"
    >
      <!-- 顶部 警徽和标题 -->
      <div
        class="flex items-center gap-2 color-white"
      >
        <SvgIcon
          icon="command-policeBadge"
          :size="70"
        />

        <div
          class="text-8 font-bold"
        >
          京城市公安局
        </div>

        <div
          class="text-7"
        >
          |
        </div>

        <div
          class="text-6"
        >
          网上协同办公平台
        </div>
      </div>

      <div
        class="h-80 w-160 flex items-center justify-center rounded-2 bg-white px-30"
      >
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          class="w-full"
          @keyup.enter="handleSubmit"
        >
          <el-form-item
            prop="username"
            label="警号"
          >
            <el-input
              v-model.trim="formData.username"
              placeholder="请输入警号"
              size="large"
            />
          </el-form-item>

          <el-form-item
            prop="password"
            label="密码"
          >
            <el-input
              v-model.trim="formData.password"
              type="password"
              autocomplete="off"
              size="large"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>

          <el-form-item
            class="!m-0"
          >
            <el-button
              class="mx-auto mt-6 w-40"
              type="primary"
              size="large"
              :loading="isLoading"
              @click="handleSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div
        class="text-5 color-white"
      >
        京城市公安局 (2025)   版权所有
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
