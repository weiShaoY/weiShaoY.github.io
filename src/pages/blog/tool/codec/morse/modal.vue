<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const visible = defineModel({
  type: Boolean,
})

const morseCodeData = [
  {
    key: 0,
    char: 'A',
    code: '.-',
  },
  {
    key: 1,
    char: 'B',
    code: '-...',
  },
  {
    key: 2,
    char: 'C',
    code: '-.-.',
  },
  {
    key: 3,
    char: 'D',
    code: '-..',
  },
  {
    key: 4,
    char: 'E',
    code: '.',
  },
  {
    key: 5,
    char: 'F',
    code: '..-.',
  },
  {
    key: 6,
    char: 'G',
    code: '--.',
  },
  {
    key: 7,
    char: 'H',
    code: '....',
  },
  {
    key: 8,
    char: 'I',
    code: '..',
  },
  {
    key: 9,
    char: 'J',
    code: '.---',
  },
  {
    key: 10,
    char: 'K',
    code: '-.-',
  },
  {
    key: 11,
    char: 'L',
    code: '.-..',
  },
  {
    key: 12,
    char: 'M',
    code: '--',
  },
  {
    key: 13,
    char: 'N',
    code: '-.',
  },
  {
    key: 14,
    char: 'O',
    code: '---',
  },
  {
    key: 15,
    char: 'P',
    code: '.--.',
  },
  {
    key: 16,
    char: 'Q',
    code: '--.-',
  },
  {
    key: 17,
    char: 'R',
    code: '.-.',
  },
  {
    key: 18,
    char: 'S',
    code: '...',
  },
  {
    key: 19,
    char: 'T',
    code: '-',
  },
  {
    key: 20,
    char: 'U',
    code: '..-',
  },
  {
    key: 21,
    char: 'V',
    code: '...-',
  },
  {
    key: 22,
    char: 'W',
    code: '.--',
  },
  {
    key: 23,
    char: 'X',
    code: '-..-',
  },
  {
    key: 24,
    char: 'Y',
    code: '-.--',
  },
  {
    key: 25,
    char: 'Z',
    code: '--..',
  },
  {
    key: 26,
    char: '1',
    code: '.----',
  },
  {
    key: 27,
    char: '2',
    code: '..---',
  },
  {
    key: 28,
    char: '3',
    code: '...--',
  },
  {
    key: 29,
    char: '4',
    code: '....-',
  },
  {
    key: 30,
    char: '5',
    code: '.....',
  },
  {
    key: 31,
    char: '6',
    code: '-....',
  },
  {
    key: 32,
    char: '7',
    code: '--...',
  },
  {
    key: 33,
    char: '8',
    code: '---..',
  },
  {
    key: 34,
    char: '9',
    code: '----.',
  },
  {
    key: 35,
    char: '0',
    code: '-----',
  },
]

</script>

<template>

  <el-dialog
    v-model="visible"
    title="摩斯密码表"
    :footer="false"
    :show-close="false"
    :lock-scroll="false"
    :width="1000"
  >

    <el-descriptions
      class="margin-top"
      :column="4"
      border
    >
      <el-descriptions-item
        v-for="item in 4"
        :key="item"
        :span="1"
        label="码值"
        align="center"
      >
        字符
      </el-descriptions-item>

      <el-descriptions-item
        v-for="item in morseCodeData"
        :key="item.key"
        :span="1"
        :label="item.char"
        align="center"
      >
        <el-link
          v-copy="{
            text: item.code,
          }"
          type="primary"
        >
          {{ item.code }}
        </el-link>
      </el-descriptions-item>

    </el-descriptions>
  </el-dialog>
</template>
