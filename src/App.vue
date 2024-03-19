<template>
  <div class="min-h-screen flex flex-col justify-between">
    <div class="mx-auto container">
      <TheHeader />

      <div class="h-full">
        <RouterView />
      </div>
    </div>

    <TheFooter />
  </div>

  <!-- lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] xl:max-w-[1280px] -->
</template>
