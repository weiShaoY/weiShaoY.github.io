<!-- 纵向布局 -->
<script setup lang="ts" name="layoutVertical">
import { useTestStore } from '@/store/modules/test'

import { computed } from 'vue'

import { useRoute } from 'vue-router'

import ToolBarLeft from '../components/Header/ToolBarLeft.vue'

import ToolBarRight from '../components/Header/ToolBarRight.vue'

import Main from '../components/Main/index.vue'

import SubMenu from '../components/Menu/SubMenu.vue'

const title = import.meta.env.VITE_GLOB_APP_TITLE

const route = useRoute()

const testStore = useTestStore()

const accordion = computed(() => testStore.global.accordion)

const isCollapse = computed(() => testStore.global.isCollapse)

const menuList = computed(() => testStore.showMenuListGet())

const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)
</script>

<template>
  <el-container
    class="layout"
  >
    <el-aside>
      <div
        class="aside-box"
        :style="{ width: isCollapse ? '65px' : '210px' }"
      >
        <div
          class="logo flx-center"
        >
          <img
            class="logo-img"
            src="@/assets/svgs/logo.svg"
            alt="logo"
          >

          <span
            v-show="!isCollapse"
            class="logo-text"
          >{{ title }}</span>
        </div>

        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu
              :menu-list="menuList"
            />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container>
      <el-header>
        <ToolBarLeft />

        <ToolBarRight />
      </el-header>

      <Main />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
