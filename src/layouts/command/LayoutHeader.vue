<script setup lang="ts">

import headerBgImage from './images/title_bg.png'

import buttonBgImage from './title_btn.png'

import buttonActiveBgImage from './title_btn_active.png'

const router = useRouter()

const route = useRoute()

const titleInfo = ref({
  leftTitle: [
    {
      id: 1,
      name: '身 份 查 询',
      url: 'home',
      isUpDown: false,
      children: [],
    },
    {
      id: 2,
      name: '监 控 系 统',
      url: 'evaluste',
      isUpDown: false,
      children: [],
    },
    {
      id: 3,
      name: '档 案 系 统',
      url: 'spaceControl',
      isUpDown: false,
      children: [],
    },
  ],

  rightTitle: [
    {
      id: 3,
      name: '统 计 分 析',
      url: 'analyze', // analyze
      isUpDown: true,
      children: [
        {
          id: 3.1,
          name: '园区分析',
          url: 'garden',
        },
        {
          id: 3.2,
          name: '企业分析',
          url: 'company',
        },
        {
          id: 3.3,
          name: '产业分析',
          url: 'industry',
        },
      ],
    },
    {
      id: 4,
      name: '空 间 管 控',
      url: 'spaceControl',
      isUpDown: false,
      children: [],
    },
  ],
})

const isShowLight = ref('home')

watch(() => route.name, () => {
  isShowLight.value = route.name as string
}, {
  deep: true,
  immediate: true,
})

function jumpPage(item: any) {
  isShowLight.value = item.url
  router.push({
    name: item.url,
  })
}
</script>

<template>
  <div
    class="wrap relative h-20 flex items-center bg-cover bg-center bg-no-repeat"
    :style="{
      backgroundImage: `url(${headerBgImage})`,
    }"
  >

    <div
      class="mb-2 w-1/4 flex items-center gap-3 text-[18px] color-white"
    >
      <div
        v-for="(item, index) in titleInfo.leftTitle"
        :id="isShowLight === item.url ? 'menu-click' : ''"
        :key="index"
        class="relative h-10 w-1/3 flex items-center justify-center bg-[length:100%_100%] text-4 leading-10 hover:cursor-pointer"
        :style="{
          backgroundImage: `url(${isShowLight === item.url ? buttonActiveBgImage : buttonBgImage})`,
        }"
        @click="jumpPage(item)"
      >
        <span
          class="from-[#00c8ff] to-[#ffffff] bg-gradient-to-b bg-clip-text text-transparent"
        >
          {{ item.name }}
        </span>
      </div>
    </div>

    <!-- 中间部分 -->
    <div
      class="header-midden relative h-full flex flex-1 items-center justify-center gap-3 overflow-x-hidden color-white"
    >
      <SvgIcon
        icon="command-policeBadge"
        :size="50"
      />

      <div
        class="flex-col items-start"
      >
        <div
          class="flex justify-between text-6 font-bold"
        >
          青安市公安局信息系统
        </div>

        <div
          class="w-full flex items-center justify-between p-l-1 text-4"
        >
          <span>网</span>

          <span>上</span>

          <span>协</span>

          <span>同</span>

          <span>办</span>

          <span>公</span>

          <span>平</span>

          <span>台</span>
        </div>
      </div>
    </div>

    <div
      class="mb-2 w-1/4 flex items-center gap-3 text-[18px] color-white"
    >
      <div
        v-for="(item, index) in titleInfo.leftTitle"
        :id="isShowLight === item.url ? 'menu-click' : ''"
        :key="index"
        class="relative h-10 w-1/3 flex items-center justify-center bg-[length:100%_100%] text-4 leading-10 hover:cursor-pointer"
        :style="{
          backgroundImage: `url(${isShowLight === item.url ? buttonActiveBgImage : buttonBgImage})`,
        }"
        @click="jumpPage(item)"
      >
        <span
          class="from-[#00c8ff] to-[#ffffff] bg-gradient-to-b bg-clip-text text-transparent"
        >
          {{ item.name }}
        </span>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  .left_menu {
  padding: 0 20px;
  margin-left: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // font-family: "PangMenZhengDao";
  // font-style: italic;
}

.menu_btn {
  // background: rgba(1, 221, 221, 0.5);
  // border: 1px solid rgba(0, 174, 255);
  // text-shadow: 0 0 10px rgb(0, 198, 224), 0 0 10px rgb(0, 155, 198),
  //   0 0 30px rgb(14, 139, 174), 0 0 40px rgb(0, 129, 164);
  width: 24%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0 15px;
  background: url(./title_btn.png) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  font-size: 15px;

  span {
    color: transparent;
    padding: 0 5px;
    background-image: -webkit-linear-gradient(top, #00c8ff, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    cursor: pointer;
  }
}
.upDown_list {
  width: 100%;
  position: absolute;
  top: 110%;
  left: 0;
  font-family: Microsoft YaHei;
  //   font-weight: bold;
  font-style: normal;
  font-size: 16px;
  // background: rgba(0, 185, 214, 0.6);
  // border: 1px double #00c8ff;
  background: linear-gradient(to bottom, rgba(3, 71, 107, 0.5), rgba(19, 39, 50, 0.2));
  box-shadow: inset 0 0 25px rgba(0, 119, 255, 0.8);
  border: 1px solid rgba(54, 141, 255, 0.8);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.1s linear;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;

    &:hover {
      background: rgba(0, 213, 255, 0.8);
    }
  }
}
#menu-click {
  padding: 1px 15px;
  background: url(../assets/img/title_btn_active.png) no-repeat center center;
  background-size: 100% 100%;

  span {
    background-image: -webkit-linear-gradient(top, #00ffde, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
////////////////////////
///
///
@mixin font-color() {
  background: linear-gradient(0deg, #b9cfff 0%, #fff 99%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes text-roll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes light-go {
  from {
    left: 500px;
  }
  to {
    left: 1100px;
    opacity: 0;
  }
}

.wrap {
  &::after {
    position: absolute;
    bottom: -55px;
    left: 500px;
    width: 100%;
    width: 500px;
    height: 100px;
    content: '';
    background-image: url(./images/light_bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    animation: light-go 3s ease-in-out infinite forwards;
  }
}

.layout-header {
  position: relative;
  display: flex;
  align-items: center;
  // justify-content: center;
  height: 80px;
  background-image: url(./images/title_bg.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  &::after {
    position: absolute;
    bottom: -55px;
    left: 500px;
    width: 100%;
    width: 500px;
    height: 100px;
    content: '';
    background-image: url(./images/light_bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    animation: light-go 3s ease-in-out infinite forwards;
  }
  .header-midden {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow-x: hidden;
    font-family: DouyuFont;
    color: #fff;
    .cn {
      font-size: 30px;
      @include font-color;
    }
    .en {
      position: relative;
      font-size: 10px;
      @include font-color;
    }
  }
  .header-left {
    flex: 1;
    // position: absolute;
    // top: 20px;
    // left: 30px;
    display: flex;
    grid-gap: 6px;
    align-items: center;
    font-size: 18px;
    color: #fff;
  }
  .header-right {
    // position: absolute;
    flex: 1;

    top: 20px;
    right: 30px;
    display: flex;
    grid-gap: 20px;
    font-size: 16px;
    color: #fff;
    span {
      position: relative;
      display: flex;
      align-items: center;
      text-shadow: 0 3px 2px #84a8f663;
      @include font-color;
      &:not(:last-child)::after {
        position: absolute;
        right: -10px;
        width: 2px;
        height: 10px;
        content: '';
        background-color: #fff;
        opacity: 0.2;
      }
    }
  }
}
</style>
