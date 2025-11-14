<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const router = useRouter()

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
    describe: '1998年1.19腾飞金融集团债权债务纠纷案件',
  },
  {
    id: 4,
    describe: '1999年5.28非法经营案件查看详情',
  },
  {
    id: 5,
    describe: '2000年10.4昌平路聚众闹事案件',
  },
  {
    id: 6,
    describe: '2001年10.4昌平路聚众闹事案件',
  },
  {
    id: 7,
    describe: '2002年10.4昌平路聚众闹事案件',
  },
  {
    id: 8,
    describe: '2003年10.4昌平路聚众闹事案件',
  },
  {
    id: 8,
    describe: '2004年10.4昌平路聚众闹事案件',
  },
  {
    id: 9,
    describe: '2005年10.4昌平路聚众闹事案件',
  },
  {
    id: 10,
    describe: '2006年10.4昌平路聚众闹事案件',
  },
  {
    id: 11,
    describe: '2007年10.4昌平路聚众闹事案件',
  },
  {
    id: 12,
    describe: '2008年10.4昌平路聚众闹事案件',
  },
  {
    id: 13,
    describe: '2009年10.4昌平路聚众闹事案件',
  },
  {
    id: 14,
    describe: '2010年10.4昌平路聚众闹事案件',
  },
  {
    id: 15,
    describe: '2011年10.4昌平路聚众闹事案件',
  },
  {
    id: 16,
    describe: '2012年10.4昌平路聚众闹事案件',
  },
]

function handleClick(item: any) {
  router.push({
    name: 'PoliceIdentityQueryDetail',
    query: {
      id: item.id,
    },
  })
}
</script>

<template>

  <div
    class="h-full flex-col rounded-3 bg-white p-10"
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
      class="flex-col flex-1 justify-between overflow-hidden"
    >
      <el-table
        :data="tableData"
        :show-header="false"
        class="!w-full"
        height="90%"
        scrollbar-always-on
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

          <template
            #default="{ row }"
          >
            <el-button
              type="primary"
              @click="handleClick(row)"
            >
              查看详情
            </el-button>
          </template>

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

<style lang="scss" scoped>

</style>
