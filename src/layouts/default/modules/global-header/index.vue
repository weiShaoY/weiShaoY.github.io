<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { layoutConfig } from '@/configs'

import { isMobile } from '@/utils'

const route = useRoute()

const router = useRouter()

/**
 *  是否为开发环境
 */
const isDevelopment = window.$isDevelopment

/**
 *  应用的在线演示地址
 */
const appDemoUrl = import.meta.env.VITE_APP_DEMO_URL

/**
 *  应用的代码仓库地址
 */
const appRepoUrl = import.meta.env.VITE_APP_REPO_URL

/**
 *  路由根地址
 */
// const routerRootPath = import.meta.env.VITE_ROUTER_ROOT_PATH

/**
 *  pc端菜单列表
 */
const pcMenuList = layoutConfig.default.headerRouterList.filter(({ isDevelopmentOnly }) =>
  isDevelopment || !isDevelopmentOnly,
)

/**
 *  移动菜单列表
 */
const mobileMenuList = layoutConfig.default.headerRouterList.filter(({ isPCOnly, isDevelopmentOnly }) =>
  !isPCOnly && (isDevelopment || !isDevelopmentOnly),
)

/**
 *  移动菜单按钮引用
 */
const mobileButtonRef = ref(null)

/**
 *  是否打开移动菜单
 */
const isOpenMobileMenu = ref(false)

/**
 * 切换移动菜单
 */
function toggleMobileMenu() {
  isOpenMobileMenu.value = !isOpenMobileMenu.value
}

/**
 * 关闭移动菜单
 */
function closeMobileMenu() {
  isOpenMobileMenu.value = false
}

/**
 *  跳转到首页
 */
// function handleToHome() {
//   if (route.path === routerRootPath) {
//     return
//   }

//   router.push(routerRootPath)
// }

/**
 *  选择菜单项
 */
function handleSelect(item: LayoutConfigType.Default['headerRouterList'][0]) {
  isOpenMobileMenu.value = false

  if (route.path === item.value) {
    return
  }

  router.push(item.value)
}

</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 flex justify-center bg-[#191919] bg-opacity-90 shadow-md"
    :style="{
      height: `${layoutConfig.default.headerHeight}px`,
    }"
  >
    <div
      class="container relative flex items-center justify-between max-sm:mx-5"
    >

      <!-- Logo区域 -->
      <a
        class="z-999 flex items-center"
      >

        <router-link
          to="/"
        >
          <SvgIcon
            icon="logo"
            :size="80"
            class="cursor-pointer"
          />
        </router-link>

        <router-link
          to="/"
        >
          <SvgIcon
            icon="weiShaoY"
            :height="80"
            :width="160"
            class="scale-100 cursor-pointer !hover:color-[#08FF00]"
          />
        </router-link>
      </a>

      <!-- PC端菜单 -->
      <div
        v-if="!isMobile"
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-5"
      >
        <router-link
          v-for="item in pcMenuList"
          :key="item.value"
          :to="item.value"
          class="flex cursor-pointer items-center text-lg text-[#D0D2D6] font-bold hover:text-[#BFFFBF]"
          :class="{ 'text-primary': route.path === item.value }"
        >
          {{ item.label }}
        </router-link>
      </div>

      <!-- 操作按钮区域 -->
      <div
        class="flex flex items-center justify-end gap-5"
      >
        <Github />

        <!-- 开发环境且非移动端显示额外按钮 -->
        <template
          v-if="isDevelopment && !isMobile"
        >
          <LinkButton
            icon="home-navbar-demo"
            :size="36"
            :url="appDemoUrl"
          />

          <LinkButton
            icon="home-navbar-warehouse"
            :size="36"
            :url="appRepoUrl"
          />
        </template>

        <!-- 移动端菜单 -->
        <template
          v-else
        >
          <div
            class="block"
          >
            <!-- 菜单按钮 -->
            <button
              ref="mobileButtonRef"
              class="aspect-square h-10 rounded-md hover:bg-[#333639]"
              :class="[
                isOpenMobileMenu ? 'bg-[#333639]' : '',
              ]"
              type="button"
              @click="toggleMobileMenu"
            >
              <SvgIcon
                :icon="isOpenMobileMenu ? 'home-navbar-menu1' : 'home-navbar-menu2'"
                :size="24"
                color="#fff"
              />
            </button>

            <!-- 弹出层 -->
            <div
              class="fixed bottom-0 left-0 right-0 flex flex-col overflow-hidden bg-black bg-opacity-70 transition-max-height duration-500 ease-in-out"
              :class="[
                isOpenMobileMenu ? 'max-h-screen' : 'max-h-0',
              ]"
              :style="{ top: `${layoutConfig.default.headerHeight}px` }"
            >
              <!-- 操作组 -->
              <div
                class="bg-[#333639]"
              >
                <div
                  v-for="item in mobileMenuList"
                  :key="item.value"
                  class="m-3 flex cursor-pointer items-center rounded-md p-3 text-lg text-white font-bold hover:bg-[#D0D2D6]"
                  :class="{
                    'bg-[#D0D2D6]': route.path === item.value,
                  }"
                  @click="handleSelect(item)"
                >
                  {{ item.label }}
                </div>
              </div>

              <!-- 遮罩层 -->
              <div
                class="flex-1"
                @click="closeMobileMenu"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

</style>
