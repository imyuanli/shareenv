<template>
  <div class="container mx-auto px-4 md:px-8 mt-0 md:mt-12">
    <div class="max-w-2xl mx-auto space-y-4">
      <Title text="加密并分享"/>
      <n-input
          type="textarea"
          placeholder="DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres"
      />
      <n-upload
          directory-dnd
          @change="handleUploadChange"
          :show-file-list="false"
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
        <n-input size="large" placeholder="读取次数">
          <template #suffix>
            次
          </template>
        </n-input>
        <n-input-group>
          <n-input size="large" placeholder="可解密期限"/>
          <n-select
              default-value="m"
              v-model:value="ttl"
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
      >
        加密并分享
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Title from '../components/title'
import {Archive} from '@vicons/ionicons5'
import {NSelect} from  'naive-ui'

import {useState} from "nuxt/app";

const ttl = useState('ttl', () => 'm')
const options = useState('ttl', () => [
  {label:'分',value:'m'},
  {label:'时',value:'h'},
  {label:'天',value:'d'},
])
//文件上传
const handleUploadChange = async (data) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const t = e.target.result
    console.log(t)
  };
  reader.readAsText(data.file.file);
}
</script>

<style scoped>

</style>