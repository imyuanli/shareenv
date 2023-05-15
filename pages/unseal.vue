<template>
  <div class="container px-8 mx-auto mt-12">
    <div class="max-w-2xl mx-auto space-y-8">
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