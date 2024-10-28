<script lang="ts" setup>
import type { PropType } from 'vue'

import { useCodeStore } from '@/store'

import FormWrapper from './form-wrapper.vue'

type OptionsProps = {
  name: string
  key: string
  type?: string
  defaultVal?: boolean | string | number
}
defineProps({
  /**
   *  标题
   */
  title: {
    type: String,
    default: '',
  },

  /**
   *  配置项
   */
  options: {
    type: Array as PropType<OptionsProps[]>,
    default() {
      return []
    },
  },
})

const codeStore = useCodeStore()

async function handleChange({
  key,
  value,
}: {
  key: string
  value: unknown
}) {
  if (key === 'colorWeak') {
    document.body.style.filter = value ? 'invert(80%)' : 'none'
  }

  if (key === 'topMenu') {
    codeStore.state.menu.collapsed = false
  }

  appStore.updateSettings({
    [key]: value,
  })
}
</script>

<template>
  <div
    class="m-b-6"
  >
    <h5
      class="m-3 p-0 text-4"
    >
      {{ title }}
    </h5>

    <div
      v-for="option in options"
      :key="option.name"
      class="h-8 flex items-center justify-between"
    >
      <span>{{ option.name }}</span>

      <FormWrapper
        :type="option.type || 'switch'"
        :name="option.key"
        :default-value="option.defaultVal"
        @input-change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
