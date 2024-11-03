<script lang="ts" setup>

const props = defineProps({

  /**
   *  @param number
   *    数字
   */
  number: {
    type: Number,
    default: 0,
  },

  /**
   *  颜色
   */
  color: {
    type: String,
    default: '#fff',
  },

})

const refresh = ref<boolean>(true)

watch(
  () => props.number,
  () => {
    refresh.value = !refresh.value
  },
)
</script>

<template>
  <div
    class="flex flex-col justify-around"
  >
    <i
      class="h-2.5 w-2.5 rounded-sm transition-all"
      :style="{
        backgroundColor: color,
        opacity: refresh ? 1 : 0.2,
      }"
    />

    <i
      class="h-2.5 w-2.5 rounded-sm transition-all"
      :style="{
        backgroundColor: color,
        opacity: refresh ? 1 : 0.2,
      }"
    />
  </div>
</template>
