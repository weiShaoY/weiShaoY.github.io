<script lang="ts" setup>

import { decode, encode } from 'xmorse'

import Modal from './modal.vue'

const isShowModel = ref(false)

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

function handleSelectChange() {
  inputText.value = ''
}

watchEffect(() => {
  if (type.value === 'code') {
    encodedText.value = encode(inputText.value)
  }
  else {
    encodedText.value = decode(inputText.value)
  }
})

onMounted(() => {
  // getData()
})

/**
 * Base64 编码
 * @param {string} input - 需要编码的字符串
 * @returns {string} - 返回 Base64 编码后的字符串
 */
function base64Encode(input) {
  const base64Charset = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    '/',
  ]

  // 将字符串转换为二进制数据
  let binaryString = ''

  for (let i = 0; i < input.length; i++) {
    binaryString += input.charCodeAt(i).toString(2).padStart(8, '0') // 转为二进制
  }

  // 分组并编码为 Base64
  let base64String = ''

  for (let i = 0; i < binaryString.length; i += 6) {
    const segment = binaryString.slice(i, i + 6)

    const index = Number.parseInt(segment.padEnd(6, '0'), 2) // 将6位二进制转换为10进制索引

    base64String += base64Charset[index]
  }

  // 添加填充字符
  while (base64String.length % 4 !== 0) {
    base64String += '=' // 根据 Base64 的规则添加 '=' 填充
  }

  return base64String
}

/**
 * Base64 解码
 * @param {string} input - 需要解码的 Base64 编码字符串
 * @returns {string} - 返回解码后的字符串
 */
function base64Decode(input) {
  const base64Charset = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    '/',
  ]

  // 创建反向查找表
  const reverseCharset = {
  }

  base64Charset.forEach((char, index) => {
    reverseCharset[char] = index
  })

  // 去除末尾的填充字符
  input = input.replace(/=/g, '')

  // 将 Base64 字符串转换为二进制数据
  let binaryString = ''

  for (let i = 0; i < input.length; i++) {
    const index = reverseCharset[input[i]]

    binaryString += index.toString(2).padStart(6, '0')
  }

  // 将二进制字符串转换回字符
  let decodedString = ''

  for (let i = 0; i < binaryString.length; i += 8) {
    const segment = binaryString.slice(i, i + 8)

    decodedString += String.fromCharCode(Number.parseInt(segment, 2)) // 转回字符
  }

  return decodedString
}

</script>

<template>

  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <Modal
      v-if="isShowModel"
      v-model="isShowModel"
    />

    <div
      class="flex items-center gap-5"
    >
      <a-select
        v-model="type"
        class="w-40"
        placeholder="请选择查询类型"
        @change="handleSelectChange"
      >
        <a-option
          value="code"
        >
          Base64-编码
        </a-option>

        <a-option
          value="doCode"
        >
          Base64-解码
        </a-option>

      </a-select>

      <a-button
        type="primary"
        @click="isShowModel = true"
      >
        Base64编码对照表
      </a-button>
    </div>

    <a-textarea
      v-model="inputText"
      class="h-[40%] w-full"
      allow-clear
      :placeholder="type === 'code' ? '请输入要编码的内容' : '请输入要解码的内容'"
    />

    <a-divider />

    <div
      v-copy="encodedText"
      class="h-[40%] flex cursor-pointer border p-2"
    >

      <span
        v-if="encodedText"
      >
        {{ encodedText }}
      </span>

      <span
        v-else
        class="m-auto text-6"
      >
        {{ type === 'code' ? '编码结果' : '解码结果' }}
      </span>

    </div>
  </div>
</template>
