<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const dnsList = [
  {
    label: '114DNS',
    value: '114.114.114.114',
  },
  {
    label: '阿里云',
    value: '223.5.5.5',
  },
  {
    label: '百度DNS',
    value: '180.76.76.76',
  },
  {
    label: 'DNSPod',
    value: '119.29.29.29',
  },
  {
    label: 'CNNIC sdns',
    value: '1.2.4.8',
  },
  {
    label: '谷歌DNS',
    value: '8.8.8.8',
  },
  {
    label: 'OpenDNS',
    value: '208.67.220.220',
  },
  {
    label: 'Yandex DNS',
    value: '77.88.8.8',
  },
  {
    label: 'V2EX DNS',
    value: '199.91.73.222',
  },
]
</script>

<template>
  <div
    class=""
  >
    <a-descriptions
      :column="{ xs: 1, md: 1, lg: 1 }"
      bordered
    >
      <a-descriptions-item
        v-for="item in dnsList"
        :key="item.value"
        :span="1"
        :label="item.label"
      >
        <div
          class="flex items-center justify-between"
        >
          <span>
            {{ item.value }}
          </span>

          <a-link
            :href="`https://dns.google.com/resolve?name=${item.value}`"
            target="_blank"
            class="ml-2"
          >
            查看
          </a-link>
        </div>

      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<style lang="less" scoped></style>
