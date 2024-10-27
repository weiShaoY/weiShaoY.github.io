import type { AppRouteRecordRaw } from '../types'

const document: AppRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  redirect: {
    name: 'Category',
  },
  component: () => import('@/layout/code-layout/index.vue'),
  meta: {
    locale: '开发文档',

    // icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'vue',
      name: 'Vue',
      component: () => import('@/pages/code/document/vue/index.vue'),
      meta: {
        locale: 'Vue',
      },
    },

  ],
}

export default document
