<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const tableData = [
  {
    id: 1,
    describe: '1995年3.21 特大枪击案',
  },
  {
    id: 2,
    describe: '1997年7.13 市北区殴打致死案',
  },
  {
    id: 3,
    describe: '198年1.19腾飞金融集团债权债务纠纷案件',
  },
  {
    id: 4,
    describe: '1998年5.28非法经营案件查看详情',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
]
</script>

<template>

  <div
    class="h-full flex-col"
  >
    <el-descriptions
      border
      :column="3"
    >
      <el-descriptions-item
        label="头像"
        align="center"
        :rowspan="5"
      >
        <el-image
          style="width: 100px; height: 100px"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-descriptions-item>

      <el-descriptions-item
        label="省份证号码"
      >
        110101199901010047
      </el-descriptions-item>

      <el-descriptions-item
        label="姓名"
      >
        黄有发
      </el-descriptions-item>

      <el-descriptions-item
        label="性别"
      >
        男
      </el-descriptions-item>

      <el-descriptions-item
        label="民族"
      >
        汉族
      </el-descriptions-item>

      <el-descriptions-item
        label="住址详址"
        :span="2"
      >
        海东省青安市市北区安阳路124号05栋
      </el-descriptions-item>

      <el-descriptions-item
        label="所属分县局"
      >
        青安市公安局
      </el-descriptions-item>

      <el-descriptions-item
        label="所属派出所名称"
      >
        市北区派出所
      </el-descriptions-item>

      <el-descriptions-item
        label="所属省市县"
      >
        海东省青安市
      </el-descriptions-item>

      <el-descriptions-item
        label="出生日期"
      >
        1964-06-12
      </el-descriptions-item>
    </el-descriptions>

    <el-divider />

    <div
      class="mb-2 text-5 font-bold"
    >
      关联信息
    </div>

    <div
      class="flex-col flex-1 justify-around"
    >
      <el-table
        :data="tableData"
        :show-header="false"
        style="width: 100%"
        max-height="65%"
        height="65%"
      >
        <el-table-column
          prop="describe"
          align="start"
        />

        <el-table-column
          prop="id"
          fixed="right"
          :width="120"
        >
          <el-button
            type="primary"
          >
            查看详情
          </el-button>

        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        class="mx-auto"
      />

    </div>

  </div>
</template>

<style lang="less" scoped>

</style>
