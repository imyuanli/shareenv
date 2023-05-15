<template>
  <a :href="href" class="underline hover:text-white">{{text}}</a>
</template>

<script setup>
defineProps({
  href: String,
  text: String
})
</script>

<style scoped>

</style>