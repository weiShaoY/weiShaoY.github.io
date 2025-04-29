<script setup lang="ts">

import { html } from '@codemirror/lang-html'

import { javascript } from '@codemirror/lang-javascript'

import { typeScript } from '@codemirror/lang-typescript'

import { dracula, solarizedLight } from 'thememirror'

import CodeMirror from 'vue-codemirror6'

const lang = javascript()

const input = ref('')

</script>

<template>
  <div
    class="h-screen w-full flex items-center justify-center gap-10"
  >
    <el-input
      v-model="input"
      placeholder="请输入内容"
    />

    <div
      class="h-200 w-200 rounded-3 bg-[rgba(171,184,195,1)] bg-auto bg-repeat p-5"
    >
      <CodeMirror
        v-model="input"
        :lang="lang"
        :extensions="[solarizedLight]"
        basic
        :tab-size="4"
        class="!h-full !w-full"
      />

    </div>

  </div>

</template>

<style>
.cm-editor {
  height: 100%;
  border-radius: 12px !important;
  border: none !important;
  overflow: hidden;
}
</style>
