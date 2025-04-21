<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const searchValue = ref(
  'https://www.iqiyi.com/v_23mibr8l4ms.html?bstp=3&e=8f437bd39e38f1542c1488eff8a129e9&stype=2&themeid=5542665195552802&bkt=bkt_03&rseat=area_5&r_area=pcw_theme&ht=2&posterid=10493540998440608&c1=1&r_source=55&vfrmrst=area_5&vfrmblk=bt_pcarecommendtheme_7&r=7665998196042200&isVipOnly=1&fatherid=5542665195552802&rank=5&block=bt_pcarecommendtheme_7&rpage=pcw_home&position=5&vfrm=pcw_home',
)

const websiteSelectOptions = [
  // {
  //   label: '777-解析',
  //   value: 'https://jx.777jiexi.com/player/?url=',
  // },
  {
    label: '8090g-解析',
    value: 'https://www.8090g.cn/jiexi/?url=',
  },

  // {
  //   label: 'ik9-解析',
  //   value: 'https://yparse.ik9.cc/index.php?url=',
  // },
  // {
  //   label: '杰森-解析',
  //   value: 'https://jx.jsonplayer.com/player/?url=',
  // },
  // {
  //   label: '阳途-解析',
  //   value: 'https://jx.yangtu.top/?url=',
  // },
  {
    label: '冰豆-解析',
    value: 'https://bd.jx.cn/?url=',
  },
  {
    label: 'm3u8TV-解析',
    value: 'https://jx.m3u8.tv/jiexi/?url=',
  },
  {
    label: '听乐-解析',
    value: 'https://jx.dj6u.com/?url=',
  },
  {
    label: '虾米-解析',
    value: 'https://jx.xmflv.com/?url=',
  },
  {
    label: '虾米2-解析',
    value: 'https://jx.xmflv.cc/?url=',
  },

  // {
  //   label: '云析-解析',
  //   value: 'https://jx.yparse.com/index.php?url=',
  // },
  // {
  //   label: '红狐-解析',
  //   value: 'https://player.mrgaocloud.com/player/?url=',
  // },
]

function handleClick(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >
      <a-input
        v-model="searchValue"
        class="w-[60%]"
        allow-clear
        placeholder="请输入影视链接"
      />
    </div>

    <div
      class="grid grid-cols-4 gap-10"
    >
      <a-button
        v-for="(item, index) in websiteSelectOptions"
        :key="index"
        :disabled="!searchValue"
        @click="handleClick(item.value + searchValue)"
      >
        {{ item.label }}
      </a-button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
