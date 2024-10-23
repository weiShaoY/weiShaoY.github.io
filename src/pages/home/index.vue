<script setup lang="ts" generic="T extends any, O extends any">

</script>

<template>
  <TheHeader />

  <div
    class="w-ful h-full flex flex-col justify-between overflow-auto"
    :style="{
      paddingTop: `${appStore.app.indexPage.headerHeight}px`,
    }"
  >
    <RouterView />

    <TheFooter />
  </div>
</template>
