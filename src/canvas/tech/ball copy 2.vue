<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

import { TresCanvas, useRenderLoop } from '@tresjs/core'

import { shallowRef } from 'vue'
</script>

<script lang="ts" setup>

const boxRef = shallowRef(null)

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})

</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
    window-size
  >
    <!-- 环境光 -->
    <TresAmbientLight
      :intensity="2"
    />

    <TresDirectionalLight
      cast-shadow
      :position="[0, 0, 0.05]"
    />

    <OrbitControls />

    <TresPerspectiveCamera
      :position="[1, 2, 5]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />

    <TresMesh
      ref="boxRef"
      :scale="1"
      cast-shadow
    >
      <TresBoxGeometry
        :args="[1, 1, 1]"
      />

      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>

<template>
  <TresCanvas
    class="h-full w-full"
>
    <!-- 环境光 -->
    <TresAmbientLight
      :intensity="2"
    />

    <TresDirectionalLight
      cast-shadow
      :position="[0, 0, 0.05]"
    />

    <TresMesh>
      <TresTorusGeometry
        :args="[1, 0.5, 16, 32]"
      />

      <TresMeshBasicMaterial
        color="#fff8ef"
      />

      <!-- 创建一个正二十面体 -->
      <Icosahedron
        :args="[1, 1]"
      />
    </TresMesh>

  </TresCanvas>
</template>
