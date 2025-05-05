<!------------------------------------  教育片  ------------------------------------------------->
<script lang="ts" setup>
import { ref } from 'vue'

import { siteList } from './data'

import SiteBtn from './site_btn.vue'

const videoName = ref('IPX-850')

// const isLoading = ref(false)

</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >
      <el-input
        v-model.trim="videoName"
        clearable
        size="large"
        placeholder="请输入番号"
        class="!max-w-[30%] !overflow-hidden"
      />
    </div>

    <div
      v-if="videoName.length > 0"
      class="flex border-gray-300 rounded-2 bg-white p-3 shadow-md ease-in-out"
      :style="{
        boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #EBEBEB',
      }"
    >
      <!-- 遍历站点列表，根据条件渲染 SiteBtn 组件 -->
      <div
        class="w-full flex flex-wrap items-center justify-evenly gap-8 rounded-2 bg-[#2a2b2f] p-3"
      >
        <template
          v-for="siteItem in siteList"
          :key="siteItem.name"
        >
          <SiteBtn
            :site-item="siteItem"
            :code="videoName"
            :multiple-navi="true"
          />
        </template>
      </div>
    </div>
  </div>
</template>
