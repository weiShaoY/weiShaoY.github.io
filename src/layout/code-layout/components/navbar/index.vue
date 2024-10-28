<!------------------------------------  导航栏  ------------------------------------------------->

<script lang="ts" setup>

import { useCodeStore } from '@/store'

import {
  useDark,
  useFullscreen,
  useToggle,
} from '@vueuse/core'

import Menu from '../menu/index.vue'

const codeStore = useCodeStore()

const router = useRouter()

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

/**
 *  暗黑模式
 */
const isDark = useDark({

  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    codeStore.toggleTheme(dark)
  },
})

const toggleTheme = useToggle(isDark)

/**
 *  切换主题
 */
function handleToggleTheme() {
  toggleTheme()
}

/**
 *  显示页面配置
 */
function showGlobalSetting() {
  codeStore.state.globalSetting.visible = true
}

</script>

<template>
  <div
    class="h-full flex items-center justify-between"
    :style="{
      backgroundColor: 'var(--color-bg-2)',
      borderBottom: '1px solid var(--color-border)',
    }"
  >
    <!-- 左侧  -->
    <div
      class="flex items-center p-l-5 hover:cursor-pointer hover:color-primary"
      @click="router.push('/')"
    >
      <SvgIcon
        icon="weiShaoY"
        class="w-30 !h-10"
      />
    </div>

    <div
      class="flex-1"
    >
      <Menu
        v-if="codeStore.state.menu.visible && codeStore.state.menu.position === 'top'"
      />
    </div>

    <ul
      class="right-side"
    >

      <li>
        <a-tooltip
          :content="
            codeStore.state.theme.mode === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="handleToggleTheme"
          >
            <template
              #icon
            >
              <icon-moon-fill
                v-if="codeStore.state.theme.mode === 'dark'"
              />

              <icon-sun-fill
                v-else
              />
            </template>
          </a-button>
        </a-tooltip>
      </li>

      <li>
        <a-tooltip
          :content="
            isFullscreen
              ? '点击退出全屏模式'
              : '点击切换全屏模式'
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleFullScreen"
          >
            <template
              #icon
            >
              <icon-fullscreen-exit
                v-if="isFullscreen"
              />

              <icon-fullscreen
                v-else
              />
            </template>
          </a-button>
        </a-tooltip>
      </li>

      <li>
        <a-tooltip
          content="页面配置"
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="showGlobalSetting"
          >
            <template
              #icon
            >
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>

    </ul>
  </div>
</template>

<style scoped lang="less">
  .navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">

</style>
