<script lang="ts" setup>
import { Icosahedron } from '@tresjs/cientos'

import {
  TresCanvas,
  useLoader,
  useRenderLoop,
} from '@tresjs/core'

import { TextureLoader } from 'three'

import {
  ref,
  shallowRef,
} from 'vue'

// 定义组件属性
const props = defineProps({
  /**
   * 图标 - 用于球体贴图的纹理路径
   */
  image: {
    type: String,
    required: true,
  },

  /**
   * 跳转地址
   */
  url: {
    type: String,
    default: '',
  },
})

// 用于引用 3D 对象
const boxRef = shallowRef(null)

// 加载状态和纹理
const isTextureLoaded = ref(false)

const texture = ref(null)

// 使用 useLoader 加载纹理
useLoader(TextureLoader, props.image, (loadedTexture) => {
  texture.value = loadedTexture
  isTextureLoaded.value = true
})

// 使用渲染循环
const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (boxRef.value && isTextureLoaded.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresCanvas
    alpha
  >
    <!-- 只有纹理加载完成后才渲染 -->
    <template
      v-if="isTextureLoaded"
    >
      <!-- 环境光 -->
      <TresAmbientLight
        :intensity="2"
      />

      <!-- 定向光 -->
      <TresDirectionalLight
        cast-shadow
        :position="[0, 0, 0.05]"
      />

      <!-- 网格对象 -->
      <TresMesh
        ref="boxRef"
        :scale="2"
        cast-shadow
      >
        <TresMeshStandardMaterial
          :map="texture"
        />
        <!-- 正二十面体 -->
        <Icosahedron
          :args="[1, 1]"
        />
      </TresMesh>
    </template>

    <template
      v-else
    >
      <!-- 加载中提示 -->
      <div
        class="loading"
      >
        加载中...
      </div>
    </template>
  </TresCanvas>
</template>

<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #aaa;
}
</style>
