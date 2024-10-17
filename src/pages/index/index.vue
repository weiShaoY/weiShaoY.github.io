<script setup lang="ts" generic="T extends any, O extends any">

</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <div class="mx-auto container">
      <TheHeader />

      <div class="h-full">
        <RouterView />
      </div>
    </div>
    <TheFooter />
  </div>
</template>
