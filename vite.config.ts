import path from 'node:path'

import Vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig, loadEnv } from 'vite'

import Glsl from 'vite-plugin-glsl'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as Env.ImportMeta

  return {
    // 基础配置
    base: env.VITE_APP_BASE_URL || '/',

    // 环境变量的前缀，只有以该前缀开头的变量才会被载入
    envPrefix: 'VITE_',

    // 解析配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },

      // 指定在解析模块路径时需要尝试的文件扩展名的顺序
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    // CSS 相关配置
    css: {
      // 启用开发模式下的 CSS Source Map，方便调试
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          // 使用现代编译器 API (Sass 新特性支持)
          api: 'modern-compiler',

          /**
           * 全局注入的 SCSS 代码
           * @use 指令引入全局样式文件
           * as * 表示将所有 mixin/variables 导入全局命名空间
           */
          additionalData: `
            @use "@/theme/variables.scss" as *;
          `,

          // 禁用在生成的 CSS 文件中加入 @charset 声明
          charset: false,
        },
      },
    },
    // 预加载项目必需的组件
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        '@vueuse/core',
        'echarts',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/form-item/style/css',
        'element-plus/es/components/button/style/css',
        'element-plus/es/components/input/style/css',
        'element-plus/es/components/input-number/style/css',
        'element-plus/es/components/switch/style/css',
        'element-plus/es/components/upload/style/css',
        'element-plus/es/components/menu/style/css',
        'element-plus/es/components/col/style/css',
        'element-plus/es/components/icon/style/css',
        'element-plus/es/components/row/style/css',
        'element-plus/es/components/tag/style/css',
        'element-plus/es/components/dialog/style/css',
        'element-plus/es/components/loading/style/css',
        'element-plus/es/components/radio/style/css',
        'element-plus/es/components/radio-group/style/css',
        'element-plus/es/components/popover/style/css',
        'element-plus/es/components/scrollbar/style/css',
        'element-plus/es/components/tooltip/style/css',
        'element-plus/es/components/dropdown/style/css',
        'element-plus/es/components/dropdown-menu/style/css',
        'element-plus/es/components/dropdown-item/style/css',
        'element-plus/es/components/sub-menu/style/css',
        'element-plus/es/components/menu-item/style/css',
        'element-plus/es/components/divider/style/css',
        'element-plus/es/components/card/style/css',
        'element-plus/es/components/link/style/css',
        'element-plus/es/components/breadcrumb/style/css',
        'element-plus/es/components/breadcrumb-item/style/css',
        'element-plus/es/components/table/style/css',
        'element-plus/es/components/tree-select/style/css',
        'element-plus/es/components/table-column/style/css',
        'element-plus/es/components/select/style/css',
        'element-plus/es/components/option/style/css',
        'element-plus/es/components/pagination/style/css',
        'element-plus/es/components/tree/style/css',
        'element-plus/es/components/alert/style/css',
        'element-plus/es/components/radio-button/style/css',
        'element-plus/es/components/checkbox-group/style/css',
        'element-plus/es/components/checkbox/style/css',
        'element-plus/es/components/tabs/style/css',
        'element-plus/es/components/tab-pane/style/css',
        'element-plus/es/components/rate/style/css',
        'element-plus/es/components/date-picker/style/css',
        'element-plus/es/components/notification/style/css',
        'element-plus/es/components/image/style/css',
        'element-plus/es/components/statistic/style/css',
        'element-plus/es/components/watermark/style/css',
        'element-plus/es/components/config-provider/style/css',
        'element-plus/es/components/text/style/css',
        'element-plus/es/components/drawer/style/css',
        'element-plus/es/components/color-picker/style/css',
        'element-plus/es/components/backtop/style/css',
        'element-plus/es/components/message-box/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/skeleton-item/style/css',
        'element-plus/es/components/badge/style/css',
        'element-plus/es/components/steps/style/css',
        'element-plus/es/components/step/style/css',
        'element-plus/es/components/avatar/style/css',
        'element-plus/es/components/descriptions/style/css',
        'element-plus/es/components/descriptions-item/style/css',
        'element-plus/es/components/checkbox-group/style/css',
        'element-plus/es/components/progress/style/css',
        'element-plus/es/components/image-viewer/style/css',
        'element-plus/es/components/empty/style/css',
        'element-plus/es/components/segmented/style/css',
        'element-plus/es/components/calendar/style/css',
        'element-plus/es/components/message/style/css',
        'element-plus/es/components/timeline/style/css',
        'element-plus/es/components/timeline-item/style/css',
      ],
    },

    // 开发服务器配置
    server: {
      // 开发服务器监听所有主机地址
      // host: true,

      // 开发服务器端口，默认 3000
      port: Number(env.VITE_APP_PORT) || 3000,

      // 自动在浏览器中打开应用
      open: true,
    },

    // 插件配置
    plugins: [

      Vue(),

      // Vue 相关插件
      VueRouter({
        // 生成 TypeScript 路由声明文件
        dts: 'src/types/vue-router-vite.d.ts',
      }),

      // 支持 Vue 的 JSX 语法
      vueJsx(),

      // 启用 Vue 开发者工具
      vueDevTools(),

      // 自动导入
      AutoImport({
        imports: [
          'vue', // 自动导入 Vue 的 API
          'vue-router', // 自动导入 Vue Router 的 API
          'pinia', // 自动导入 Pinia 的 API
          '@vueuse/core', // 自动导入 VueUse 的 API
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'], // 单独导入类型
            type: true, // 启用类型导入
          },
        ],

        // 生成 TypeScript 自动导入声明文件
        dts: 'src/types/auto-imports.d.ts',

        // 自动导入的目录
        dirs: [
          'src/composables',
          'src/stores',
          'src/utils',
        ],

        resolvers: [
          // 自动导入 Element Plus 的组件// 自动导入 Element Plus 的组件
          ElementPlusResolver({
            importStyle: false, // 禁用自动导入样式
          }),
        ],

        // 在 Vue 模板中支持自动导入
        vueTemplate: true,

        // 自动生成 ESLint 配置
        eslintrc: {
          enabled: true,
        },
      }),

      Components({
        // 生成 TypeScript 组件声明文件
        dts: 'src/types/components.d.ts',
        resolvers: [
          // 使用 Sass 引入 Element Plus 样式
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),

      UnoCSS(),

      Glsl(),

      //  本地svg
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
        symbolId: `${env.VITE_APP_ICON_PREFIX || 'icon'}-[dir]-[name]`,
      }),
    ],
  }
})
