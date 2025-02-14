import type { AppRouteRecordRaw } from "@/router/types";

import { BLOG_DEFAULT_LAYOUT } from "@/layouts";

const Tool: AppRouteRecordRaw = {
  path: "tool",
  name: "Tool",
  meta: {
    locale: "工具",
    icon: "blog-menu-tool",
    order: 10,
  },
  redirect: {
    name: "Codec",
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [
    {
      path: "codec",
      name: "Codec",
      meta: {
        locale: "编码解码",
        icon: "blog-menu-codec",
      },
      redirect: {
        name: "Base64",
      },
      children: [
        {
          path: "morse",
          name: "Morse",
          meta: {
            locale: "摩斯电码",
            icon: "blog-menu-morse",
          },
          component: import("@/pages/blog/tool/codec/morse/index.vue"),
        },
        {
          path: "base64",
          name: "Base64",
          meta: {
            locale: "Base64",
            icon: "blog-menu-base64",
          },
          component: import("@/pages/blog/tool/codec/base64/index.vue"),
        },

        {
          path: "md5",
          name: "Md5",
          meta: {
            locale: "MD5",
            icon: "blog-menu-md5",
          },
          component: import("@/pages/blog/tool/codec/md5/index.vue"),
        },
      ],
    },
  ],
};

export default Tool;
