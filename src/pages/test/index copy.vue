<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const aaaContent = ref('')

onMounted(async () => {
  try {
    const modules = import.meta.glob('./aaa.vue', {
      as: 'raw',
      eager: true,
    })

    aaaContent.value = modules['./aaa.vue']
  }
  catch (error) {
    console.error('Error reading file:', error)
    aaaContent.value = 'Error: Could not read file.'
  }
})
</script>

<template>
  <div>
    <PrismView
      :code="aaaContent"
      language="vue"
    />
  </div>
</template>
