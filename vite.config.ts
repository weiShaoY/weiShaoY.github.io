import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'

import Vue from '@vitejs/plugin-vue'

import VueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import { defineConfig, loadEnv } from 'vite'

import Glsl from 'vite-plugin-glsl'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'

// import vueDevTools from 'vite-plugin-vue-devtools'

/**
 * 解析路径
 * @param paths 路径
 * @returns 解析后的路径
 */
function resolvePath(paths: string) {
  return path.resolve(__dirname, paths)
}

export default defineConfig(({ mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const isDeleteConsole = env.VITE_APP_DELETE_CONSOLE === 'true'

  const isDeleteDebugger = env.VITE_APP_DELETE_DEBUGGER === 'true'

  return defineConfig({
    // ========== 基础配置 ==========
    base: env.VITE_APP_BASE_URL || '/',

    // ========== 开发服务器配置 ==========
    server: {
      // 开发服务器端口
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

    // ========== 解析配置 ==========
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': resolvePath('src/assets'),
        '@utils': resolvePath('src/utils'),
        '@styles': resolvePath('src/assets/styles'),
        '@images': resolvePath('src/assets/images'),
        '@svgs': resolvePath('src/assets/svgs'),
        '@stores': resolvePath('src/stores'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    // ========== CSS 预处理器配置 ==========
    css: {
      preprocessorOptions: {
        scss: {
        // additionalData：所有scss文件编译前自动拼接这段代码，全局注入，无需每个组件手动导入
        // 全局引入Element Plus自定义主题变量文件，as * 表示变量无需前缀直接使用
        // 全局引入自定义scss混合工具，页面可直接调用自定义mixin函数
          additionalData: `
            @use "@styles/core/el-light.scss" as *;
            @use "@styles/core/mixin.scss" as *;
          `,
        },
      },

      // PostCSS后置处理器配置，SCSS编译完成后再处理原生CSS
      postcss: {
        // 自定义PostCSS插件列表
        plugins: [
          {
            // 自定义插件名称，仅用于标识插件用途
            postcssPlugin: 'internal:charset-removal',

            // 捕获所有@charset规则节点
            AtRule: {
              // 判断当前规则是否为字符集声明
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  // 删除CSS中所有 @charset "UTF-8"; 声明，避免重复字符集警告
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
      // include：强制指定需要预构建转换的第三方依赖库
      // Vite启动时将CommonJS包转为浏览器可用ESM并缓存，解决加载报错、页面卡顿
      include: [
        // Vue 生态核心库
        'vue', // Vue3核心源码，强制预构建加速页面加载
        'vue-router', // Vue路由库，加入预构建防止路由页面加载异常
        'pinia', // Vue状态管理库，预构建优化store加载速度

        // Element Plus UI组件库相关
        'element-plus/es', // Element Plus ESModule标准入口文件
        'element-plus/es/components/*/style/css', // 匹配所有组件按需引入的css样式文件
        'element-plus/es/components/*/style/index', // 匹配所有组件scss样式入口文件

        // ECharts图表库模块化分包
        'echarts/core', // ECharts核心底层模块
        'echarts/charts', // ECharts各类图表模块（折线、柱状、饼图等）
        'echarts/components', // ECharts配套组件（图例、提示框、坐标轴等）
        'echarts/renderers', // ECharts渲染器（canvas/svg）

      ],
    },

    // 编译阶段去除 console.log 和 debugger
    esbuild: {
      pure: isDeleteConsole ? ['console.log'] : [],
      drop: isDeleteDebugger ? ['debugger'] : [],
    },

    // 打包压缩配置
    build: {
      // 使用 esbuild 压缩配置
      minify: 'oxc',
    },

    // ========== 插件配置 ==========
    plugins: [
      // ===== Vue 生态插件 =====
      Vue(),

      // 支持 Vue 的 JSX 语法
      VueJsx(),

      // vueDevTools(),

      // ===== 自动导入插件 =====
      AutoImport({
        // 👇 配置需要自动导入的库
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
        ],

        // 👇 自动扫描指定目录下的文件导出
        dirs: [
          'src/composables',
          'src/stores',
          'src/utils',
          'src/directives',
          'src/configs',
          'src/apis/**',
        ],

        // 👇 生成的类型声明文件路径
        dts: 'src/types/generated/auto-imports.d.ts',

        // 👇 解析器（此处配置 Element Plus 按需导入）
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
        ],

        // 👇 启用 Vue 模板中的自动导入
        vueTemplate: true,

        // 👇 生成 ESLint 配置（解决未导入报错问题）
        eslintrc: {
          enabled: true,
        },
      }),

      // ===== 组件自动导入插件 =====
      Components({
        // 生成 TypeScript 组件声明文件
        dts: 'src/types/generated/components.d.ts',
        resolvers: [
          // 使用 Sass 引入 Element Plus 样式
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),

      // ===== 样式相关插件 =====
      tailwindcss(),

      // ===== 资源处理插件 =====
      Glsl({
        warnDuplicatedImports: false,
      }),

      // SVG 图标插件配置
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
        symbolId: `${env.VITE_APP_ICON_PREFIX || 'icon'}-[dir]-[name]`,
      }),
    ],
  })
})
