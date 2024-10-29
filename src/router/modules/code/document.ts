import type { AppRouteRecordRaw } from '@/router/types'

const document: AppRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  redirect: {
    name: 'Vue',
  },
  component: () => import('@/layout/code-layout/index.vue'),
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

  ],
}

export default document
