<template>
  <h1 class="py-4 text-4xl md:text-5xl font-bold text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/60 to-white">
    {{ text }}
  </h1>

</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped>

</style>