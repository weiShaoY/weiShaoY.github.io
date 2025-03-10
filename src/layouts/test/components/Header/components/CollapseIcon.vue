<script setup lang="ts">
import { useTestStore } from '@/store/modules/test'

const testStore = useTestStore()

const changeCollapse = () => testStore.setGlobal('isCollapse', !testStore.global.isCollapse)
</script>

<template>
  <el-icon
    class="collapse-icon"
    @click="changeCollapse"
  >
    <component
      :is="testStore.global.isCollapse ? 'expand' : 'fold'"
    />
  </el-icon>
</template>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
