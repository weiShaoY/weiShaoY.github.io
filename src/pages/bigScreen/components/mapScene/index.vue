<script setup>
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
} from 'vue'

import emitter from '../../utils/emitter'

import { World } from './map.js'

/**
 * 地图画布实例的浅层引用
 * 使用 shallowRef 避免深度响应式，提高性能
 */
const canvasMap = shallowRef(null)

/**
 * 组件挂载时监听地图加载事件
 */
onMounted(() => {
  emitter.$on('loadMap', loadMap)
})

/**
 * 组件卸载时清理资源
 */
onBeforeUnmount(() => {
  // 销毁地图实例
  canvasMap.value && canvasMap.value.destroy()

  // 移除事件监听
  emitter.$off('loadMap', loadMap)
})

/**
 * 加载地图
 * @param  assets - 地图资源对象
 */
function loadMap(assets) {
  // 创建地图世界实例
  canvasMap.value = new World(document.getElementById('canvasMap'), assets)

  // 暂停时间轴
  canvasMap.value.time.pause()
}

/**
 * 播放地图动画
 */
async function play() {
  // 恢复时间轴
  canvasMap.value.time.resume()

  // 设置播放速度正常
  canvasMap.value.animateTl.timeScale(1)

  // 开始播放动画
  canvasMap.value.animateTl.play()
}

/**
 * 暴露方法给父组件使用
 */
defineExpose({
  loadMap, // 加载地图方法
  play, // 播放动画方法
  canvasMap, // 地图实例引用
})
</script>

<template>
  <!-- 地图容器 -->
  <div
    class="map absolute bottom-0 left-0 right-0 top-0 z-1 bg-black !h-[100vh]"
  >
    <!-- 地图画布 -->
    <canvas
      id="canvasMap"
      class="!h-[100vh]"
    />
  </div>
</template>

<style lang="scss">
.large-screen {
  &-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    pointer-events: none;
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      opacity: 0.5;
      background: url('@/assets/images/bigScreen/bg.png') no-repeat;
      background-size: cover;
    }
  }
}

/* 地图容器样式 */
.map {
  /* 信息点样式 */
  .info-point {
    background: rgba(0, 0, 0, 0.5);
    color: #a3dcde;
    font-size: 14px;
    width: 170px;
    height: 106px;
    padding: 16px 12px 0;
    margin-bottom: 30px;
    will-change: transform;

    /* 信息点包装器 - 边框装饰 */
    &-wrap {
      /* 上边框装饰 */
      &:after,
      &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        width: 15px;
        height: 15px;
        border-top: 1px solid #4b87a6;
      }
      &:before {
        left: 0;
        border-left: 1px solid #4b87a6;
      }
      &:after {
        right: 0;
        border-right: 1px solid #4b87a6;
      }

      /* 内层包装器 - 下边框装饰 */
      &-inner {
        &:after,
        &:before {
          display: block;
          content: '';
          position: absolute;
          bottom: 0;
          width: 15px;
          height: 15px;
          border-bottom: 1px solid #4b87a6;
        }
        &:before {
          left: 0;
          border-left: 1px solid #4b87a6;
        }
        &:after {
          right: 0;
          border-right: 1px solid #4b87a6;
        }
      }
    }

    /* 信息点线条装饰 */
    &-line {
      position: absolute;
      top: 7px;
      right: 12px;
      display: flex;
      .line {
        width: 5px;
        height: 2px;
        margin-right: 5px;
        background: #17e5c3;
      }
    }

    /* 信息点内容 */
    &-content {
      .content-item {
        display: flex;
        height: 28px;
        line-height: 28px;
        background: rgba(35, 47, 58, 0.6);
        margin-bottom: 5px;
        .label {
          width: 80px;
          padding-left: 10px;
        }
        .value {
          color: #ffffff;
        }
      }
    }
  }
  /* 省份标签样式 */
  .provinces-label {
    /* 省份标签包装器 */
    &-wrap {
      transform: translate(50%, 200%);
      opacity: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 18px;
      width: 200px;
      height: 53px;
      border-radius: 30px 30px 30px 0px;
      background: rgba(0, 0, 0, 0.4);
    }

    /* 数字显示 */
    .number {
      color: #fff;
      font-size: 30px;
      font-weight: 700;

      /* 单位 */
      .unit {
        color: #fff;
        font-size: 12px;
        font-weight: 400;
        opacity: 0.5;
        padding-left: 5px;
      }
    }

    /* 名称显示 */
    .name {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      span {
        display: block;
      }
      /* 英文名称 */
      .en {
        color: #fff;
        font-size: 10px;
        opacity: 0.5;
        font-weight: 700;
      }
    }

    /* 编号显示 */
    .no {
      color: #7efbf6;
      text-shadow:
        0 0 5px #7efbf6,
        0 0 10px #7efbf6;
      font-size: 30px;
      font-weight: 700;
    }

    /* 黄色主题 */
    .yellow {
      .no {
        color: #fef99e !important;
        text-shadow:
          0 0 5px #fef99e,
          0 0 10px #fef99e !important;
      }
    }
  }

  /* 中国标签样式 */
  .china-label {
    color: #fff;
    font-size: 12px;
    will-change: transform;

    /* 其他标签 */
    .other-label {
      display: flex;
      align-items: center;
      padding: 5px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      will-change: transform;
    }

    /* 模糊状态 */
    &.blur {
      filter: blur(2px);
      opacity: 0.5;
    }

    /* 标签图标 */
    .label-icon {
      display: block;
      width: 20px;
      height: 20px;
      margin: 0 10px 0 0;
    }
  }

  /* 地图标签样式 */
  .map-label {
    padding: 5px;
    color: #fff;
    will-change: transform;
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 4.5px;
    /* 倒影效果 */
    -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 20%, rgba(255, 255, 255, 0.3));

    /* 其他标签 */
    .other-label {
      display: flex;
      flex-direction: column;
    }

    span {
      font-size: 46px;
      /* 副标题 */
      &:last-child {
        font-size: 12px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #a7d5ef;
      }
    }
  }

  /* 装饰标签样式 */
  .decoration-label {
    /* 装饰图标 */
    .label-icon {
      display: block;
      width: 40px;
      height: 40px;
    }
  }

  /* 其他标签通用样式 */
  .other-label {
    transform: translateY(200%);
    opacity: 0;
    background: none;
    will-change: transform;
  }
}
</style>
