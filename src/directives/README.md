# Directives 指令模块

这个文件夹包含了所有的 Vue 自定义指令。

## 文件结构

```directives/
├── index.ts          # 主入口文件，统一注册所有指令
├── types/            # （已迁移）旧类型定义文件夹
│   └── index.ts     # 建议改为使用 src/types/directives.d.ts
├── modules/          # 指令模块文件夹
│   ├── animatedText.ts      # 逐行文字加载动画指令
│   ├── canvasLoading.ts     # Canvas加载动画指令
│   ├── copy.ts              # 点击复制指令
│   ├── debounce.ts          # 防抖指令
│   ├── light.ts             # 光源卡片指令
│   ├── throttle.ts          # 节流指令
│   └── waterMarker.ts       # 水印指令
└── README.md         # 说明文档
```

## 使用方法

### 1. 全局注册

```typescript
import { createApp } from 'vue'

import directives from '@/directives'

import App from './App.vue'

const app = createApp(App)

app.use(directives)
app.mount('#app')
```

### 2. 在组件中使用

```vue
<template>
  <!-- 基础用法 -->
  <div
    v-animated-text
  >
    逐行显示的文字
  </div>

  <!-- 带参数的用法 -->
  <canvas
    v-canvas-loading="{ width: 200, height: 200, color: '#ff0000' }"
  />

  <!-- 复制指令 -->
  <button
    v-copy="{ text: '要复制的文本' }"
  >
    复制
  </button>

  <!-- 防抖指令 -->
  <input
    v-debounce="{ delay: 300 }"
    @input="handleInput"
  >

  <!-- 节流指令 -->
  <button
    v-throttle="{ delay: 1000 }"
    @click="handleClick"
  >
    点击
  </button>

  <!-- 光源效果 -->
  <div
    v-light="{ color: '#00ff00', intensity: 0.8 }"
  >
    光源效果
  </div>

  <!-- 水印 -->
  <div
    v-water-marker="{ text: '水印文字', opacity: 0.3 }"
  >
    内容区域
  </div>
</template>
```

## 类型定义

所有指令的类型定义已集中到全局命名空间文件 `src/types/directives.d.ts`（命名空间：`AppDirectives`），包括：

- `BaseDirectiveType`: 基础指令类型
- `DirectivesMapType`: 指令映射类型
- `DirectiveInstallerType`: 指令安装器类型
- 各指令的参数类型接口

## 添加新指令

1. 在 `modules/` 文件夹中创建新的指令文件
2. 在 `src/types/directives.d.ts` 的命名空间 `AppDirectives` 中添加相应的类型定义
3. 在 `index.ts` 中导入并注册新指令

## 注意事项

- 所有指令都使用 TypeScript 编写，提供完整的类型支持
- 指令参数都有默认值，可以省略
- 支持链式调用和组合使用
