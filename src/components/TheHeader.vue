<script lang="ts" setup>
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
      class="flex justify-between p-x-5 container"
    >

      <!-- logo -->
      <a
        class="group hover:cursor-pointer"
        @click="router.push('/index')"
      >
        <SvgIcon
          icon="icon-WeiShaoY"
          :style="{
            height: '100%',
            width: '150px',
          }"
          class="group-hover:color-primary"
        />
      </a>

      <!-- 中间 -->
      <div
        v-if="!isMobile"
        class="flex items-center text-3xl font-600"
      >
        <div
          class="m-r-10"
        >
          <a
            class="hover:cursor-pointer"
            @click="router.push('/index/about')"
          >
            About
          </a>

          <!-- v-show="router.currentRoute.value.path === '/index/about'" -->
          <div
            class="h-1 w-full bg-primary"
            :style="{
              transform: 'none',
              transformOrigin: '50% 50% 0px',
            }"
          />
        </div>

        <div>
          <a
            class="hover:cursor-pointer"
            @click="router.push('/index/resume')"
          >
            Resume
          </a>
          <!-- v-show="router.currentRoute.value.path === '/index/resume'" -->

          <div
            class="h-1 w-full bg-primary"
            :style="{
              transform: 'none',
              transformOrigin: '50% 50% 0px',
            }"
          />
        </div>
      </div>

      <!-- 右边 -->
      <div
        class="flex items-center gap-2"
      >

        <!-- 切换主题按钮 -->
        <Checkbox />

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
                :icon="dropdownVisible ? 'icon-guanbi' : 'icon-zhankai'"
                :size="36"
                :class="isDark ? '!fill-white' : '!fill-#333'"
                class="!group-hover:fill-primary"
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
