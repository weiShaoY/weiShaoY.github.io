const Tool: RouterType.AdminRoute = {
  path: 'tool',
  name: 'Tool',
  meta: {
    title: '工具',
    icon: 'admin-menu-tool',
    order: 10,
  },
  children: [
    {
      path: 'codec',
      name: 'Codec',
      meta: {
        title: '编码解码',
        icon: 'admin-menu-codec',
      },
      children: [
        {
          path: 'morse',
          name: 'Morse',
          meta: {
            title: '摩斯电码',
            icon: 'admin-menu-morse',
            keepAlive: true,
          },
          component: () => import('@/pages/admin/tool/codec/morse/index.vue'),
        },
        {
          path: 'base64',
          name: 'Base64',
          meta: {
            title: 'Base64',
            icon: 'admin-menu-base64',
          },
          component: () => import('@/pages/admin/tool/codec/base64/index.vue'),
        },

        {
          path: 'md5',
          name: 'Md5',
          meta: {
            title: 'MD5',
            icon: 'admin-menu-md5',
          },
          component: () => import('@/pages/admin/tool/codec/md5/index.vue'),
        },
      ],
    },
    {
      path: 'network',
      name: 'Network',
      meta: {
        title: '网络',
        icon: 'admin-menu-network',
      },
      children: [
        {
          path: 'http',
          name: 'Http',
          meta: {
            title: 'HTTP状态码',
            icon: 'admin-menu-http',
          },
          component: () => import('@/pages/admin/tool/network/http/index.vue'),
        },
        {
          path: 'dns',
          name: 'Dns',
          meta: {
            title: 'DNS',
            icon: 'admin-menu-dns',
          },
          component: () => import('@/pages/admin/tool/network/dns/index.vue'),
        },

      ],
    },

    {
      path: 'qrcode',
      name: 'Qrcode',
      meta: {
        title: '二维码生成',
        icon: 'admin-menu-qrcode',
      },
      component: () => import('@/pages/admin/tool/qrcode/index.vue'),

    },
  ],
}

export default Tool
