<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-3xl mx-auto space-y-4">
      <Title :text="state.sid?'分享此链接':'加密文档'"/>
      <div v-show="!state.sid" class="space-y-4">
        <n-input
            v-model:value="state.content"
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <n-input-number
              clearable
              v-model:value="state.readNum"
              size="large"
              placeholder="读取次数"
              :min="-1"
          >
            <template #suffix>
              次
            </template>
          </n-input-number>
          <n-input-group>
            <n-input-number
                :min="-1"
                clearable
                v-model:value="state.ttl"
                size="large"
                placeholder="可解密期限"
                :style="{ width: '70%' }"
            />
            <n-select
                v-model:value="state.dateType"
                :style="{ width: '30%' }"
                size="large"
                :options="options"
            />
          </n-input-group>
          <n-input
              v-model:value="state.password"
              placeholder="输入密码"
              :maxlength="4"
              clearable
          />
        </div>
        <n-button
            type="primary"
            text-color="#fff"
            size="large"
            icon-placement="right"
            class="w-full"
            @click="handleSubmit"
            :loading="state.loading"
            :disabled="!state.content"
        >
          加密并分享
        </n-button>
        <n-alert :show-icon="false">
          <p>读取次数：该项决定了您的文档可访问次数。-1 表示无限制。</p>
          <p>解密期限：您可以给你的ENV文档添加最后期限，以便在一定时间后自动删除它。-1 表示无限制。</p>
          <p>您的文件我们不会做任何处理，也不会随意的对外暴露。</p>
        </n-alert>
      </div>
      <div v-show="state.sid" class="grid grid-cols-1 gap-4">
        <n-alert :show-icon="false" class="w-full">
          {{ state.sid }}
        </n-alert>
        <n-button
            type="primary"
            text-color="#fff"
            size="large"
            icon-placement="right"
            class="copy-btn cols"
            @click="handleCopy"
        >
          复制
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from '../components/title'
import {Archive} from '@vicons/ionicons5'
import {useMessage} from 'naive-ui'
import {useFetch, useState} from "nuxt/app";
import BASE_URL from "../utils/base_url";
import Clipboard from 'clipboard'

const message = useMessage()
const state = useState('state', () => {
  return {
    content: null,
    readNum: null,
    ttl: null,
    dateType: 'm',
    password: null,
    loading: false,
    sid: null
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
    state.value.content = e.target.result
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
  const {data, pending} = await useFetch(`${BASE_URL}/create_encryption_env/`, {
    method: 'POST',
    body: {
      content: state.value.content,
      read_num: state.value.readNum,
      ttl: state.value.ttl,
      dateType: state.value.dateType,
      password: state.value.password,
    }
  })
  if (data.value?.errno == 0) {
    state.value.sid = window.location.origin + '/unseal/' + data.value.data.sid
  } else {
    message.error(data.value?.errmsg)
  }
  state.value.loading = pending
}

const handleCopy = () => {
  const clipboard = new Clipboard('.copy-btn', {
    text: () => state.value.sid
  });
  clipboard.on('success', () => {
    message.success('数据已复制到剪贴板');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    message.error('复制失败，请手动复制');
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
</script>

<style scoped>

</style>