const documentRoute: RouterType.AdminRoute = {
  path: 'document',
  name: 'Document',
  meta: {
    title: '文档',
    keepAlive: false,
    order: 1,
    icon: 'admin-menu-document',
  },
  children: [
    {
      path: 'ui',
      name: 'UI',
      meta: {
        title: 'UI库',
        icon: 'admin-menu-ui',
      },
      children: [
        {
          path: 'arcoDesign',
          name: 'Arco',
          meta: {
            title: 'ArcoDesign',
            icon: 'admin-menu-arcoDesign',
            iframeUrl: 'https://arco.design/vue/component/button',
          },
        },
        {
          path: 'antd',
          name: 'Antd',
          meta: {
            title: 'AntDesign',
            icon: 'admin-menu-andDesign',
            externalUrl: 'https://ant-design.antgroup.com/components/overview-cn/',
          },
        },
        {
          path: 'tDesign',
          name: 'TDesign',
          meta: {
            title: 'TDesign',
            icon: 'admin-menu-tDesign',
            iframeUrl: 'https://tdesign.tencent.com/vue-next/getting-started',
          },
        },
        {
          path: 'elementPlus',
          name: 'ElementPlus',
          meta: {
            title: 'ElementPlus',
            icon: 'admin-menu-elementPlus',
            iframeUrl: 'https://element-plus.org/zh-CN/component/overview.html',
          },
        },
        {
          path: 'naiveUi',
          name: 'NaiveUi',
          meta: {
            title: 'NaiveUi',
            icon: 'admin-menu-naiveUi',
            iframeUrl: 'https://www.naiveui.com/zh-CN/dark/docs/introduction',
          },
        },
      ],
    },
    {
      path: 'css',
      name: 'Css',
      meta: {
        title: 'Css',
        icon: 'admin-menu-css',
      },
      children: [
        {
          path: 'unocss',
          name: 'Unocss',
          meta: {
            title: 'Unocss',
            icon: 'admin-menu-unocss',
            iframeUrl: 'https://unocss-cn.pages.dev/',
          },
        },

        {
          path: 'tailwindCss',
          name: 'TailwindCss',
          meta: {
            title: 'TailwindCss',
            icon: 'admin-menu-tailwindCss',
            externalUrl: 'https://tailwind.nodejs.cn/docs/installation',
          },
        },
      ],
    },

    {
      path: 'typescript',
      name: 'TypeScript',
      meta: {
        title: 'TypeScript',
        icon: 'admin-menu-typeScript',
        iframeUrl: 'https://www.typescriptlang.org/zh/',
      },
    },
    {
      path: 'vite',
      name: 'Vite',
      meta: {
        title: 'Vite',
        icon: 'admin-menu-vite',
        iframeUrl: 'https://cn.vitejs.dev/',
      },
    },
    {
      path: 'react',
      name: 'React',
      meta: {
        title: 'React',
        icon: 'admin-menu-react',
        iframeUrl: 'https://zh-hans.react.dev/',
      },
    },
    {
      path: 'vue',
      name: 'Vue',
      meta: {
        title: 'Vue',
        icon: 'admin-menu-vue',
        externalUrl: 'https://cn.vuejs.org/',
      },
    },
    {
      path: 'angular',
      name: 'Angular',
      meta: {
        title: 'Angular',
        icon: 'admin-menu-angular',
        iframeUrl: 'https://angular.io/',
      },
    },
    {
      path: 'pinia',
      name: 'Pinia',
      meta: {
        title: 'Pinia',
        icon: 'admin-menu-pinia',
        iframeUrl: 'https://pinia.vuejs.org/zh/',
      },
    },
    {
      path: 'vueuse',
      name: 'VueUse',
      meta: {
        title: 'vueuse',
        icon: 'admin-menu-vueuse',
        iframeUrl: 'https://vueuse.pages.dev/',
      },
    },

    {
      path: 'eslint',
      name: 'Eslint',
      meta: {
        title: 'Eslint',
        icon: 'admin-menu-eslint',
        iframeUrl: 'https://eslint.org/docs/latest/',
      },
    },
    {
      path: 'prettier',
      name: 'Prettier',
      meta: {
        title: 'Prettier',
        icon: 'admin-menu-prettier',
        iframeUrl: 'https://prettier.io/',
      },
    },
    {
      path: 'docker',
      name: 'Docker',
      meta: {
        title: 'Docker',
        icon: 'admin-menu-docker',
        externalUrl: 'https://docs.docker.com/build-cloud/',
      },
    },
    {
      path: 'echarts',
      name: 'Echarts',
      meta: {
        title: 'Echarts',
        icon: 'admin-menu-echarts',
        externalUrl: 'https://echarts.apache.org/zh/index.html',
      },
    },
    {
      path: 'nginx',
      name: 'Nginx',
      meta: {
        title: 'Nginx',
        icon: 'admin-menu-nginx',
        iframeUrl: 'https://nginx.org/en/docs/',
      },
    },
    {
      path: 'electron',
      name: 'Electron',
      meta: {
        title: 'Electron',
        icon: 'admin-menu-electron',
        iframeUrl: 'https://www.electronjs.org/zh/docs/latest/',
      },
    },
    {
      path: 'nextJs',
      name: 'NextJs',
      meta: {
        title: 'NextJs',
        icon: 'admin-menu-nextJs',
        externalUrl: 'https://www.nextjs.cn/',
      },
    },
  ],
}

export default documentRoute
