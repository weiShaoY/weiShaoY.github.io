<!------------------------------------  对话设置  ------------------------------------------------->
<script lang="ts" setup>
import type { DialogueType } from './index.vue'

const props = defineProps<{

  /**
   *  对话设置
   */
  dialogue: DialogueType
}>()
</script>

<template>
  <div
    class="h-[812px] w-[375px]"
  >
    对话设置
    <div
      class="origin-[0_0] scale-33.333 border border-[#f1f1f1] border-solid"
    >
      <div
        id="phone"
        class="relative z-998 h-[2436px] w-[1125px] bg-[#ededed] text-[36px]"
      >
        1

      </div>

      1

    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
