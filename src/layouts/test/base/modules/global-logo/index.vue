<script setup lang="ts">
defineOptions({
  name: 'GlobalLogo',
})

withDefaults(defineProps<Props>(), {
  showTitle: true,
})

type Props = {

  /** Whether to show the title */
  showTitle?: boolean
}

</script>

<template>
  <RouterLink
    to="/"
    class="nowrap-hidden w-full flex items-center justify-center"
  >
    <!-- <SystemLogo
      class="text-[32px] text-primary"
    /> -->
    <SvgIcon
      icon="logo"
    />

    <h2
      v-show="showTitle"
      class="pl-[8px] text-[16px] text-primary font-bold transition duration-300 ease-in-out"
    >
      weiShaoY
    </h2>
  </RouterLink>
</template>

<style scoped></style>
