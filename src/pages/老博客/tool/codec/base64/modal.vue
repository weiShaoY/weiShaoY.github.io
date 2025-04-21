<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const visible = defineModel({
  type: Boolean,
})

const base64Data = [
  {
    value: 0,
    label: 'A',
  },
  {
    value: 1,
    label: 'B',
  },
  {
    value: 2,
    label: 'C',
  },
  {
    value: 3,
    label: 'D',
  },
  {
    value: 4,
    label: 'E',
  },
  {
    value: 5,
    label: 'F',
  },
  {
    value: 6,
    label: 'G',
  },
  {
    value: 7,
    label: 'H',
  },
  {
    value: 8,
    label: 'I',
  },
  {
    value: 9,
    label: 'J',
  },
  {
    value: 10,
    label: 'K',
  },
  {
    value: 11,
    label: 'L',
  },
  {
    value: 12,
    label: 'M',
  },
  {
    value: 13,
    label: 'N',
  },
  {
    value: 14,
    label: 'O',
  },
  {
    value: 15,
    label: 'P',
  },
  {
    value: 16,
    label: 'Q',
  },
  {
    value: 17,
    label: 'R',
  },
  {
    value: 18,
    label: 'S',
  },
  {
    value: 19,
    label: 'T',
  },
  {
    value: 20,
    label: 'U',
  },
  {
    value: 21,
    label: 'V',
  },
  {
    value: 22,
    label: 'W',
  },
  {
    value: 23,
    label: 'X',
  },
  {
    value: 24,
    label: 'Y',
  },
  {
    value: 25,
    label: 'Z',
  },
  {
    value: 26,
    label: 'a',
  },
  {
    value: 27,
    label: 'b',
  },
  {
    value: 28,
    label: 'c',
  },
  {
    value: 29,
    label: 'd',
  },
  {
    value: 30,
    label: 'e',
  },
  {
    value: 31,
    label: 'f',
  },
  {
    value: 32,
    label: 'g',
  },
  {
    value: 33,
    label: 'h',
  },
  {
    value: 34,
    label: 'i',
  },
  {
    value: 35,
    label: 'j',
  },
  {
    value: 36,
    label: 'k',
  },
  {
    value: 37,
    label: 'l',
  },
  {
    value: 38,
    label: 'm',
  },
  {
    value: 39,
    label: 'n',
  },
  {
    value: 40,
    label: 'o',
  },
  {
    value: 41,
    label: 'p',
  },
  {
    value: 42,
    label: 'q',
  },
  {
    value: 43,
    label: 'r',
  },
  {
    value: 44,
    label: 's',
  },
  {
    value: 45,
    label: 't',
  },
  {
    value: 46,
    label: 'u',
  },
  {
    value: 47,
    label: 'v',
  },
  {
    value: 48,
    label: 'w',
  },
  {
    value: 49,
    label: 'x',
  },
  {
    value: 50,
    label: 'y',
  },
  {
    value: 51,
    label: 'z',
  },
  {
    value: 52,
    label: '0',
  },
  {
    value: 53,
    label: '1',
  },
  {
    value: 54,
    label: '2',
  },
  {
    value: 55,
    label: '3',
  },
  {
    value: 56,
    label: '4',
  },
  {
    value: 57,
    label: '5',
  },
  {
    value: 58,
    label: '6',
  },
  {
    value: 59,
    label: '7',
  },
  {
    value: 60,
    label: '8',
  },
  {
    value: 61,
    label: '9',
  },
  {
    value: 62,
    label: '+',
  },
  {
    value: 63,
    label: '/',
  },
]
</script>

<template>
  <a-modal
    v-model:visible="visible"
    :footer="false"
    :width="1000"
  >
    <template
      #title
    >
      Base64编码对照表
    </template>

    <a-descriptions
      :column="{ xs: 4, md: 4, lg: 4 }"
      bordered
      align="center"
    >
      <a-descriptions-item
        v-for="item in 4"
        :key="item"
        :span="1"
        label="码值"
      >
        字符
      </a-descriptions-item>

      <a-descriptions-item
        v-for="item in base64Data"
        :key="item.value"
        :span="1"
        :label="item.value.toString()"
      >
        <a-link
          v-copy="item.label"
        >
          {{ item.label }}
        </a-link>
      </a-descriptions-item>

    </a-descriptions>
  </a-modal>
</template>

<style lang="less" scoped>

</style>
