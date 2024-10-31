import type { AppRouteRecordRaw } from '@/router/types'

import { CODE_DEFAULT_LAYOUT } from '@/router/layout'

const document: AppRouteRecordRaw = {
  path: 'creativeComponent',
  name: 'CreativeComponent',
  redirect: {
    name: 'Clock',
  },
  component: CODE_DEFAULT_LAYOUT,
  meta: {
    locale: '创意组件',
    icon: 'wenDang',
    order: 10,
  },
  children: [
    {
      path: 'clock',
      name: 'Clock',
      component: () => import('@/pages/code/creativeComponent/clock/index.vue'),
      meta: {
        locale: '时钟',
        icon: 'vue',
      },
    },

  ],
}

export default document
