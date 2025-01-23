<script setup lang="ts">
import BasicTitleBg from '../images/basic/box/basic-title-bg.png'

import BasicTitleBgLarge from '../images/basic/box/basic-title-bg-large.png'

defineProps({
  /**
   *  标题
   */
  title: {
    type: String,
    default: 'Default',
  },

  /**
   *  内容
   */
  content: {
    type: String,
    default: '',
  },

  /**
   *  尺寸
   */
  size: {
    type: String,
    default: 'small',
  },

  /**
   *  标题背景图片
   */
  titleBgImg: {
    type: String,
    default: BasicTitleBg,
  },

  /**
   *  标题背景图片
   */
  titleLargeBgImg: {
    type: String,
    default: BasicTitleBgLarge,
  },

  /**
   *  内容背景图片
   */
  contentBgImg: {
    type: String,
    default: '',
  },

  /**
   *  标题背景颜色
   */
  titleBgColor: {
    type: String,
    default: '',
  },

  /**
   *  内容背景颜色
   */
  contentBgColor: {
    type: String,
    default: '',
  },

  /**
   *  标题字体颜色
   */
  titleColor: {
    type: String,
    default: '',
  },

  /**
   *  内容字体颜色
   */
  contentColor: {
    type: String,
    default: '',
  },

  /**
   *  标题字体大小
   */
  titleSize: {
    type: String,
    default: '',
  },

  /**
   *  内容字体大小
   */
  contentSize: {
    type: String,
    default: '',
  },

  /**
   *  标题高度
   */
  titleHeight: {
    type: String,
    default: '',
  },

  /**
   *  高度
   */
  height: {
    type: String,
    default: '255px',
  },

  /**
   *  宽度
   */
  width: {
    type: String,
    default: '52px',
  },
})
</script>

<template>
  <div
    class="basic-box"
  >
    <div
      class="box-title"
      :style="{
        background: `url(${titleBgImg || size === 'small' ? titleBgImg : titleLargeBgImg}) no-repeat`,
        backgroundSize: '100% 100%',
      }"
    >
      <div
        class="title"
      >
        {{ title }}
      </div>

      <div
        class="sub-title"
      >
        <slot
          name="subTitle"
        />
      </div>
    </div>

    <div
      class="box-content"
      :style="{
        height: `${height}`,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="less">
  @import '../common.less';

.basic-box {
  width: 100%;
  height: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .box-title {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      background: linear-gradient(to top, #ffffff, #caf9ff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
      padding: 20px;
      flex: 1;
    }
  }
  .box-content {
    color: #fff;
    padding: 10px 20px;
  }
  .sub-title {
    flex: 1;
    padding: 20px;
    margin-bottom: 18px;
  }
}
</style>
