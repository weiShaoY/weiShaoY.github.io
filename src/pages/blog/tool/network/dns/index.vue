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
    <el-descriptions
      :column="1"
      border
    >
      <el-descriptions-item
        v-for="item in dnsList"
        :key="item.value"
        :span="1"
        :label="item.label"
      >
        <div
          class="flex items-center justify-between"
        >

          <el-link
            v-copy="item.value"
            type="primary"
          >
            {{ item.value }}

          </el-link>

          <el-link
            :href="`https://dns.google.com/resolve?name=${item.value}`"
            target="_blank"
            class="ml-2"
            type="primary"
          >
            查看
          </el-link>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style lang="less" scoped></style>
