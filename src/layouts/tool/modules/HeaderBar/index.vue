<!------  2025-11-23---03:12---星期天  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

import { MenuTypeEnum } from '@/enums/tool'

import { useSettingStore, useToolStore } from '@/stores'

import FastEnter from './components/fastEnter/index.vue'

import Fullscreen from './components/fullscreen/index.vue'

import Search from './components/search/index.vue'

import Setting from './components/setting/index.vue'

const router = useRouter()

const { width } = useWindowSize()

const settingStore = useSettingStore()

const toolStore = useToolStore()

const isWindows = navigator.userAgent.includes('Windows')

// 菜单类型判断
const isLeftMenu = computed(() => toolStore.settingObj.menuType === MenuTypeEnum.LEFT)

const isDualMenu = computed(() => toolStore.settingObj.menuType === MenuTypeEnum.DUAL_MENU)

const isTopMenu = computed(() => toolStore.settingObj.menuType === MenuTypeEnum.TOP)

const isTopLeftMenu = computed(() => toolStore.settingObj.menuType === MenuTypeEnum.TOP_LEFT)

/**
 * 切换菜单显示/隐藏状态
 */
function visibleMenu(): void {
  // toolStore.setMenuOpen(!menuOpen.value)
}

/**
 * 跳转到首页
 */
function toHome(): void {
  router.push(toolStore.menuObj.homePath)
}

</script>

<template>
  <div
    class="w-full bg-[var(--default-bg-color)]"
    :class="[
      toolStore.settingObj.tabStyle === 'tab-card' || toolStore.settingObj.tabStyle === 'tab-google' ? 'mb-5 max-sm:mb-3 !bg-white' : '',
    ]"
  >
    <div
      class="relative box-border h-15 flex select-none justify-between leading-15"
      :class="[
        toolStore.settingObj.tabStyle === 'tab-card' || toolStore.settingObj.tabStyle === 'tab-google'
          ? 'border-b border-[var(--art-card-border)]'
          : '',
      ]"
    >
      <div
        class="min-w-0 flex flex-1 items-center leading-15"
      >

        <!-- 系统信息  -->
        <div
          v-if="isTopMenu"
          class="flex cursor-pointer justify-between"
          @click="toHome"
        >
          <SvgIcon
            icon="logo"
            :size="36"
            class="pl-4.5"
          />

          <p
            v-if="width >= 1400"
            class="mx-2 my-0 ml-2 text-lg"
          >
            系统名称
          </p>
        </div>

        <SvgIcon
          icon="logo"
          :size="36"
          class="overflow-hidden pl-3.5 align-[-0.15em] !hidden"
          @click="toHome"
        />

        <!-- 菜单按钮 -->
        <BaseButton
          v-if="isLeftMenu"
          icon="tool-header-menu"
          class=""
          @click="visibleMenu"
        />

        <!-- 刷新按钮 -->
        <BaseButton
          v-if="isLeftMenu"
          icon="tool-header-reload"
          class="max-sm:!hidden"
          :rotate="true"
          @click="toolStore.settingObj.reload"
        />

        <!-- 快速入口 -->

        <FastEnter
          v-if=" width >= 1200"
        />

        <!-- 面包屑 -->
        <!-- <ArtBreadcrumb
          v-if="(isLeftMenu) || (isDualMenu)"
        /> -->

        <!-- 顶部菜单 -->
        <!-- <ArtHorizontalMenu
          v-if="isTopMenu"
          :list="menuList"
        /> -->

        <!-- 混合菜单-顶部 -->
        <!-- <ArtMixedMenu
          v-if="isTopLeftMenu"
          :list="menuList"
        /> -->
      </div>

      <div
        class="flex items-center gap-2.5"
      >
        <!-- 搜索 -->
        <Search />

        <!-- 全屏按钮 -->
        <Fullscreen />

        <!-- 主题切换按钮 -->
        <SwitchTheme />

        <!-- 设置按钮 -->
        <Setting />

      </div>
    </div>

    <!-- 标签页 -->
    <!-- <ArtWorkTab /> -->

  </div>
</template>

<style lang="scss" scoped>
  /* Custom animations */
@keyframes rotate180 {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(180deg);
  }
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(5deg);
  }

  75% {
    transform: rotate(-5deg);
  }

  100% {
    transform: rotate(0);
  }
}

@keyframes expand {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shrink {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes breathing {
  0% {
    opacity: 0.4;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }

  100% {
    opacity: 0.4;
    transform: scale(0.9);
  }
}

/* Hover animation classes */
.refresh-btn:hover :deep(.art-svg-icon) {
  animation: rotate180 0.5s;
}

.language-btn:hover :deep(.art-svg-icon) {
  animation: moveUp 0.4s;
}

.setting-btn:hover :deep(.art-svg-icon) {
  animation: rotate180 0.5s;
}

.full-screen-btn:hover :deep(.art-svg-icon) {
  animation: expand 0.6s forwards;
}

.exit-full-screen-btn:hover :deep(.art-svg-icon) {
  animation: shrink 0.6s forwards;
}

.notice-button:hover :deep(.art-svg-icon) {
  animation: shake 0.5s ease-in-out;
}

.chat-button:hover :deep(.art-svg-icon) {
  animation: shake 0.5s ease-in-out;
}

/* Breathing animation for chat dot */
.breathing-dot {
  animation: breathing 1.5s ease-in-out infinite;
}

/* iPad breakpoint adjustments */
@media screen and (width <= 768px) {
  .logo2 {
    display: block !important;
  }
}

@media screen and (width <= 640px) {
  .btn-box {
    width: 40px;
  }
}
</style>
