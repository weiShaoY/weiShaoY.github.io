<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const isUserAdmin = ref(false)

const adminMenuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/admin/dashboard',
  },
  {
    title: 'Posts',
    icon: 'mdi-file-document',
    to: '/admin/posts',
  },
  {
    title: 'Tags',
    icon: 'mdi-tag',
    to: '/admin/tags',
  },
  {
    title: 'Users',
    icon: 'mdi-account-group',
    to: '/admin/users',
  },
]

const userMenuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    to: '/dashboard',
  },
  {
    title: 'Posts',
    icon: 'mdi-file-document',
    to: '/posts',
  },
  {
    title: 'Tags',
    icon: 'mdi-tag',
    to: '/tags',
  },
]

const menuItems = isUserAdmin.value ? adminMenuItems : userMenuItems

console.log('%c Line:19 🥤 menuItems', 'color:#fca650', menuItems)
</script>

<template>
  <div
    class=""
  >
    12
  </div>
</template>

<style lang="less" scoped>

</style>
