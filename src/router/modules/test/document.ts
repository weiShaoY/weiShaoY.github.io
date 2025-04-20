const documentRoute: RouterType.BlogRouteRecordRaw = {
  path: 'document',
  name: 'Document',
  meta: {
    title: '文档',
    keepAlive: false,
    order: 1,
    icon: 'blog-menu-document',
  },
  children: [
    {
      path: 'typescript',
      name: 'TypeScript',
      meta: {
        title: 'TypeScript',
        icon: 'blog-menu-typeScript',
        iframeUrl: 'https://www.typescriptlang.org/zh/',
      },
    },
    {
      path: 'vite',
      name: 'Vite',
      meta: {
        title: 'Vite',
        icon: 'blog-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
      },
    },
    {
      path: 'react',
      name: 'React',
      meta: {
        title: 'React',
        icon: 'blog-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
      },
    },
    {
      path: 'vue',
      name: 'Vue',
      meta: {
        title: 'Vue',
        icon: 'blog-menu-vue',
        externalUrl: 'https://cn.vuejs.org/',
      },
    },
    {
      path: 'angular',
      name: 'Angular',
      meta: {
        title: 'Angular',
        icon: 'blog-menu-angular',
        iframeUrl: 'https://angular.io/',
      },
    },
    {
      path: 'pinia',
      name: 'Pinia',
      meta: {
        title: 'Pinia',
        icon: 'blog-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
      },
    },
    {
      path: 'vueuse',
      name: 'VueUse',
      meta: {
        title: 'vueuse',
        icon: 'blog-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
      },
    },
    {
      path: 'unocss',
      name: 'Unocss',
      meta: {
        title: 'Unocss',
        icon: 'blog-menu-unocss',
        iframeUrl: 'https://unocss-cn.pages.dev/',
      },
    },
    {
      path: 'tailwindCss',
      name: 'TailwindCss',
      meta: {
        title: 'TailwindCss',
        icon: 'blog-menu-tailwindCss',
        iframeUrl: 'https://tailwindcss.com/docs/installation',
      },
    },
    {
      path: 'eslint',
      name: 'Eslint',
      meta: {
        title: 'Eslint',
        icon: 'blog-menu-eslint',
        iframeUrl: 'https://eslint.org/docs/latest/',
      },
    },
    {
      path: 'prettier',
      name: 'Prettier',
      meta: {
        title: 'Prettier',
        icon: 'blog-menu-prettier',
        iframeUrl: 'https://prettier.io/',
      },
    },
    {
      path: 'docker',
      name: 'Docker',
      meta: {
        title: 'Docker',
        icon: 'blog-menu-docker',
        externalUrl: 'https://docs.docker.com/build-cloud/',
      },
    },
    {
      path: 'echarts',
      name: 'Echarts',
      meta: {
        title: 'Echarts',
        icon: 'blog-menu-echarts',
        externalUrl: 'https://echarts.apache.org/zh/index.html',
      },
    },
    {
      path: 'nginx',
      name: 'Nginx',
      meta: {
        title: 'Nginx',
        icon: 'blog-menu-nginx',
        iframeUrl: 'https://nginx.org/en/docs/',
      },
    },
    {
      path: 'electron',
      name: 'Electron',
      meta: {
        title: 'Electron',
        icon: 'blog-menu-electron',
        iframeUrl: 'https://www.electronjs.org/zh/docs/latest/',
      },
    },
    {
      path: 'nextJs',
      name: 'NextJs',
      meta: {
        title: 'NextJs',
        icon: 'blog-menu-nextJs',
        externalUrl: 'https://www.nextjs.cn/',
      },
    },
  ],
}

export default documentRoute
