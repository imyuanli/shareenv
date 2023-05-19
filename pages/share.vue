<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-3xl mx-auto space-y-4">
      <Title text="加密分享"/>
      <n-input
          v-model:value="state.envData"
          type="textarea"
          placeholder="DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
          size="large"
          :autosize="{
            minRows: 5,
            maxRows: 20
          }"
          clearable
      />
      <n-upload
          directory-dnd
          @change="handleUploadChange"
          :show-file-list="false"
          @before-upload="beforeUpload"

      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <Archive/>
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
        </n-upload-dragger>
      </n-upload>
      <div class="grid grid-cols-1  md:grid-cols-2 gap-4">
        <n-input-number
            clearable
            v-model:value="state.readNum"
            size="large"
            placeholder="读取次数"
            :min="1"
        >
          <template #suffix>
            次
          </template>
        </n-input-number>
        <n-input-group>
          <n-input-number
              :min="0"
              clearable
              v-model:value="state.ttl"
              size="large"
              placeholder="可解密期限"
          />
          <n-select
              v-model:value="state.dateType"
              :style="{ width: '30%' }"
              size="large"
              :options="options"
          />
        </n-input-group>
      </div>
      <n-button
          type="primary"
          text-color="#fff"
          size="large"
          icon-placement="right"
          class="w-full"
          @click="handleSubmit"
          :loading="state.loading"
      >
        加密并分享
      </n-button>
    </div>
  </div>
</template>

<script setup>
import Title from '../components/title'
import {Archive} from '@vicons/ionicons5'
import {useMessage} from 'naive-ui'
import {useFetch, useState} from "nuxt/app";

const message = useMessage()

const state = useState('state', () => {
  return {
    envData: '',
    readNum: 999,
    ttl: 7,
    dateType: 'd',
    loading: false
  }
})
const options = useState('options', () => [
  {label: '分', value: 'm'},
  {label: '时', value: 'h'},
  {label: '天', value: 'd'},
])

//文件上传
const handleUploadChange = async (data) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    state.value.envData = e.target.result
  };
  reader.readAsText(data.file.file);
  message.success('文件解析成功')
}

const beforeUpload = (data) => {
  if (data.file.file?.size > 1024 * 16) {
    message.error('文件大小必须小于16kb')
    return false;
  }
}

const handleSubmit = async () => {
  state.value.loading = true
  const {data, pending, error} = await useFetch(`https://api.github.com/orgs/nuxt/repos`)
  state.value.loading = pending
}

</script>

<style scoped>

</style>