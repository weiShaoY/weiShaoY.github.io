import type { AppRouteRecordRaw } from '@/router/types'

import {
  BLOG_DEFAULT_LAYOUT,
  BLOG_EXTERNAL_LAYOUT,
  BLOG_IFRAME_LAYOUT,
} from '@/layouts'

const document: AppRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  meta: {
    locale: '文档',
    icon: 'blog-menu-document',
    order: 1,
  },
  redirect: {
    name: 'TypeScript',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [
    {
      path: 'typescript',
      name: 'TypeScript',
      meta: {
        locale: 'TypeScript',
        icon: 'blog-menu-typeScript',
        iframeUrl: 'https://www.typescriptlang.org/zh/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'vite',
      name: 'Vite',
      meta: {
        locale: 'Vite',
        icon: 'blog-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'react',
      name: 'React',
      meta: {
        locale: 'React',
        icon: 'blog-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'vue',
      name: 'Vue',
      meta: {
        locale: 'Vue',
        icon: 'blog-menu-vue',
        externalUrl: 'https://cn.vuejs.org/',
      },
      component: BLOG_EXTERNAL_LAYOUT,
    },

    {
      path: 'angular',
      name: 'Angular',
      meta: {
        locale: 'Angular',
        icon: 'blog-menu-angular',
        externalUrl: 'https://angular.io/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'pinia',
      name: 'Pinia',
      meta: {
        locale: 'Pinia',
        icon: 'blog-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'vueuse',
      name: 'VueUse',
      meta: {
        locale: 'VueUse',
        icon: 'blog-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'unocss',
      name: 'Unocss',
      meta: {
        locale: 'Unocss',
        icon: 'blog-menu-unocss',
        iframeUrl: 'https://unocss-cn.pages.dev/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'tailwindCss',
      name: 'TailwindCss',
      meta: {
        locale: 'TailwindCss',
        icon: 'blog-menu-tailwindCss',
        iframeUrl: 'https://tailwindcss.com/docs/installation',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'eslint',
      name: 'Eslint',
      meta: {
        locale: 'Eslint',
        icon: 'blog-menu-eslint',
        iframeUrl: 'https://eslint.org/docs/latest/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },
    {
      path: 'biomejs',
      name: 'Biomejs',
      meta: {
        locale: 'Biomejs',
        icon: 'blog-menu-biomejs',
        iframeUrl: 'https://biomejs.dev/zh-cn/guides/getting-started/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },
    {
      path: 'docker',
      name: 'Docker',
      meta: {
        locale: 'Docker',
        icon: 'blog-menu-docker',
        externalUrl: 'https://docs.docker.com/build-cloud/',
      },
      component: BLOG_EXTERNAL_LAYOUT,
    },
    {
      path: 'echarts',
      name: 'Echarts',
      meta: {
        locale: 'Echarts',
        icon: 'blog-menu-echarts',
        externalUrl: 'https://echarts.apache.org/zh/index.html',
      },
      component: BLOG_EXTERNAL_LAYOUT,
    },
    {
      path: 'nginx',
      name: 'Nginx',
      meta: {
        locale: 'Nginx',
        icon: 'blog-menu-nginx',
        iframeUrl: 'https://nginx.org/en/docs/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },
    {
      path: 'electron',
      name: 'Electron',
      meta: {
        locale: 'Electron',
        icon: 'blog-menu-electron',
        iframeUrl: 'https://www.electronjs.org/zh/docs/latest/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },
    {
      path: 'nextJs',
      name: 'NextJs',
      meta: {
        locale: 'NextJs',
        icon: 'blog-menu-nextJs',
        externalUrl: 'https://www.nextjs.cn/',
      },
      component: BLOG_EXTERNAL_LAYOUT,
    },
  ],
}

export default document
