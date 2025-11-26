<!------  2025-11-25---16:54---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { adminMittBus } from '@/utils'

const isWindows = navigator.userAgent.includes('Windows')

/**
 *  打开顶部搜索框
 */
function openSearchDialog() {
  adminMittBus.emit('openSearchDialog')
}

</script>

<template>
  <div
    class="group h-9 w-40 flex items-center justify-between border border-[#dbdfe9] rounded-3 border-solid p-x-3 hover:cursor-pointer"
    @click="openSearchDialog"
  >
    <div
      class="left"
    >
      <SvgIcon
        icon="search"
        class="transition-transform duration-300 !group-hover:scale-130"
      />

      <span
        class="ml-2 text-[13px] color-[#99a1b7]"
      > 搜索 </span>
    </div>

    <div
      class="h-5 flex items-center border border-[#dbdfe9] rounded-1 border-solid bg-[#fafbfc] p-x-[6px] color-[#99a1b7]"
    >
      <span
        class="text-3"
      >
        {{ isWindows ? "ctrl" : "⌘" }}
      </span>

      <span
        class="ml-2 text-3"
      >
        k
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
