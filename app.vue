<script setup lang="ts">
const isChatting = useIsChatting();

</script>

<template>
  <div
      class="bg-repeat bg-cover w-full h-full font-sans"
      style="background-image: url(/bg.png)"
  >
    <div class="flex items-center justify-center h-full">
      <div
          class="max-w-[800px] relative z-20 shadow-lg after:content-[' '] after:z-[-1] after:h-full after:bg-slate-100 after:border after:border-slate-200 after:absolute after:left-2.5 after:right-2.5 after:top-0 after:mt-2 after:rounded"
      >
        <div class="bg-white border border-slate-200 p-6 rounded">
          <!-- Start Screen -->
          <Start v-if="!isChatting" />

          <!-- Chat Screen -->
          <Chat v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>