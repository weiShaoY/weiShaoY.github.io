<template>
  <main
    class="m-x-auto h-full flex flex-wrap content-between lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] xl:max-w-[1280px]"
  >
    <TheHeader />

    <div class="h-[calc(100%-140px)] w-full">
      <RouterView />
    </div>

    <TheFooter />
  </main>
</template>
