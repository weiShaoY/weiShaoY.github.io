<script lang="ts" setup>
import ThemeSwitch from './components/theme-switch.vue'

const router = useRouter()

const dropdownVisible = ref(false)
</script>

<template>
  <nav
    class="fixed left-0 top-0 z-100 w-full flex justify-center bg-#B3AFA4 dark:bg-#191919"
    :style="{
      height: `${appStore.app.indexPage.headerHeight}px`,
    }"
  >
    <div
      class="flex items-center justify-between p-x-5 container"
    >

      <!-- logo -->
      <a
        class="group hover:cursor-pointer"
        @click="router.push('/index')"
      >
        <SvgIcon
          name="weiShaoY"
          class="!h-full !w-35 group-hover:color-primary"
        />
      </a>

      <!-- 中间 -->
      <PageSwitch
        v-if="!isMobile"
      />

      <!-- 右边 -->
      <div
        class="flex items-center gap-2"
      >

        <!-- 切换主题按钮 -->
        <ThemeSwitch />

        <!-- 如果是移动端 显示下拉按钮 -->
        <a-dropdown
          v-if="isMobile"
          position="bl"
          :popup-translate="[-30, 0]"
          @popup-visible-change="dropdownVisible = $event"
        >
          <a-button
            class="group rounded-3 !h-12 !w-12 !hover:bg-#45464950"
            type="text"
          >
            <template
              #icon
            >
              <SvgIcon
                :name="dropdownVisible ? 'guanBi' : 'zhanKai'"
                :size="36"
                class="group-hover:color-primary"
                :class="isDark ? 'color-white' : 'color-#333'"
              />
            </template>
          </a-button>

          <template
            #content
          >
            <a-doption
              @click="router.push('/index/about')"
            >
              <span
                class="text-5 font-600"
              >
                About
              </span>
            </a-doption>

            <a-doption
              @click="router.push('/index/resume')"
            >
              <span
                class="text-5 font-600"
              >
                Resume
              </span>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>

</style>
