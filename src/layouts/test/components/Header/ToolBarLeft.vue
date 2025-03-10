<script setup lang="ts">
import { useTestStore } from '@/store/modules/test'

import Breadcrumb from './components/Breadcrumb.vue'

import CollapseIcon from './components/CollapseIcon.vue'

const testStore = useTestStore()
</script>

<template>
  <div
    class="tool-bar-lf"
  >
    <CollapseIcon
      id="collapseIcon"
    />

    <Breadcrumb
      v-show="testStore.global.breadcrumb"
      id="breadcrumb"
    />
  </div>
</template>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
