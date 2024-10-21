<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const dropdownVisible = ref(false)
</script>

<template>
  <nav class="h-20 w-full flex justify-between px-5 py-5">
    <!-- logo -->
    <a
      class="group hover:cursor-pointer"
      @click="router.push('/index')"
    >
      <SvgIcon
        icon="icon-WeiShaoY" :style="{
          height: '100%',
          width: '150px',
        }"
        class="group-hover:color-primary"
      />
    </a>

    <!-- pc -->
    <div
      v-if="!isMobile"
      class="flex text-3xl font-600"
    >
      <div class="m-r-10">
        <a
          class="hover:cursor-pointer"
          @click="router.push('/index/about')"
        >
          About
        </a>

        <div
          v-if="router.currentRoute.value.path === '/index/about'"
          class="h-0.5 w-full bg-primary"
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

        <div
          v-if="router.currentRoute.value.path === '/index/resume'"
          class="h-0.5 w-full bg-primary"
          :style="{
            transform: 'none',
            transformOrigin: '50% 50% 0px',
          }"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- 切换主题按钮 -->
      <a-button
        class="group rounded-3 !h-12 !w-12 !hover:bg-#45464950"
        type="text"
        @click="toggleDark() "
      >
        <template #icon>
          <SvgIcon
            icon="icon-baitian"
            :size="32"
            :class="isDark ? '!fill-white' : '!fill-#333'"
            class="!group-hover:fill-primary"
          />
        </template>
      </a-button>

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
          <template #icon>
            <SvgIcon
              :icon="dropdownVisible ? 'icon-guanbi' : 'icon-zhankai'"
              :size="32"
              :class="isDark ? '!fill-white' : '!fill-#333'"
              class="!group-hover:fill-primary"
            />
          </template>
        </a-button>

        <template #content>
          <a-doption
            @click="router.push('/index/about')"
          >
            About
          </a-doption>
          <a-doption
            @click="router.push('/index/resume')"
          >
            Resume
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </nav>
</template>

<style lang="less" scoped>

</style>
