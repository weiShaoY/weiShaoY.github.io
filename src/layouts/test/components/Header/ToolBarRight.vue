<script setup lang="ts">

import AssemblySize from './components/AssemblySize.vue'

import Fullscreen from './components/Fullscreen.vue'

import SearchMenu from './components/SearchMenu.vue'

import ThemeSetting from './components/ThemeSetting.vue'

</script>

<template>
  <div
    class="tool-bar-ri"
  >
    <div
      class="header-icon"
    >
      <AssemblySize
        id="assemblySize"
      />

      <SearchMenu
        id="searchMenu"
      />

      <ThemeSetting
        id="themeSetting"
      />

      <Fullscreen
        id="fullscreen"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
}
</style>
