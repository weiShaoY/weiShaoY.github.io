<script lang="ts" setup>

import SearchModal from './components/search-modal.vue'

defineOptions({
  name: 'GlobalSearch',
})

const show = ref(false)

function toggle() {
  show.value = !show.value
}
</script>

<template>
  <ButtonIcon
    tooltip-content="搜索"
    @click="toggle"
  >
    <SvgIcon
      icon="search"
    />
  </ButtonIcon>

  <SearchModal
    v-model:show="show"
  />
</template>

<style lang="scss" scoped></style>
