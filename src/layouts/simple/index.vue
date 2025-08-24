<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import Header from './components/header/index.vue'
</script>

<template>
  <div
    class="h-screen w-full flex flex-col"
  >
    <Header />

    <Suspense>
      <template
        #default
      >
        <router-view
          v-slot="{ Component }"
        >
          <Transition
            name="slide-left"
            mode="out-in"
            appear
          >
            <component
              :is="Component"
            />
          </Transition>
        </router-view>
      </template>

      <template
        #fallback
      >
        <IconLoading />
      </template>
    </Suspense>
  </div>
</template>
