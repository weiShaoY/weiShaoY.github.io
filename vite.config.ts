import path from 'node:path'

// 导入 Node.js 的 path 模块

import { defineConfig } from 'vite'

// 导入 Vite 中的 defineConfig 函数

import Vue from '@vitejs/plugin-vue'

// 导入 Vite Vue 插件

import Components from 'unplugin-vue-components/vite'

// 导入 Vue 组件插件

import AutoImport from 'unplugin-auto-import/vite'

// 导入自动导入插件

import UnoCSS from 'unocss/vite'

// 导入 Uno.css 插件

import VueMacros from 'unplugin-vue-macros/vite'

// 导入 Vue 路由自动导入插件

import { vitePluginForArco } from '@arco-plugins/vite-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`, // 设置路径别名
      '@/': `${path.resolve(__dirname, 'src')}/`, // 设置路径别名
    },
  },
  plugins: [

    vueJsx(),

    vueDevTools(),

    VueMacros({
      defineOptions: false, // 禁用宏选项定义
      defineModels: false, // 禁用宏模型定义
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true, // 启用属性解构
            defineModel: true, // 启用模型定义
          },
        }),
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dts: true, // 生成类型定义文件
      dirs: [
        './src/composables', // 自动导入的目录
      ],
      vueTemplate: true, // 启用 Vue 模板
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true, // 生成类型定义文件
    }),

    // https://github.com/antfu/unocss
    // 查看 uno.config.ts 文件进行 Uno.css 配置
    UnoCSS(),

    //  Arco 按需引入
    vitePluginForArco({
      style: 'css',
    }),

  ],

})
