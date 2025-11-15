# Package Dependencies 详细说明

## 🎯 项目技术栈概览

这是一个基于 **Vue 3 + TypeScript + Vite** 的现代化前端项目，集成了 **3D 可视化**、**数据图表**、**富文本编辑** 等高级功能。

---

## 📦 Production Dependencies (dependencies)

### 🏗️ 核心框架 (Core Framework)

| 包名                          | 版本    | 作用描述                                                                      |
| ----------------------------- | ------- | ----------------------------------------------------------------------------- |
| `vue`                         | ^3.5.24 | **Vue 3 核心库** - 渐进式 JavaScript 框架，提供响应式数据绑定和组件化开发     |
| `vue-router`                  | ^4.6.3  | **Vue 路由管理器** - 单页面应用的路由控制，支持嵌套路由、路由守卫等           |
| `pinia`                       | ^3.0.4  | **Vue 状态管理** - 下一代 Vue 状态管理库，替代 Vuex，提供 TypeScript 友好 API |
| `pinia-plugin-persistedstate` | ^4.7.1  | **Pinia 持久化插件** - 将 Pinia 状态持久化到 localStorage/sessionStorage      |

### 🎨 UI 组件库 (UI Components)

| 包名              | 版本    | 作用描述                                                                    |
| ----------------- | ------- | --------------------------------------------------------------------------- |
| `element-plus`    | ^2.11.1 | **Element Plus 组件库** - 基于 Vue 3 的企业级 UI 组件库，提供丰富的预制组件 |
| `qrcode.vue`      | ^3.6.0  | **二维码生成组件** - Vue 3 二维码生成器，可自定义样式和内容                 |
| `vue-echarts`     | ^8.0.1  | **ECharts Vue 组件** - Apache ECharts 的 Vue 3 封装，用于数据可视化图表     |
| `vue-json-pretty` | ^2.6.0  | **JSON 美化显示组件** - 用于优雅地展示和格式化 JSON 数据                    |

### 🔧 工具库 (Utility Libraries)

| 包名           | 版本     | 作用描述                                                                   |
| -------------- | -------- | -------------------------------------------------------------------------- |
| `axios`        | ^1.13.2  | **HTTP 客户端** - 基于 Promise 的 HTTP 库，用于浏览器和 Node.js 的请求处理 |
| `lodash`       | ^4.17.21 | **JavaScript 工具库** - 提供数组、对象、字符串等操作的实用函数             |
| `nprogress`    | ^0.2.0   | **页面加载进度条** - 在页面顶部显示加载进度，提升用户体验                  |
| `md5-ts`       | ^0.1.6   | **MD5 加密库** - TypeScript 版本的 MD5 哈希算法实现，用于数据加密          |
| `color`        | ^5.0.3   | **颜色处理库** - 强大的颜色转换、操作和格式化工具体                        |
| `tiny-emitter` | ^2.1.0   | **轻量级事件发射器** - 简单的事件发布/订阅模式实现                         |

### 🎬 动画和 3D 图形 (Animation & 3D Graphics)

| 包名                           | 版本     | 作用描述                                                            |
| ------------------------------ | -------- | ------------------------------------------------------------------- |
| `gsap`                         | ^3.13.0  | **GreenSock 动画平台** - 专业级 JavaScript 动画库，高性能动画效果   |
| `three`                        | ^0.181.1 | **Three.js 3D 库** - 最流行的 WebGL 3D 图形库，用于创建3D场景和对象 |
| `three-globe`                  | ^2.45.0  | **3D 地球可视化** - 基于 Three.js 的3D地球和地理数据可视化库        |
| `three-stdlib`                 | ^2.36.0  | **Three.js 标准库** - Three.js 的常用工具和加载器的集合             |
| `three-custom-shader-material` | ^6.4.0   | **自定义着色器材质** - 为 Three.js 提供自定义 GLSL 着色器支持       |
| `three.interactive`            | ^1.8.0   | **Three.js 交互支持** - 为 Three.js 3D对象添加鼠标交互事件          |
| `lygia`                        | 1.3.3    | **GLSL 着色器库** - 包含大量可重用的 GLSL 着色器函数和效果          |

### 📊 数据可视化 (Data Visualization)

| 包名      | 版本   | 作用描述                                                      |
| --------- | ------ | ------------------------------------------------------------- |
| `echarts` | ^6.0.0 | **ECharts 图表库** - 百度开源的可视化图表库，支持多种图表类型 |

### 🔌 Vue 工具集 (Vue Utilities)

| 包名             | 版本    | 作用描述                                                    |
| ---------------- | ------- | ----------------------------------------------------------- |
| `@vueuse/core`   | ^14.0.0 | **Vue 组合式 API 工具集** - 提供大量实用的 Vue 3 组合式函数 |
| `@vueuse/motion` | ^3.0.3  | **Vue 动画工具** - 基于 VueUse 的声明式动画解决方案         |

### 🛠️ 功能工具 (Functional Tools)

| 包名               | 版本   | 作用描述                                                    |
| ------------------ | ------ | ----------------------------------------------------------- |
| `autofit.js`       | ^3.2.8 | **页面自适应工具** - 自动调整页面尺寸以适应不同屏幕大小     |
| `point-in-polygon` | ^1.1.0 | **点与多边形关系检测** - 判断点是否在多边形内部的算法       |
| `lunar-typescript` | ^1.8.6 | **农历日期库** - 支持农历日期计算和传统节日的 TypeScript 库 |

### 📝 内容处理 (Content Processing)

| 包名                     | 版本          | 作用描述                                                              |
| ------------------------ | ------------- | --------------------------------------------------------------------- |
| `highlight.js`           | ^11.11.1      | **代码语法高亮** - 在网页中高亮显示代码语法，支持多种编程语言         |
| `katex`                  | ^0.16.25      | **数学公式渲染** - 快速在网页中渲染 LaTeX 数学公式                    |
| `typeit`                 | ^8.8.7        | **打字机效果库** - 创建打字机动画效果的 JavaScript 库                 |
| `xmorse`                 | ^1.0.0        | **摩斯电码工具** - 摩斯电码的编码和解码工具库                         |
| `stream-markdown`        | ^0.0.9        | **流式 Markdown 处理** - 支持流式处理和解析 Markdown 内容的库         |
| `stream-markdown-parser` | ^0.0.20       | **流式 Markdown 解析器** - 专门用于流式解析 Markdown 的解析器         |
| `vue-renderer-markdown`  | 0.0.61-beta.9 | **Vue Markdown 渲染器** - 在 Vue 应用中渲染 Markdown 内容的专用渲染器 |

### 🎵 媒体和交互 (Media & Interaction)

| 包名              | 版本    | 作用描述                                                         |
| ----------------- | ------- | ---------------------------------------------------------------- |
| `@simonwep/pickr` | ^1.9.1  | **颜色选择器** - 现代化、可定制的颜色选择器组件                  |
| `xgplayer`        | ^3.0.23 | **视频播放器** - 功能丰富的 HTML5 视频播放器，支持多种格式和插件 |

### 🌐 第三方服务 (Third-party Services)

| 包名               | 版本   | 作用描述                                                    |
| ------------------ | ------ | ----------------------------------------------------------- |
| `@emailjs/browser` | ^4.4.1 | **电子邮件服务** - 直接从客户端发送电子邮件，无需后端服务器 |

---

## 🔧 Development Dependencies (devDependencies)

### 🛠️ 构建工具 (Build Tools)

| 包名                       | 版本   | 作用描述                                                          |
| -------------------------- | ------ | ----------------------------------------------------------------- |
| `vite`                     | ^7.2.2 | **下一代前端构建工具** - 极速的开发服务器和构建工具，替代 Webpack |
| `@vitejs/plugin-vue`       | ^6.0.1 | **Vite Vue 插件** - Vite 的官方 Vue 3 单文件组件支持              |
| `@vitejs/plugin-vue-jsx`   | ^5.1.1 | **Vite Vue JSX 插件** - 在 Vue 3 中使用 JSX 语法的支持            |
| `vite-plugin-glsl`         | ^1.5.4 | **GLSL 导入插件** - 在 Vite 中直接导入 GLSL 着色器文件            |
| `vite-plugin-svg-icons-ng` | ^1.5.2 | **SVG 图标插件** - 将 SVG 图标转换为 Vue 组件                     |
| `vite-plugin-vue-devtools` | ^8.0.3 | **Vue DevTools 集成** - 在开发环境中集成 Vue DevTools             |

### 🎨 样式系统 (Styling System)

| 包名                           | 版本    | 作用描述                                                          |
| ------------------------------ | ------- | ----------------------------------------------------------------- |
| `unocss`                       | ^66.5.5 | **原子化 CSS 引擎** - 即时按需的原子化 CSS 引擎，类似 TailwindCSS |
| `@unocss/reset`                | ^66.5.5 | **UnoCSS 重置样式** - 提供 CSS 重置样式表                         |
| `unocss-preset-scrollbar-hide` | ^1.0.1  | **滚动条隐藏预设** - UnoCSS 的滚动条隐藏工具                      |
| `tailwind-merge`               | ^3.4.0  | **Tailwind 类名合并** - 智能合并和冲突解决 Tailwind CSS 类名      |
| `sass`                         | 1.93.3  | **Sass 预处理器** - 专业级 CSS 扩展语言                           |

### 📐 类型系统 (Type System)

| 包名               | 版本     | 作用描述                                                                  |
| ------------------ | -------- | ------------------------------------------------------------------------- |
| `typescript`       | ^5.9.3   | **TypeScript 语言** - JavaScript 的超集，提供静态类型检查                 |
| `vue-tsc`          | ^3.1.3   | **Vue TypeScript 检查** - 用于 Vue 单文件组件的 TypeScript 命令行检查工具 |
| `@types/node`      | ^24.10.0 | **Node.js 类型定义** - Node.js 核心模块的 TypeScript 类型定义             |
| `@types/three`     | ^0.181.0 | **Three.js 类型定义** - Three.js 库的 TypeScript 类型定义                 |
| `@types/lodash`    | ^4.17.20 | **Lodash 类型定义** - Lodash 工具库的 TypeScript 类型定义                 |
| `@types/nprogress` | ^0.2.3   | **NProgress 类型定义** - NProgress 库的 TypeScript 类型定义               |
| `@types/color`     | ^4.2.0   | **Color 类型定义** - Color 库的 TypeScript 类型定义                       |
| `@types/d3-geo`    | ^3.1.0   | **D3 Geo 类型定义** - D3 地理投影的类型定义                               |

### 🧹 代码质量 (Code Quality)

| 包名                    | 版本    | 作用描述                                                             |
| ----------------------- | ------- | -------------------------------------------------------------------- |
| `eslint`                | ^9.39.1 | **JavaScript 代码检查** - 可配置的 JavaScript 代码质量和风格检查工具 |
| `@antfu/eslint-config`  | ^6.2.0  | **Antfu ESLint 配置** - 由 Anthony Fu 维护的现代 ESLint 配置预设     |
| `@unocss/eslint-config` | ^66.5.5 | **UnoCSS ESLint 配置** - UnoCSS 的 ESLint 配置                       |
| `@unocss/eslint-plugin` | ^66.5.5 | **UnoCSS ESLint 插件** - UnoCSS 的 ESLint 规则插件                   |
| `eslint-plugin-format`  | ^1.0.2  | **代码格式化插件** - 代码格式化的 ESLint 规则                        |

### 🔌 自动导入 (Auto Imports)

| 包名                      | 版本    | 作用描述                                                            |
| ------------------------- | ------- | ------------------------------------------------------------------- |
| `unplugin-auto-import`    | ^20.2.0 | **自动导入插件** - 自动导入 Vue、VueRouter 等 API，减少 import 语句 |
| `unplugin-vue-components` | ^30.0.0 | **Vue 组件自动导入** - 自动按需导入 Vue 组件                        |
| `unplugin-vue-macros`     | ^2.14.5 | **Vue 宏插件** - 为 Vue 提供更多编译时宏功能                        |
| `unplugin-vue-router`     | ^0.17.0 | **Vue 路由自动导入** - 自动生成和导入 Vue 路由                      |

### 🔧 开发工具 (Development Tools)

| 包名    | 版本     | 作用描述                                                    |
| ------- | -------- | ----------------------------------------------------------- |
| `pnpm`  | ^10.20.0 | **快速包管理器** - 快速、节省磁盘空间的 JavaScript 包管理器 |
| `taze`  | ^19.9.0  | **依赖更新工具** - 现代化依赖更新工具，检查并更新包版本     |
| `shiki` | ^3.15.0  | **代码高亮引擎** - 基于 TextMate 语法的代码高亮器           |

### 🧪 测试工具 (Testing Tools)

| 包名                | 版本   | 作用描述                                                               |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| `@vue/test-utils`   | ^2.4.6 | **Vue 测试工具** - 用于测试 Vue 组件的官方工具库                       |
| `@vue-macros/volar` | ^3.1.1 | **Vue 宏的 Volar 支持** - 为 Vue Macros 提供 Volar TypeScript 插件支持 |

---

## 🚀 项目特色功能

基于这些依赖，项目具备以下特色能力：

### 🎯 核心能力

- **现代化开发体验**: Vue 3 + TypeScript + Vite 技术栈
- **响应式设计**: 支持多端自适应的 UI 系统
- **类型安全**: 完整的 TypeScript 类型支持

### 🎨 视觉效果

- **3D 图形渲染**: Three.js 驱动的 3D 场景和地球可视化
- **高级动画**: GSAP 专业级动画效果
- **数据图表**: ECharts 丰富的图表展示
- **交互体验**: 丰富的用户交互和反馈

### 📝 内容处理能力

- **Markdown 渲染**: 完整的 Markdown 内容处理流水线
- **代码高亮**: 支持多种编程语言的语法高亮
- **数学公式**: LaTeX 数学公式渲染支持
- **富文本功能**: 流式 Markdown 解析和渲染

### 🔧 开发效率

- **自动化工具**: 自动导入、组件解析等开发辅助
- **代码质量**: ESLint 代码规范和风格检查
- **开发体验**: 热重载、TypeScript 支持、调试工具

### 📦 功能模块

- **状态管理**: Pinia 现代化状态管理
- **路由控制**: Vue Router 4 路由系统
- **UI 组件**: Element Plus 企业级组件库
- **工具函数**: 丰富的工具库支持

---

## 📋 项目脚本说明

| 脚本命令         | 功能描述                 |
| ---------------- | ------------------------ |
| `pnpm dev`       | 启动开发服务器           |
| `pnpm build`     | 构建生产版本             |
| `pnpm preview`   | 预览构建结果             |
| `pnpm lint`      | 运行代码检查             |
| `pnpm lint:fix`  | 自动修复代码问题         |
| `pnpm typecheck` | 运行 TypeScript 类型检查 |
| `pnpm up`        | 更新依赖包版本           |
| `pnpm clean`     | 清理 node_modules 目录   |

## 🔄 Markdown 处理流程

项目中的 Markdown 处理采用了完整的流水线：

1. **解析阶段**: `stream-markdown-parser` → 流式解析原始 Markdown
2. **处理阶段**: `stream-markdown` → 流式处理和转换 Markdown 内容
3. **渲染阶段**: `vue-renderer-markdown` → 在 Vue 组件中渲染最终结果

这个技术栈组合体现了现代前端开发的最佳实践，特别适合需要丰富视觉效果、交互体验和内容管理功能的复杂应用场景。
