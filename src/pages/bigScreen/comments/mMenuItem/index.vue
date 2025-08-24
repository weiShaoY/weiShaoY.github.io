<script setup lang="ts">

type PropsType = {

  /**
   * 菜单项的索引
   */
  index: string | number
}

const props = defineProps<PropsType>()

const updateActive = inject('updateActive') as any

const activeIndex = inject('activeIndex') as any

function handleClick() {
  updateActive(props.index) as any
}
</script>

<template>
  <div
    class="m-menu-item"
    :class="{ 'is-active': index === activeIndex }"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
