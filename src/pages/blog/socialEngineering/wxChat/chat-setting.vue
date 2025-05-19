<!------------------------------------  对话设置  ------------------------------------------------->
<script lang="ts" setup>
import { useWxChatStore } from "@/store";

import { Close, Plus } from "@element-plus/icons-vue";

import GenerateForm from "./components/generate-form.vue";

import { addTypes } from "./data";

const SYSTEM_TYPES = ["time", "system"] as const;

const wxChatStore = useWxChatStore();

const addTypeName = ref("");

// 监听器
watch(
  () => [wxChatStore.activeChatType, wxChatStore],
  () => {
    const sendRole = !SYSTEM_TYPES.includes(
      wxChatStore.activeChatType as (typeof SYSTEM_TYPES)[number],
    )
      ? wxChatStore.activeUserId === wxChatStore.DEFAULT_USER.id
        ? "你自己："
        : `${wxChatStore.activeUser?.nickname}："''`
      : "";

    const type = addTypes.find(
      (item) => item.value === wxChatStore.activeChatType,
    );

    addTypeName.value = sendRole + (type?.label ?? "");
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="p-5">
    <el-form label-width="auto" class="w-full" label-position="top">
      <!-- 用户选择区域 -->
      <el-form-item label="编辑和选择用户（第一个用户默认是自己）">
        <el-radio-group
          v-model="wxChatStore.activeUserId"
          class="w-full flex flex-wrap items-center gap-3 rounded bg-gray-100 p-3"
        >
          <template
            v-for="(user, index) in wxChatStore.userList"
            :key="user.id"
          >
            <div
              class="relative h-22 w-22 flex flex-col cursor-pointer items-center justify-between rounded"
            >
              <!-- 头像区域 -->
              <div class="relative h-15 w-15">
                <ImageEditor
                  class="h-full w-full object-cover"
                  :imageInfo="{
                    url: user.avatar as string,
                    width: 60,
                    height: 60,
                  }"
                  :aspectRatio="1"
                  @use="(url) => (user.avatar = url)"
                />

                <el-radio class="absolute bottom-6 left-0" :value="user.id" />
              </div>

              <!-- 昵称区域 -->
              <template v-if="index === 0">
                <p class="max-w-[80%] truncate text-sm">
                  {{ user.nickname }}
                </p>
              </template>

              <el-input
                v-else
                v-model="user.nickname"
                size="small"
                clearable
                class="!text-center"
              />

              <!-- 删除按钮 -->
              <el-popconfirm
                v-if="index !== 0 && wxChatStore.userList.length > 2"
                title="确认移除这个用户？"
                @confirm="wxChatStore.deleteUser(user.id)"
              >
                <template #reference>
                  <div
                    class="bg-red-500 hover:bg-red-600 absolute right-1.5 z-999 h-4.5 w-4.5 flex items-center justify-center rounded-full text-xs text-white transition-colors -top-1.5"
                  >
                    <el-icon>
                      <Close />
                    </el-icon>
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </template>

          <!-- 添加按钮 -->
          <div
            class="h-22 w-22 flex cursor-pointer items-center justify-center border border-gray-300 border-dashed text-6 text-gray-300 transition-all hover:border-pink-500 hover:text-pink-500"
            @click="wxChatStore.addUser"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </el-radio-group>
      </el-form-item>

      <el-divider />

      <!-- 消息类型选择 -->
      <el-tabs v-model="wxChatStore.activeChatType">
        <el-tab-pane
          v-for="item in addTypes"
          :key="item.value"
          :label="item.label"
          :name="item.value"
        />
      </el-tabs>

      <!-- 消息生成表单 -->
      <GenerateForm :title="addTypeName" />
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// 移除所有自定义样式，使用 UnoCSS 类替代
</style>
