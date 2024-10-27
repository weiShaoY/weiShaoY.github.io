import { defineStore } from 'pinia'

import { ref } from 'vue'

const useCodeStore = defineStore(
  'code',
  () => {
    const code = ref<CodeType.Global>({
      layout: 'vertical',
      assemblySize: 'default',
      language: null,
      maximize: false,
      primary: '#009688',
      isDark: false,
      isGrey: false,
      isWeak: false,
      asideInverted: false,
      headerInverted: false,
      isCollapse: false,
      accordion: true,
      watermark: false,
      breadcrumb: true,
      breadcrumbIcon: true,
      tabs: true,
      tabsIcon: true,
      footer: true,
    })

    return {
      code,
    }
  },
  {
    persist: true,
  },
)

export default useCodeStore
