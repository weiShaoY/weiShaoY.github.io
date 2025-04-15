<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import type { LayoutMode } from '@sa/materials'

import { useTestStore } from '@/store'

import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@sa/materials'

import GlobalContent from './modules/global-content/index.vue'

import GlobalHeader from './modules/global-header/index.vue'

import GlobalSider from './modules/global-sider/index.vue'

import GlobalTab from './modules/global-tab/index.vue'

import ThemeDrawer from './modules/theme-drawer/index.vue'

const testStore = useTestStore()

/**
 *  当前激活的一级菜单是否有子菜单
 */
const isActiveFirstLevelMenuHasChildren = ref(false)

/** 获取头部属性配置 */
/** 获取头部属性配置 */
const globalHeaderProps = computed(() => {
  const { mode, reverseHorizontalMix } = testStore.theme.layout

  const headerPropsConfig: Record<BlogType.Theme.Setting['layout']['mode'], {

    /** 是否显示 logo */
    showLogo?: boolean

    /** 是否显示菜单切换按钮 */
    showMenuToggler?: boolean

    /** 是否显示菜单 */
    showMenu?: boolean
  }> = {
    'vertical': {
      showLogo: false,
      showMenu: false,
      showMenuToggler: true,
    },
    'vertical-mix': {
      showLogo: false,
      showMenu: false,
      showMenuToggler: false,
    },
    'horizontal': {
      showLogo: true,
      showMenu: true,
      showMenuToggler: false,
    },
    'horizontal-mix': {
      showLogo: true,
      showMenu: true,
      showMenuToggler: reverseHorizontalMix && isActiveFirstLevelMenuHasChildren.value,
    },
  }

  return headerPropsConfig[mode]
})
</script>

<template>
  <AdminLayout
    v-model:sider-collapse="testStore.app.siderCollapse"
  >
    <template
      #header
    >

      <GlobalHeader
        v-bind="globalHeaderProps"
      />
    </template>

    <template
      #tab
    >
      <GlobalTab />
    </template>

    <template
      #sider
    >
      <GlobalSider />
    </template>

    <GlobalMenu />

    <GlobalContent />

    <ThemeDrawer />

    <template
      #footer
    >
      <GlobalFooter />
    </template>
  </AdminLayout>
</template>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar();
}
</style>
