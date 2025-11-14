<!------  2025-04-24---09:52---星期四  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <div
    class="h-full flex-col rounded-3 bg-white p-10"
  >
    <el-page-header
      @back="() => $router.go(-1)"
    >
      <template
        #content
      >
        <span
          class="text-large mr-3 font-semibold"
        > Title </span>
      </template>
    </el-page-header>

    <div
      class="flex flex-1 items-center justify-center text-10"
    >
      查询详情
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
