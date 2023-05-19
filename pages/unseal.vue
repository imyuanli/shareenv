<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-2xl mx-auto space-y-4">
      <Title text="解密文档"/>
      <n-input type="text" size="large" placeholder="请输入加密的key"/>
      <n-button
          type="primary"
          text-color="#fff"
          size="large"
          icon-placement="right"
          class="w-full"
      >
        解密
      </n-button>
    </div>
  </div>
</template>

<script setup>
import Title from '../components/title'

</script>

<style scoped>

</style>