import type { AppRouteRecordRaw } from "@/router/types";

import { BLOG_DEFAULT_LAYOUT } from "@/layouts";

const Creativity: AppRouteRecordRaw = {
  path: "creativity",
  name: "Creativity",
  meta: {
    locale: "创意",
    icon: "blog-menu-creativity",
    order: 10,
  },
  redirect: {
    name: "Clock",
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [
    {
      path: "clock",
      name: "Clock",
      meta: {
        locale: "时钟",
        icon: "blog-menu-clock",
      },
      component: () => import("@/pages/老博客/creativity/clock/index.vue"),
    },
    {
      path: "muYu",
      name: "MuYu",
      meta: {
        locale: "木鱼",
        icon: "blog-menu-muYu",
      },
      component: () => import("@/pages/老博客/creativity/muYu/index.vue"),
    },
    {
      path: "calendar",
      name: "Calendar",
      meta: {
        locale: "日历",
        icon: "blog-menu-calendar",
      },
      component: () => import("@/pages/老博客/creativity/calendar/index.vue"),
    },
    {
      path: "screensaver",
      name: "Screensaver",
      meta: {
        locale: "屏保",
        icon: "blog-menu-screensaver",
      },
      component: () => import("@/pages/老博客/creativity/screensaver/index.vue"),
    },

    {
      path: "time",
      name: "Time",
      meta: {
        locale: "时间",
        icon: "blog-menu-time",
      },
      component: () => import("@/pages/老博客/creativity/time/index.vue"),
    },
    {
      path: "ripple",
      name: "Ripple",
      meta: {
        locale: "水波",
        icon: "blog-menu-ripple",
      },
      component: () => import("@/pages/老博客/creativity/ripple/index.vue"),
    },

    {
      path: "text",
      name: "Text",
      meta: {
        locale: "文字",
        icon: "blog-menu-text",
      },
      component: () => import("@/pages/老博客/creativity/text/index.vue"),
    },
    {
      path: "charge",
      name: "Charge",
      meta: {
        locale: "充电",
        icon: "blog-menu-charge",
      },
      component: () => import("@/pages/老博客/creativity/charge/index.vue"),
    },
    {
      path: "codeWall",
      name: "CodeWall",
      meta: {
        locale: "代码墙",
        icon: "blog-menu-codeWall",
      },
      component: () => import("@/pages/老博客/creativity/codeWall/index.vue"),
    },
  ],
};

export default Creativity;
