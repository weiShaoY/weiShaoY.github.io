<!------  2025-04-05---03:45---星期六  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import Left from './components/left.vue'

import Right from './components/right.vue'

</script>

<template>
  <ElSpace
    direction="vertical"
    fill
    class="pb-0"
    :size="0"
  >

    <ElRow
      :gutter="18"
    >
      <ElCol
        :lg="12"
        :sm="24"
        class="mb-[16px]"
      >
        <ElCard
          class="card-wrapper"
        >
          <Left />
        </ElCard>
      </ElCol>

      <ElCol
        :lg="12"
        :sm="24"
        class="mb-[16px]"
      >
        <ElCard
          class="card-wrapper"
        >
          <Right />
        </ElCard>
      </ElCol>
    </ElRow>
  </ElSpace>
</template>

<style lang="scss" scoped>
</style>
