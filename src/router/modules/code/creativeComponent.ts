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
    {
      path: 'muYu',
      name: 'MuYu',
      component: () => import('@/pages/code/creativeComponent/muYu/index.vue'),
      meta: {
        locale: '木鱼',
        icon: 'vue',
      },
    },
    {
      path: 'riLi',
      name: 'Daojishi',
      component: () => import('~/pages/code/creativeComponent/riLi/index.vue'),
      meta: {
        locale: '日历',
        icon: 'vue',
      },
    },
  ],
}

export default document
