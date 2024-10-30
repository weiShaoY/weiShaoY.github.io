import type { AppRouteRecordRaw } from '@/router/types'

import { CODE_DEFAULT_LAYOUT } from '@/router/layout'

const document: AppRouteRecordRaw = {
  path: 'document1',
  name: 'Document1',
  redirect: {
    name: 'Vue1',
  },
  component: CODE_DEFAULT_LAYOUT,
  meta: {
    locale: '开发文档1',
    icon: 'wenDang',
    order: 10,
  },
  children: [
    {
      path: 'vue1',
      name: 'Vue1',
      component: () => import('@/pages/code/document/vue/index.vue'),
      meta: {
        locale: 'Vue1',
        icon: 'vue',
      },
    },

  ],
}

export default document
