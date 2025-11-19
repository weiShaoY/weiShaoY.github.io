import path from 'node:path'

import Tailwindcss from '@tailwindcss/vite'

import Vue from '@vitejs/plugin-vue'

import VueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig, loadEnv } from 'vite'

import Glsl from 'vite-plugin-glsl'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'

// import vueDevTools from 'vite-plugin-vue-devtools'

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
        '@utils': path.resolve('src/utils'),
        '@styles': path.resolve('src/assets/styles'),
        '@store': path.resolve('src/stores'),
        '@images': path.resolve('src/assets/images'),
      },

      // 指定在解析模块路径时需要尝试的文件扩展名的顺序
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    // CSS 相关配置
    css: {
      preprocessorOptions: {
        // sass variable and mixin
        scss: {
          additionalData: `
            @use "@styles/core/el-light.scss" as *;
            @use "@styles/core/mixin.scss" as *;
          `,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
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

      // 启用 CORS 支持，解决跨域问题
      cors: true,

      // 热更新配置
      hmr: {
        overlay: true, // 在浏览器中显示错误覆盖层
      },

      // API 代理配置，用于开发环境下的接口转发
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_URL,
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },

    },

    // 生产环境构建配置
    // build: {
    //   // 设置构建目标为 ES2015，确保更好的浏览器兼容性
    //   target: 'es2015',

    //   // 使用 terser 进行代码压缩
    //   minify: 'terser',

    //   // terser 压缩配置
    //   terserOptions: {
    //     compress: {
    //       // 生产环境下移除 console 和 debugger
    //       drop_console: mode === 'production',
    //       drop_debugger: mode === 'production',
    //     },
    //   },

    //   // Rollup 打包配置
    //   rollupOptions: {
    //     output: {
    //       // 自定义代码分割策略
    //       manualChunks: {
    //         'element-plus': ['element-plus'], // Element Plus 相关代码
    //         'vue-vendor': ['vue', 'vue-router', 'pinia'], // Vue 核心库
    //         'echarts': ['echarts'], // ECharts 图表库
    //       },
    //     },
    //   },

    //   // 调整 chunk 大小警告限制
    //   chunkSizeWarningLimit: 1500,
    // },

    // 插件配置
    plugins: [
      // Vue 3 支持
      Vue(),

      // Vue Router 配置
      VueRouter({
        // 生成 TypeScript 路由声明文件
        dts: 'src/types/vue-router-vite.d.ts',
      }),

      // 支持 Vue 的 JSX 语法
      VueJsx(),

      // 启用 Tailwindcss 原子化 CSS 引擎
      Tailwindcss(),

      // 启用 Vue 开发者工具
      // vueDevTools(),

      // 自动导入配置
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
          'src/directives',
        ],

        resolvers: [
          // 自动导入 Element Plus 的组件
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

      // 组件自动导入配置
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

      // GLSL 着色器支持
      Glsl(),

      // SVG 图标插件配置
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
        symbolId: `${env.VITE_APP_ICON_PREFIX || 'icon'}-[dir]-[name]`,
      }),

    ],
  }
})
