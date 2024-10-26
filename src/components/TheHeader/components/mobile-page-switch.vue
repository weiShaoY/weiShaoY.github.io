<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const dropdownVisible = ref(false)

const router = useRouter()

</script>

<template>
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
        @click="router.push('/home/about')"
      >
        <span
          class="text-5 font-600"
        >
          About
        </span>
      </a-doption>

      <a-doption
        @click="router.push('/home/resume')"
      >
        <span
          class="text-5 font-600"
        >
          Resume
        </span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>

</style>
