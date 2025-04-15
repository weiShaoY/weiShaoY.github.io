<script setup lang="ts">
defineOptions({
  name: 'ReloadButton',
})

defineProps<Props>()

type Props = {

  /**
   * 是否加载
   */
  loading?: boolean
}

</script>

<template>
  <ButtonIcon
    tooltip-content="刷新页面"
  >
    <div
      :class="{ 'animate-spin animate-duration-750': loading }"
    >
      <SvgIcon
        icon="blog-refresh"
      />
    </div>
  </ButtonIcon>
</template>
