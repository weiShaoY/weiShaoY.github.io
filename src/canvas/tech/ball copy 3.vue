<script lang="ts" setup>
import {

  Icosahedron,
  OrbitControls,
} from '@tresjs/cientos'

import {
  TresCanvas,
  useRenderLoop,
} from '@tresjs/core'

import { shallowRef } from 'vue'

// 定义组件属性
const props = defineProps({
  /**
   * 图标 - 用于球体贴图的纹理路径
   * @type {string}
   */
  imageUrl: {
    type: String,
    required: true,
  },

  /**
   * 跳转地址
   * @type {string}
   */
  url: {
    type: String,
    default: '',
  },
})

const boxRef = shallowRef(null as any)

const { onLoop } = useRenderLoop()

// onLoop(({ delta, elapsed }) => {
//   if (boxRef.value && boxRef.value.rotation) {
//     boxRef.value.rotation.y += delta
//     boxRef.value.rotation.z = elapsed * 0.2
//   }
// })

</script>

<template>
  <TresCanvas
    class="h-full w-full"
  >
    <OrbitControls />

    <!-- 环境光 -->
    <TresAmbientLight
      :intensity="2"
    />

    <!-- 定向光 -->
    <TresDirectionalLight
      :position="[0, 0, 0.05]"
    />

    <!-- 网格 -->
    <TresMesh
      ref="boxRef"
      :scale="2"
    >

      <!-- 创建一个正二十面体 -->
      <Icosahedron
        :args="[1, 1]"
      >
        <TresMeshBasicMaterial
          color="red"
        />

      </Icosahedron>

    </TresMesh>

  </TresCanvas>
</template>
