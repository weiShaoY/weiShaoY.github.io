<script lang="ts" setup>
import { ref } from 'vue'

import { BlogApi } from '@/apis'

const isLoading = ref(false)

const region = ref('ios_qq')

const hero = ref('百里守约')

const hokData = ref<any>({
})

/**
 *  大区选项
 */
const regionSelectOptions = [
  {
    value: 'ios_qq',
    label: '苹果QQ区',
  },
  {
    value: 'ios_wx',
    label: '苹果微信区',
  },
  {
    value: 'qq',
    label: '安卓QQ区',
  },
  {
    value: 'wx',
    label: '安卓微信区',
  },
]

/**
 *  英雄选项
 */
const heroSelectOptions = [
  {
    value: '影',
    label: '影',
  },
  {
    value: '少司缘',
    label: '少司缘',
  },
  {
    value: '元流之子(坦克)',
    label: '元流之子(坦克)',
  },
  {
    value: '元流之子(法师)',
    label: '元流之子(法师)',
  },
  {
    value: '大司命',
    label: '大司命',
  },
  {
    value: '敖隐',
    label: '敖隐',
  },
  {
    value: '海诺',
    label: '海诺',
  },
  {
    value: '朵莉亚',
    label: '朵莉亚',
  },
  {
    value: '亚连',
    label: '亚连',
  },
  {
    value: '姬小满',
    label: '姬小满',
  },
  {
    value: '莱西奥',
    label: '莱西奥',
  },
  {
    value: '赵怀真',
    label: '赵怀真',
  },
  {
    value: '海月',
    label: '海月',
  },
  {
    value: '戈娅',
    label: '戈娅',
  },
  {
    value: '桑启',
    label: '桑启',
  },
  {
    value: '暃',
    label: '暃',
  },
  {
    value: '金蝉',
    label: '金蝉',
  },
  {
    value: '云缨',
    label: '云缨',
  },
  {
    value: '艾琳',
    label: '艾琳',
  },
  {
    value: '司空震',
    label: '司空震',
  },
  {
    value: '澜',
    label: '澜',
  },
  {
    value: '夏洛特',
    label: '夏洛特',
  },
  {
    value: '阿古朵',
    label: '阿古朵',
  },
  {
    value: '蒙恬',
    label: '蒙恬',
  },
  {
    value: '镜',
    label: '镜',
  },
  {
    value: '蒙犽',
    label: '蒙犽',
  },
  {
    value: '鲁班大师',
    label: '鲁班大师',
  },
  {
    value: '西施',
    label: '西施',
  },
  {
    value: '马超',
    label: '马超',
  },
  {
    value: '曜',
    label: '曜',
  },
  {
    value: '云中君',
    label: '云中君',
  },
  {
    value: '瑶',
    label: '瑶',
  },
  {
    value: '盘古',
    label: '盘古',
  },
  {
    value: '猪八戒',
    label: '猪八戒',
  },
  {
    value: '嫦娥',
    label: '嫦娥',
  },
  {
    value: '上官婉儿',
    label: '上官婉儿',
  },
  {
    value: '李信',
    label: '李信',
  },
  {
    value: '沈梦溪',
    label: '沈梦溪',
  },
  {
    value: '伽罗',
    label: '伽罗',
  },
  {
    value: '盾山',
    label: '盾山',
  },
  {
    value: '司马懿',
    label: '司马懿',
  },
  {
    value: '孙策',
    label: '孙策',
  },
  {
    value: '元歌',
    label: '元歌',
  },
  {
    value: '米莱狄',
    label: '米莱狄',
  },
  {
    value: '狂铁',
    label: '狂铁',
  },
  {
    value: '弈星',
    label: '弈星',
  },
  {
    value: '裴擒虎',
    label: '裴擒虎',
  },
  {
    value: '杨玉环',
    label: '杨玉环',
  },
  {
    value: '公孙离',
    label: '公孙离',
  },
  {
    value: '明世隐',
    label: '明世隐',
  },
  {
    value: '女娲',
    label: '女娲',
  },
  {
    value: '梦奇',
    label: '梦奇',
  },
  {
    value: '苏烈',
    label: '苏烈',
  },
  {
    value: '百里玄策',
    label: '百里玄策',
  },
  {
    value: '百里守约',
    label: '百里守约',
  },
  {
    value: '铠',
    label: '铠',
  },
  {
    value: '鬼谷子',
    label: '鬼谷子',
  },
  {
    value: '干将莫邪',
    label: '干将莫邪',
  },
  {
    value: '东皇太一',
    label: '东皇太一',
  },
  {
    value: '大乔',
    label: '大乔',
  },
  {
    value: '黄忠',
    label: '黄忠',
  },
  {
    value: '诸葛亮',
    label: '诸葛亮',
  },
  {
    value: '哪吒',
    label: '哪吒',
  },
  {
    value: '太乙真人',
    label: '太乙真人',
  },
  {
    value: '蔡文姬',
    label: '蔡文姬',
  },
  {
    value: '雅典娜',
    label: '雅典娜',
  },
  {
    value: '杨戬',
    label: '杨戬',
  },
  {
    value: '成吉思汗',
    label: '成吉思汗',
  },
  {
    value: '钟馗',
    label: '钟馗',
  },
  {
    value: '虞姬',
    label: '虞姬',
  },
  {
    value: '李元芳',
    label: '李元芳',
  },
  {
    value: '张飞',
    label: '张飞',
  },
  {
    value: '刘备',
    label: '刘备',
  },
  {
    value: '后羿',
    label: '后羿',
  },
  {
    value: '牛魔',
    label: '牛魔',
  },
  {
    value: '孙悟空',
    label: '孙悟空',
  },
  {
    value: '亚瑟',
    label: '亚瑟',
  },
  {
    value: '橘右京',
    label: '橘右京',
  },
  {
    value: '娜可露露',
    label: '娜可露露',
  },
  {
    value: '不知火舞',
    label: '不知火舞',
  },
  {
    value: '张良',
    label: '张良',
  },
  {
    value: '花木兰',
    label: '花木兰',
  },
  {
    value: '兰陵王',
    label: '兰陵王',
  },
  {
    value: '王昭君',
    label: '王昭君',
  },
  {
    value: '韩信',
    label: '韩信',
  },
  {
    value: '刘邦',
    label: '刘邦',
  },
  {
    value: '姜子牙',
    label: '姜子牙',
  },
  {
    value: '露娜',
    label: '露娜',
  },
  {
    value: '程咬金',
    label: '程咬金',
  },
  {
    value: '安琪拉',
    label: '安琪拉',
  },
  {
    value: '貂蝉',
    label: '貂蝉',
  },
  {
    value: '关羽',
    label: '关羽',
  },
  {
    value: '老夫子',
    label: '老夫子',
  },
  {
    value: '武则天',
    label: '武则天',
  },
  {
    value: '项羽',
    label: '项羽',
  },
  {
    value: '达摩',
    label: '达摩',
  },
  {
    value: '狄仁杰',
    label: '狄仁杰',
  },
  {
    value: '马可波罗',
    label: '马可波罗',
  },
  {
    value: '李白',
    label: '李白',
  },
  {
    value: '宫本武藏',
    label: '宫本武藏',
  },
  {
    value: '典韦',
    label: '典韦',
  },
  {
    value: '曹操',
    label: '曹操',
  },
  {
    value: '甄姬',
    label: '甄姬',
  },
  {
    value: '夏侯惇',
    label: '夏侯惇',
  },
  {
    value: '周瑜',
    label: '周瑜',
  },
  {
    value: '吕布',
    label: '吕布',
  },
  {
    value: '芈月',
    label: '芈月',
  },
  {
    value: '白起',
    label: '白起',
  },
  {
    value: '扁鹊',
    label: '扁鹊',
  },
  {
    value: '孙膑',
    label: '孙膑',
  },
  {
    value: '钟无艳',
    label: '钟无艳',
  },
  {
    value: '阿轲',
    label: '阿轲',
  },
  {
    value: '高渐离',
    label: '高渐离',
  },
  {
    value: '刘禅',
    label: '刘禅',
  },
  {
    value: '庄周',
    label: '庄周',
  },
  {
    value: '鲁班七号',
    label: '鲁班七号',
  },
  {
    value: '孙尚香',
    label: '孙尚香',
  },
  {
    value: '嬴政',
    label: '嬴政',
  },
  {
    value: '妲己',
    label: '妲己',
  },
  {
    value: '墨子 ',
    label: '墨子 ',
  },
  {
    value: '赵云',
    label: '赵云',
  },
  {
    value: '小乔',
    label: '小乔',
  },
  {
    value: '廉颇',
    label: '廉颇',
  },
]

/**
 *  清空数据
 */
function clearData() {
  hokData.value = {
  }
}

async function getData() {
  try {
    if (!region.value || !hero.value) {
      // throw new Error('请输入香烟名称')
      return
    }

    clearData()

    isLoading.value = true

    const response = await BlogApi.getHok(region.value, hero.value)

    hokData.value = response
  }
  catch (error: any) {
    window.$notification?.error({
      title: '获取数据失败，请稍后重试',
      message: error.message,
    })
    clearData()
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >
      <el-select
        v-model="region"
        placeholder="请选择大区"
        size="large"
        class="!w-60"
        clearable
        @clear="clearData"
        @change="getData"
      >
        <el-option
          v-for="item in regionSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="hero"
        placeholder="请选择英雄"
        size="large"
        class="!w-60"
        clearable
        @clear="clearData"
        @change="getData"
      >
        <el-option
          v-for="item in heroSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <el-descriptions
      v-loading="isLoading"
      border
      :column="3"
      align="center"
    >

      <el-descriptions-item
        label="头像"
        align="center"
      >
        <div
          class="min-h-20"
        >
          <PreviewImg
            v-if="hokData.pic"
            :src="hokData.pic"
            :width="80"
          />
        </div>
      </el-descriptions-item>

      <el-descriptions-item
        label="英雄"
        align="center"
      >
        {{ hokData.name }}
      </el-descriptions-item>

      <el-descriptions-item
        label="称号"
        align="center"
      >
        {{ hokData.alias }}
      </el-descriptions-item>

      <el-descriptions-item
        label="省"
        align="center"
      >
        {{ hokData.province }}
      </el-descriptions-item>

      <el-descriptions-item
        label="市"
        align="center"
      >
        {{ hokData.city }}
      </el-descriptions-item>

      <el-descriptions-item
        label="区"
        align="center"
      >
        {{ hokData.area }}
      </el-descriptions-item>

      <el-descriptions-item
        label="战力值"
        align="center"
      >
        {{ hokData.provincePower }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
