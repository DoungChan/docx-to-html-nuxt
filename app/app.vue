<template>
  <div v-if="!pending">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
  <div v-else class="m-auto bg-gray-50">
    <p class="text-gray-500 text-lg">Loading...</p>
  </div>
</template>
<script setup>
const { pending } = useAsyncData('app-init', () => new Promise(resolve => setTimeout(resolve, 100)));
</script>