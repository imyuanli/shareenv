<template>
  <div class="container px-8 mx-auto mt-12">
    <div class="max-w-2xl mx-auto space-y-8">
      <Title text="加密并分享"/>
      <n-input
          type="textarea"
          placeholder="DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
      />
      <div class="flex space-x-4">
        <div>
          <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{'naive-info': 'hello!'}"
              :data="{'naive-data': 'cool! naive!'}"
          >
            <n-button size="large" class="w-full">上传文件</n-button>
          </n-upload>
        </div>
        <n-input size="large" class="w-full" placeholder="读取次数"/>
        <n-select size="large" />
      </div>
      <n-button
          type="primary"
          text-color="#fff"
          size="large"
          icon-placement="right"
          class="w-full"
      >
        加密并分享
      </n-button>
    </div>
  </div>
</template>

<script setup>
import Title from '../components/title'

</script>

<style scoped>

</style>