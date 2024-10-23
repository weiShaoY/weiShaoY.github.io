<!------------------------------------  resume  ------------------------------------------------->
<script lang="ts" setup>
const current = ref(1)
</script>

<template>
  <div
    class="m-x-auto flex-col flex-1 bg-amber p-t-10 container"
  >
    <VideoPlay />

    <a-steps
      :current="current"
      direction="vertical"
      class="m-x-auto"
    >
      <a-step>
        Succeeded
      </a-step>

      <a-step>
        Processing
      </a-step>

      <a-step>
        Pending
      </a-step>
    </a-steps>

  </div>
</template>

<style lang="less" scoped>

</style>
