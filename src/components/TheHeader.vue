<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <nav class="h-20 w-full flex justify-between px-5 py-5 hover:cursor-pointer">
    <a
      class="group"
      @click="router.push('/')"
    >
      <SvgIcon
        icon="icon-WeiShaoY" :style="{
          height: '100%',
          width: '150px',
        }"
        class="group-hover:color-primary"
      />
    </a>

    <div class="flex">
      <div class="m-r-10">
        <a
          class="text-6 hover:cursor-pointer"
          @click="router.push('/about')"
        >
          About
        </a>

        <div
          v-if="router.currentRoute.value.path === '/about'"
          class="h-0.5 w-full bg-primary"
          :style="{
            transform: 'none',
            transformOrigin: '50% 50% 0px',
          }"
        />
      </div>

      <div>
        <a
          class="text-6 hover:cursor-pointer"
          @click="router.push('/resume')"
        >
          Resume
        </a>

        <div
          v-if="router.currentRoute.value.path === '/resume'"
          class="h-0.5 w-full bg-primary"
          :style="{
            transform: 'none',
            transformOrigin: '50% 50% 0px',
          }"
        />
      </div>
    </div>

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
  </nav>
</template>

<style lang="less" scoped>

</style>
