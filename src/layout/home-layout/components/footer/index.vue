<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const visible = ref(false)

</script>

<template>
  <a-modal
    v-model:visible="visible"
  >
    <template
      #title
    >
      Title
    </template>

    <iframe
      src="https://oa-green.dentsu.com.cn/openapi/index.html#/FlowSvg?url=openapi&flowguid=859a424e-3189-4d1d-8566-03caceb724ba"
      frameborder="0"
      class="h-[300px] w-[300px]"
    />
  </a-modal>

  <footer
    class="p-y-5 text-center text-3xl font-bold"
  >
    <a-button
      @click="visible = true"
    >
      test
    </a-button>
    代码改变世界
  </footer>
</template>

<style lang="less">
.arco-modal {
  width: 90vw !important;
  height: 90vh !important;

  .arco-modal-body {
    height: 90% !important;
  }
}
// :deep(.arco-modal) {
//   width: 90vw !important;
// }
</style>
