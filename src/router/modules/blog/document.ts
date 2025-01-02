import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT, BLOG_IFRAME_LAYOUT } from '@/router/layout'

const document: AppRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  redirect: {
    name: 'TypeScript',
  },
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    locale: '开发文档',
    icon: 'blog-menu-document',
    order: 1,
  },
  children: [
    {
      path: 'typescript',
      name: 'TypeScript',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'TypeScript',
        icon: 'blog-menu-typeScript',
        iframeUrl: 'https://www.typescriptlang.org/zh/',
      },
    },
    {
      path: 'vite',
      name: 'Vite',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'Vite',
        icon: 'blog-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
      },
    },
    {
      path: 'vue',
      name: 'Vue',
      component: () => import('@/pages/blog/document/vue/index.vue'),
      meta: {
        locale: 'Vue',
        icon: 'blog-menu-vue',
      },
    },
    {
      path: 'react',
      name: 'React',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'React',
        icon: 'blog-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
      },
    },

    {
      path: 'pinia',
      name: 'Pinia',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'Pinia',
        icon: 'blog-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
      },
    },

    {
      path: 'vueuse',
      name: 'VueUse',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'VueUse',
        icon: 'blog-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
      },
    },
    {
      path: 'unocss',
      name: 'Unocss',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'Unocss',
        icon: 'blog-menu-unocss',
        iframeUrl: 'https://unocss-cn.pages.dev/',
      },
    },

    {
      path: 'tailwindCss',
      name: 'TailwindCss',
      component: BLOG_IFRAME_LAYOUT,
      meta: {
        locale: 'TailwindCss',
        icon: 'blog-menu-tailwindCss',
        iframeUrl: 'https://tailwindcss.com/docs/installation',
      },
    },
  ],
}

export default document
