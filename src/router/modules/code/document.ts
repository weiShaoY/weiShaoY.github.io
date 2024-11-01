import type { AppRouteRecordRaw } from '@/router/types'

import { CODE_DEFAULT_LAYOUT, CODE_IFRAME_LAYOUT } from '@/router/layout'

const document: AppRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  redirect: {
    name: 'TypeScript',
  },
  component: CODE_DEFAULT_LAYOUT,
  meta: {
    locale: '开发文档',
    icon: 'code-menu-document',
    order: 1,
  },
  children: [
    {
      path: 'typescript',
      name: 'TypeScript',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'TypeScript',
        icon: 'code-menu-typeScript',
        iframeUrl: 'https://www.typescriptlang.org/zh/',
      },
    },
    {
      path: 'vite',
      name: 'Vite',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'Vite',
        icon: 'code-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
      },
    },
    {
      path: 'vue',
      name: 'Vue',
      component: () => import('@/pages/code/document/vue/index.vue'),
      meta: {
        locale: 'Vue',
        icon: 'code-menu-vue',
      },
    },
    {
      path: 'react',
      name: 'React',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'React',
        icon: 'code-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
      },
    },

    {
      path: 'pinia',
      name: 'Pinia',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'Pinia',
        icon: 'code-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
      },
    },

    {
      path: 'vueuse',
      name: 'VueUse',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'VueUse',
        icon: 'code-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
      },
    },
    {
      path: 'unocss',
      name: 'Unocss',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'Unocss',
        icon: 'code-menu-unocss',
        iframeUrl: 'https://unocss-cn.pages.dev/',
      },
    },

    {
      path: 'tailwindCss',
      name: 'TailwindCss',
      component: CODE_IFRAME_LAYOUT,
      meta: {
        locale: 'TailwindCss',
        icon: 'code-menu-tailwindCss',
        iframeUrl: 'https://tailwindcss.com/docs/installation',
      },
    },
  ],
}

export default document
