import path from 'node:path'

import { vitePluginForArco } from '@arco-plugins/vite-vue'

import Vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'

import { ElementPlusResolver, TDesignResolver } from 'unplugin-vue-components/resolvers'

import Components from 'unplugin-vue-components/vite'

import VueMacros from 'unplugin-vue-macros/vite'

import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig, loadEnv } from 'vite'

import Glsl from 'vite-plugin-glsl'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(
    configEnv.mode,
    process.cwd(),
  ) as unknown as Env.ImportMeta

  return {
    resolve: {
      /**
       *  设置路径别名
       */
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 使用现代编译器 API (Sass 新特性支持)
          api: 'modern-compiler',

          /**
           * 全局注入的 SCSS 代码
           * @use 指令引入全局样式文件
           * as * 表示将所有 mixin/variables 导入全局命名空间
           */
          additionalData: `@use "@/theme/variables.scss" as *;`,

          // 注意：实际路径请根据项目结构调整
          // @/ 别名通常指向 src 目录
        },
      },
    },
    plugins: [
      Glsl(),

      vueJsx(),

      vueDevTools(),

      VueMacros({
        /**
         *  禁用宏选项定义
         */
        defineOptions: false,

        /**
         *  禁用宏模型定义
         */
        defineModels: false,
        plugins: {
          vue: Vue({
            script: {
              /**
               *  启用属性解构
               */
              propsDestructure: true,

              /**
               *  启用模型定义
               */
              defineModel: true,
            },
          }),
        },
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],

        /**
         *  生成类型定义文件
         */
        dts: 'src/types/auto-imports.d.ts',

        /**
         *  自动导入的目录
         */
        dirs: ['./src/composables', './src/utils'],

        /**
         *  启用 Vue 模板
         */
        vueTemplate: true,

        /**
         *  自动导入 TDesign 组件
         */
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        /**
         *  生成类型定义文件
         */
        dts: 'src/types/components.d.ts', // 生成的组件类型声明文件

        resolvers: [
          // 自动导入 Element Plus 组件，完整导入可查看 /src/plugins/ui.ts
          ElementPlusResolver({
            importStyle: false, // 不自动导入样式，完整导入可查看 /theme/index.ts
          }),

          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),

      VueRouter({
        // 生成路由类型声明文件
        dts: 'src/types/vue-router-vite.d.ts',
      }),

      // https://github.com/antfu/unocss
      // 查看 uno.config.ts 文件进行 Uno.css 配置
      UnoCSS(),

      //  Arco 按需引入
      vitePluginForArco({
        style: 'css',
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
        symbolId: `${viteEnv.VITE_APP_ICON_PREFIX}-[dir]-[name]`,
      }),
    ],
  }
})
