<!------  2025-11-25---17:14---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

// import { TOOL_CONFIG } from '@/configs'

// import { useToolStore } from '@/stores'

import BasicSettings from './widget/BasicSettings.vue'

import BoxStyleSettings from './widget/BoxStyleSettings.vue'

import ColorSettings from './widget/ColorSettings.vue'

import ContainerSettings from './widget/ContainerSettings.vue'

import MenuLayoutSettings from './widget/MenuLayoutSettings.vue'

import MenuStyleSettings from './widget/MenuStyleSettings.vue'

import ThemeSettings from './widget/ThemeSettings.vue'

const visible = ref(false)

function handleDrawerClose() {
  visible.value = false
}

function handleOpen() {
  visible.value = true
}

</script>

<template>
  <BaseButton
    icon="tool-header-setting"
    class=""
    :rotate="true"
    @click="visible = true"
  />

  <ElDrawer
    v-model="visible"
    size="300px"
    :lock-scroll="true"
    :with-header="false"
    :before-close="handleDrawerClose"
    :destroy-on-close="false"
    modal-class="setting-modal"
    @open="handleOpen"
    @close="handleDrawerClose"
  >
    <div
      class="drawer-con"
    >
      <!-- 顶部关闭按钮 -->
      <div
        class="flex justify-end"
      >
        <BaseButton
          icon="close"
          @click="handleDrawerClose"
        />
      </div>

      <!-- 主题风格 -->
      <ThemeSettings />

      <!-- 菜单布局 -->
      <MenuLayoutSettings />

      <!-- 菜单风格 -->
      <MenuStyleSettings />

      <!-- 系统主题色 -->
      <ColorSettings />

      <!-- 盒子样式 -->
      <BoxStyleSettings />

      <!-- 容器宽度 -->
      <ContainerSettings />

      <!-- 基础配置 -->
      <BasicSettings />

    </div>
  </ElDrawer>
</template>

<style lang="scss">
  @use './style';
</style>
