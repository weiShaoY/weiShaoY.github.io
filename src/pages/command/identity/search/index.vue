<!------  2025-04-24---03:58---星期四  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const searchVal = ref('')

function search() {
  if (searchVal.value) {
    console.log(searchVal.value)
    router.push({
      name: 'CommandIdentityResult',
      query: {
        search: searchVal.value,
      },
    })
  }
}
</script>

<!-- bg-[#103289] -->
<template>
  <div
    class="relative h-full w-full flex items-center justify-center rounded-3 bg-[#103289] p-10"
  >
    <el-input
      v-model.trim="searchVal"
      placeholder="请输入搜索内容"
      clearable
      size="large"
      class="!w-100"
      @keydown.enter.prevent="search"
    >
      <template
        #append
      >
        <ButtonIcon
          icon="search"
          @click="search"
        />
      </template>
    </el-input>

    <div
      class="fixed bottom-30 left-0 right-0 flex flex-col items-center justify-center gap-3 text-white"
    >
      <div
        class="flex items-center justify-center gap-5 text-6"
      >
        <span> 对党忠诚 </span>

        <span> 服务人民 </span>

        <span> 执法公正 </span>

        <span> 纪律严明 </span>
      </div>

      <div
        class=""
      >
        青安市公安局 (2016) 版权所有
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
