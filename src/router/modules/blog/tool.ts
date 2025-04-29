const Tool: RouterType.BlogRouteRecordRaw = {
  path: 'tool',
  name: 'Tool',
  meta: {
    title: '工具',
    icon: 'blog-menu-tool',
    order: 10,
  },
  children: [
    {
      path: 'codec',
      name: 'Codec',
      meta: {
        title: '编码解码',
        icon: 'blog-menu-codec',
      },
      children: [
        {
          path: 'morse',
          name: 'Morse',
          meta: {
            title: '摩斯电码',
            icon: 'blog-menu-morse',
          },
          component: () => import('@/pages/blog/tool/codec/morse/index.vue'),
        },
        {
          path: 'base64',
          name: 'Base64',
          meta: {
            title: 'Base64',
            icon: 'blog-menu-base64',
          },
          component: () => import('@/pages/blog/tool/codec/base64/index.vue'),
        },

        {
          path: 'md5',
          name: 'Md5',
          meta: {
            title: 'MD5',
            icon: 'blog-menu-md5',
          },
          component: () => import('@/pages/blog/tool/codec/md5/index.vue'),
        },
      ],
    },
    {
      path: 'network',
      name: 'Network',
      meta: {
        title: '网络',
        icon: 'blog-menu-network',
      },
      children: [
        {
          path: 'http',
          name: 'Http',
          meta: {
            title: 'HTTP状态码',
            icon: 'blog-menu-http',
          },
          component: () => import('@/pages/blog/tool/network/http/index.vue'),
        },
        {
          path: 'dns',
          name: 'Dns',
          meta: {
            title: 'DNS',
            icon: 'blog-menu-dns',
          },
          component: () => import('@/pages/blog/tool/network/dns/index.vue'),
        },

      ],
    },
    {
      path: 'jsonFormatter',
      name: 'JsonFormatter',
      meta: {
        title: 'Json格式化',
        icon: 'blog-menu-jsonFormatter',
      },
      component: () => import('@/pages/blog/tool/jsonFormatter/index.vue'),
    },
    {
      path: 'qrcode',
      name: 'Qrcode',
      meta: {
        title: '二维码生成',
        icon: 'blog-menu-qrcode',
      },
      component: () => import('@/pages/blog/tool/qrcode/index.vue'),

    },
  ],
}

export default Tool
