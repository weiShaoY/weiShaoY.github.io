<script setup lang="ts">
import type { Placement } from "element-plus";

import type { CSSProperties } from "vue";

import { downloadAudio, downloadImage, downloadVideo } from "@/utils";

import { twMerge } from "tailwind-merge";

defineOptions({
  name: "DownloadButton",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  type: "image",
  class: "",
  icon: "blog-download",
  size: 40,
  tooltipContent: "",
  tooltipPlacement: "bottom",
});

defineEmits(["click"]);

type Props = {
  /**
   * 下载地址
   */
  url: string;

  /**
   * 文件类型
   */
  type?: "image" | "video" | "audio";

  /** 按钮的 class 类名 */
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>;

  /** 图标名称 */
  icon?: string;

  /** 图标大小 */
  size?: number;

  /**
   *  图标 class
   */
  iconClass?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>;

  /** 提示框内容 */
  tooltipContent?: string;

  /** 提示框位置 */
  tooltipPlacement?: Placement;

  /** 层级 z-index 值 */
  zIndex?: number;

  /** 行内样式 */
  style?: CSSProperties;

  /**
   *  是否隐藏 tooltip
   */
  hideTooltip?: boolean;
};

const DEFAULT_CLASS = "flex items-center justify-center";

/**
 * 计算合并后按钮的类名
 * 现在支持字符串、对象和数组形式的class
 */
const computedButtonClass = computed(() => {
  // 处理对象或数组形式的class
  if (typeof props.class !== "string") {
    return twMerge(DEFAULT_CLASS);
  }

  return twMerge(DEFAULT_CLASS, props.class);
});

/**
 *  处理动态class对象
 */
const dynamicButtonClass = computed(() => {
  if (typeof props.class === "object") {
    return props.class;
  }

  return {};
});

/**
 *  计算最终的样式
 */
const computedStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  ...props.style,
}));

/**
 *  计算图标的类名
 */
const computedIconClass = computed(() => {
  if (typeof props.iconClass === "string") {
    return props.iconClass;
  }

  return props.iconClass;
});

/**
 *  下载 loading
 */
const downloading = ref(false);

async function handleDownload() {
  // 如果正在下载中，直接返回
  if (downloading.value) {
    return;
  }

  downloading.value = true;

  try {
    // 验证必要的参数
    if (!props.url) {
      throw new Error("下载URL不能为空");
    }

    if (!props.type) {
      throw new Error("文件类型不能为空");
    }

    // 使用映射对象代替switch/if-else链
    const downloadHandlers = {
      image: downloadImage,
      video: downloadVideo,
      audio: downloadAudio,
    };

    // 检查类型是否有效
    if (!(props.type in downloadHandlers)) {
      throw new Error(`不支持的文件类型: ${props.type}`);
    }

    // 执行下载
    await downloadHandlers[props.type as keyof typeof downloadHandlers](
      props.url,
    ).then(() => {
      console.log("%c Line:161 🌭 props.url", "color:#ed9ec7", props.url);

      window.$notify?.success({
      title:`${props.type === 'image' ? '图片' : props.type === 'video' ? '视频' : '音频'}下载成功`,
      duration: 3000,
    })
    })
  } catch (error) {
    console.error("下载失败:", error);

    // 显示更友好的错误提示
    const errorMessage =
      error instanceof Error ? error.message : "下载过程中发生未知错误";

    // window.$notify?.({
    //   title: "下载失败",
    //   message: errorMessage,
    //   duration: 3000,
    // });
    window.$notify?.error({
      title: "下载失败",
      content: errorMessage,
      duration: 3000,
    })

    // 可以在这里添加错误上报逻辑
    // trackError(error);
  } finally {
    downloading.value = false;
  }
}
</script>

<template>
  <div class="">
    <t-tooltip
      :placement="tooltipPlacement"
      :content="
        tooltipContent ||
        `下载${type === 'image' ? '图片' : type === 'video' ? '视频' : '音频'}`
      "
      show-arrow
    >
      <t-button
        shape="square"
        variant="text"
        :class="[computedButtonClass, dynamicButtonClass]"
        :style="computedStyle"
        @click="handleDownload"
      >
        <template v-if="!downloading">
          <slot>
            <SvgIcon
              :icon="icon"
              :size="size - 14"
              :class="computedIconClass"
            />
          </slot>
        </template>

        <template v-else>
          <Loading :size="size - 14" />
        </template>
      </t-button>
    </t-tooltip>
  </div>
</template>

<style scoped></style>
