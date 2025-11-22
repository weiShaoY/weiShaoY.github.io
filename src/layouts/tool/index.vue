<!-- 布局容器 -->
<script setup lang="ts">
import HeaderBar from './modules/HeaderBar/index.vue'

import SidebarMenu from './modules/SidebarMenu/index.vue'

defineOptions({
  name: 'AppLayout',
})
</script>

<template>
  <div
    class="app-layout"
  >
    <aside
      id="app-sidebar"
    >
      <SidebarMenu />
    </aside>

    <main
      id="app-main"
    >
      <div
        id="app-header"
      >
        <HeaderBar />
      </div>

      <div
        id="app-content"
      >
        <ArtPageContent />
      </div>
    </main>

    <div
      id="app-global"
    >
      <ArtGlobalComponent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // @use './style';
</style>
