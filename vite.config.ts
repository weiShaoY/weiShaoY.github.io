import path from 'node:path'

import Vue from '@vitejs/plugin-vue'

import VueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'

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
    // ========== 基础配置 ==========
    base: env.VITE_APP_BASE_URL || '/',
    envPrefix: 'VITE_',

    // ========== 开发服务器配置 ==========
    server: {
      // 开发服务器端口，默认 3000
      port: Number(env.VITE_APP_PORT) || 3000,

      // 自动在浏览器中打开应用
      open: true,

      // 启用 CORS 支持，解决跨域问题
      cors: true,

      // 热更新配置
      hmr: {
        // 在浏览器中显示错误覆盖层
        overlay: true,
      },

      // host: true,
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_URL,
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },
    },

    // ========== 构建配置 ==========
    // build: {
    //   target: 'es2015',
    //   minify: 'terser',
    //   terserOptions: {
    //     compress: {
    //       drop_console: mode === 'production',
    //       drop_debugger: mode === 'production',
    //     },
    //   },
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         'element-plus': ['element-plus'],
    //         'vue-vendor': ['vue', 'vue-router', 'pinia'],
    //         echarts: ['echarts'],
    //       },
    //     },
    //   },
    //   chunkSizeWarningLimit: 1500,
    // },

    // ========== 解析配置 ==========
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@utils': path.resolve('src/utils'),
        '@styles': path.resolve('src/assets/styles'),
        '@images': path.resolve('src/assets/images'),
        '@store': path.resolve('src/stores'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    // ========== CSS 预处理器配置 ==========
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        // scss: {
        //   // 使用现代编译器 API (Sass 新特性支持)
        //   api: 'modern-compiler',

        //   /**
        //    * 全局注入的 SCSS 代码
        //    * @use 指令引入全局样式文件
        //    * as * 表示将所有 mixin/variables 导入全局命名空间
        //    */
        //   additionalData: `
        //     @use "@/themes/variables.scss" as *;
        //   `,
        //   charset: false,
        // },

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

    // ========== 依赖优化配置 ==========
    optimizeDeps: {
      include: [
        // Vue 生态
        'vue',
        'vue-router',
        'pinia',

        // Element Plus
        'element-plus/es',
        'element-plus/es/components/*/style/css',
        'element-plus/es/components/*/style/index',

        // 图表库
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',

        // 工具库
        'xlsx',
        'xgplayer',
        'crypto-js',
        'file-saver',
        'vue-img-cutter',
      ],
    },

    // ========== 插件配置 ==========
    plugins: [
      // ===== Vue 生态插件 =====
      Vue(),

      // Vue Router 配置
      VueRouter({
        // 生成 TypeScript 路由声明文件
        dts: 'src/types/vue-router-vite.d.ts',
      }),

      // 支持 Vue 的 JSX 语法
      VueJsx(),

      // vueDevTools(),

      // ===== 自动导入插件 =====
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'],
            type: true,
          },
        ],
        dirs: [
          'src/composables',
          'src/stores',
          'src/utils',
          'src/directives',
        ],
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
        ],
        dts: 'src/types/auto-imports.d.ts',
        vueTemplate: true,
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

      // ===== 样式相关插件 =====
      UnoCSS(),

      // ===== 资源处理插件 =====
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
