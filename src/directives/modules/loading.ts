import { Spin } from '@arco-design/web-vue'

import { createApp, h } from 'vue'

const useLoading = {
  mounted(el, binding) {
    console.log('%c Line:7 🥟 el', 'color:#ffdd4d', el)

    // 找到 el的 父节点
    const parent = el.parentNode

    parent.classList.add('relative')

    console.log('Parent Class List:', parent?.classList)

    if (binding.value) {
      const app = createApp({
        render: () => h(Spin, {
          // size: 'small',
        }),
      })

      const vm = app.mount(document.createElement('div'))

      parent.appendChild(vm.$el)
    }
  },

}

export default useLoading
