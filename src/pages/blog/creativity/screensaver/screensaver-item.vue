<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  /**
   *  total: 总数
   */
  total: {
    type: Number,
    default: 9,
  },

  /**
   *  current: 当前
   */
  current: {
    type: Number,
    default: -1,
  },
})

const before = ref(props.total === props.current ? -1 : props.total)

const isPlay = ref(false)

// 监控 current 的变化
watch(() => props.current, (current, preCurrent) => {
  if (current !== preCurrent) {
    before.value = preCurrent
    isPlay.value = true // 触发播放动画
  }
})
</script>

<template>
  <div
    :class="{ play: isPlay }"
  >
    <ul
      class="flip"
    >
      <li
        v-for="(item, key) in total + 1"
        :key="item"
        class="item"
        :class="{ active: current === key, before: key === before }"
      >
        <div
          class="up"
        >
          <div
            class="shadow"
          />

          <div
            class="inn"
            :style="{ color: 'white' }"
          >
            {{ key }}
          </div>
        </div>

        <div
          class="down"
        >
          <div
            class="shadow"
          />

          <div
            class="inn"
            :style="{ color: 'white' }"
          >
            {{ key }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@width: 200px;
@height: 260px;
@fontSize: 120px;
@lineWidth: 3px;
@radius: 6px;

.flip {
  position: relative;
  margin: 5px;
  width: @width;
  height: @height;
  font-size: @fontSize;
  font-weight: bold;
  line-height: @height - @lineWidth;
  border-radius: @radius;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
}

.item {
  list-style: none;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  transition: opacity 0.3s;

  &.active {
    z-index: 2;
  }

  &:first-child {
    z-index: 2;
  }

  .up,
  .down {
    z-index: 1;
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
    overflow: hidden;
  }

  .up {
    transform-origin: 50% 100%;
    top: 0;

    &:after {
      content: '';
      position: absolute;
      top: (@height / 2 - @lineWidth);
      left: 0;
      z-index: 5;
      width: 100%;
      height: @lineWidth;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .down {
    transform-origin: 50% 0;
    bottom: 0;
  }

  .inn {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 200%;
    text-align: center;
    background-color: #333;
    border-radius: @radius;
  }

  .up .inn {
    top: 0;
  }

  .down .inn {
    bottom: 0;
  }
}

.play {
  .item {
    &.before {
      z-index: 3;
    }

    &.active {
      animation: asd 0.5s 0.5s linear both;
      z-index: 2;
    }

    &.before .up {
      animation: turn-up 0.5s linear both;
    }

    &.active .down {
      animation: turn-down 0.5s 0.5s linear both;
    }
  }
}

@keyframes turn-down {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes turn-up {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

@keyframes asd {
  0% {
    z-index: 2;
  }
  5% {
    z-index: 4;
  }
  100% {
    z-index: 4;
  }
}

.play {
  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .before .up .shadow {
    background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
    animation: show 0.5s linear both;
  }

  .active .up .shadow {
    background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
    animation: hide 0.5s 0.3s linear both;
  }

  .before .down .shadow {
    background: linear-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
    animation: show 0.5s linear both;
  }

  .active .down .shadow {
    background: linear-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
    animation: hide 0.5s 0.3s linear both;
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
