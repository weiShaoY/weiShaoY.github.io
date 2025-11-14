<script setup lang="ts">
import { layoutConfig } from '@/configs'

import headerBgImage from './command-header-bg.png'

import buttonActiveBgImage from './command-header-btn-active-bg.png'

import buttonBgImage from './command-header-btn-bg.png'

const router = useRouter()

const route = useRoute()

const titleInfo = ref({
  leftTitle: [
    {
      id: 1,
      name: '身 份 查 询',
      routeName: 'PoliceIdentityQuery',
      children: [],
    },
    {
      id: 2,
      name: '监 控 系 统',
      routeName: 'PoliceMonitorSystem',
      children: [],
    },
    {
      id: 3,
      name: '档 案 系 统',
      routeName: 'PoliceArchiveSystem',
      children: [],
    },
  ],

  rightTitle: [
    {
      id: 3,
      name: '统 计 分 析',
      routeName: 'PoliceStatisticalAnalysis',
    },
    {
      id: 4,
      name: '空 间 管 控',
      routeName: 'PoliceSpaceControl',
    },
  ],
})

const isShowLightImage = ref('PoliceIdentityQuery')

watch(() => route.name, () => {
  isShowLightImage.value = route.name as string
}, {
  deep: true,
  immediate: true,
})

function jumpPage(item: any) {
  isShowLightImage.value = item.routeName
  router.push({
    name: item.routeName,
  })
}

/**
 *   退出登录
 */
function logout() {
  router.push({
    name: 'PoliceLogin',
  })
}
</script>

<template>
  <div
    class="fixed left-0 right-0 top-0 z-100 flex items-center bg-cover bg-center bg-no-repeat"
    :style="{
      backgroundImage: `url(${headerBgImage})`,
      height: `${layoutConfig.police.headerHeight}px`,
    }"
  >

    <div
      class="mb-2 w-1/4 flex items-center gap-3 text-[18px] color-white"
    >
      <div
        v-for="(item, index) in titleInfo.leftTitle"
        :key="index"
        class="relative h-10 w-1/3 flex items-center justify-center bg-[length:100%_100%] text-4 leading-10 hover:cursor-pointer"
        :style="{
          backgroundImage: `url(${isShowLightImage.includes(item.routeName) ? buttonActiveBgImage : buttonBgImage})`,
        }"
        @click="jumpPage(item)"
      >
        <span
          class="from-[#00c8ff] to-[#ffffff] bg-gradient-to-b bg-clip-text text-transparent"
        >
          {{ item.name }}
        </span>
      </div>
    </div>

    <!-- 中间部分 -->
    <div
      class="header-midden relative h-full flex flex-1 items-center justify-center gap-3 overflow-x-hidden color-white"
    >
      <SvgIcon
        icon="command-policeBadge"
        :size="50"
      />

      <div
        class="flex-col items-start"
      >
        <div
          class="flex justify-between text-6 font-bold"
        >
          青安市公安局信息系统
        </div>

        <div
          class="w-full flex items-center justify-between p-l-1 text-4"
        >
          <span>网</span>

          <span>上</span>

          <span>协</span>

          <span>同</span>

          <span>办</span>

          <span>公</span>

          <span>平</span>

          <span>台</span>
        </div>
      </div>
    </div>

    <div
      class="mb-2 w-1/4 flex items-center gap-3 text-[18px] color-white"
    >
      <div
        v-for="(item, index) in titleInfo.rightTitle"
        :key="index"
        class="relative h-10 w-1/3 flex items-center justify-center bg-[length:100%_100%] text-4 leading-10 hover:cursor-pointer"
        :style="{
          backgroundImage: `url(${isShowLightImage === item.routeName ? buttonActiveBgImage : buttonBgImage})`,
        }"
        @click="jumpPage(item)"
      >
        <span
          class="from-[#00c8ff] to-[#ffffff] bg-gradient-to-b bg-clip-text text-transparent"
        >
          {{ item.name }}
        </span>
      </div>

      <!-- 退出登录 -->
      <el-popconfirm
        title="确认退出登录?"
        placement="bottom-end"
        theme="dark"
        @confirm="logout"
      >
        <template
          #reference
        >
          <div
            class="relative h-10 w-1/3 flex items-center justify-center bg-[length:100%_100%] text-4 leading-10 hover:cursor-pointer"
            :style="{
              backgroundImage: `url(${isShowLightImage === 'CommandLogin' ? buttonActiveBgImage : buttonBgImage})`,
            }"
          >
            <span
              class="from-[#00c8ff] to-[#ffffff] bg-gradient-to-b bg-clip-text text-transparent"
            >
              退 出 登 录
            </span>
          </div>
        </template>
      </el-popconfirm>
    </div>

  </div>
</template>
