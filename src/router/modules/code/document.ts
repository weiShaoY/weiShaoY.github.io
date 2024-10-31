import type { AppRouteRecordRaw } from '@/router/types'

import { CODE_DEFAULT_LAYOUT } from '@/router/layout'

const document: AppRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  redirect: {
    name: 'Vue',
  },
  component: CODE_DEFAULT_LAYOUT,
  meta: {
    locale: '开发文档',
    icon: 'wenDang',
    order: 1,
  },
  children: [
    {
      path: 'vue',
      name: 'Vue',
      component: () => import('@/pages/code/document/vue/index.vue'),
      meta: {
        locale: 'Vue',
        icon: 'vue',
      },
    },
    {
      path: 'https://arco.design/vue/docs/pro/faq',
      name: 'React',
      meta: {
        locale: 'React',
        icon: 'vue',
      },
    },
  ],
}

export default document
