<script lang="ts" setup>
const props = defineProps({

  /**
   *  类型
   */
  type: {
    type: String,
    default: '',
  },

  /**
   *  名称
   */
  name: {
    type: String,
    default: '',
  },

  /**
   *  默认值
   */
  defaultValue: {
    type: [String, Boolean, Number],
    default: '',
  },
})

const emit = defineEmits(['inputChange'])

function handleChange(value: unknown) {
  emit('inputChange', {
    value,
    key: props.name,
  })
}
</script>

<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '80px' }"
    size="small"
    :default-value="(defaultValue as number)"
    @change="handleChange"
  />

  <a-switch
    v-else
    :default-checked="(defaultValue as boolean)"
    size="small"
    @change="handleChange"
  />
</template>

<style scoped lang="less">
.arco-switch {
  background-color: var(--color-fill-4);
}
.arco-switch-checked {
  background-color: rgb(var(--primary-6));
}
</style>
