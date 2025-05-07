<script lang="ts" setup>

type GithubPropsType = {

  /**
   *  颜色
   */
  color?: string

  /**
   *  大小
   */
  size?: number

}

withDefaults(defineProps<GithubPropsType>(), {
  color: 'white',
  size: 34,
})

const githubUrl = import.meta.env.VITE_GITHUB_URL

</script>

<template>
  <LinkButton
    icon="github"
    :size="34"
    :color="color"
    :url="githubUrl"
  />
</template>
