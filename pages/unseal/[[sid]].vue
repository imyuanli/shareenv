<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-2xl mx-auto space-y-4">
      <Title text="解密文档"/>
      <div v-if="!state.content">
        <div class="space-y-4" v-if="!state.needPw">
          <n-input
              clearable
              v-model:value="state.sid"
              size="large"
              placeholder="请输入加密的key"
          />
          <n-button
              :loading="state.loading"
              type="primary"
              text-color="#fff"
              size="large"
              icon-placement="right"
              class="w-full"
              @click="handleDecryptFile"
          >
            解密
          </n-button>
        </div>
        <div class="space-y-4" v-if="state.needPw">
          <n-alert type="info">
            <p>该文件需要您输入密码才可访问</p>
          </n-alert>
          <n-input
              v-model:value="state.password"
              placeholder="输入文件密码"
              :maxlength="4"
              clearable
          />
          <n-button
              :loading="state.loading"
              type="primary"
              text-color="#fff"
              size="large"
              icon-placement="right"
              class="w-full"
              @click="handleVerifyPw"
          >
            验证密码
          </n-button>
        </div>
      </div>
      <div v-if="state.content" class="space-y-4">
        <p class="text-zinc-500 text-center">
          该文件可以被阅读 <span class="text-white">{{ state.read_num == -1 ? '无数' : state.read_num }}</span> 次。
        </p>
        <n-alert :show-icon="false" class="w-full whitespace-pre-wrap">
          {{ state.content }}
        </n-alert>
        <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          <n-button
              type="primary"
              text-color="#fff"
          >
            <template #icon>
              <n-icon>
                <RefreshOutline/>
              </n-icon>
            </template>
            <NuxtLink :to="'/unseal/'+state.sid" external class="inline-block w-full max-w-md">
              重新解密
            </NuxtLink>
          </n-button>
          <n-button
              type="primary"
              text-color="#fff"
              class=".copy-link"
              @click="handleCopyLink"
          >
            <template #icon>
              <n-icon>
                <ShareSocialOutline/>
              </n-icon>
            </template>
            分享给其他人
          </n-button>
          <n-button
              type="primary"
              text-color="#fff"
              @click="handleDownloadFile"
          >
            <template #icon>
              <n-icon>
                <DownloadOutline/>
              </n-icon>
            </template>
            下载
          </n-button>
          <n-button
              type="primary"
              text-color="#fff"
              class=".copy-data"
              @click="handleCopyData"
          >
            <template #icon>
              <n-icon>
                <Copy/>
              </n-icon>
            </template>
            复制
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from '../../components/title'
import {useFetch, useRoute, useState} from "nuxt/app";
import {Copy, DownloadOutline, RefreshOutline, ShareSocialOutline} from '@vicons/ionicons5'
import BASE_URL from "../../utils/base_url";
import {useMessage} from "naive-ui";
import Clipboard from "clipboard";

const router = useRoute()
const message = useMessage()
const state = useState('state', () => {
  return {
    sid: router.params.sid ? router.params.sid : null,
    needPw: 0,
    password: null,
    loading: false,
    content: null,
    read_num: 0,
  }
})


//验证文件
const handleDecryptFile = async () => {
  state.value.loading = true
  const {data, pending, error} = await useFetch(`${BASE_URL}/get_current_encryption_env/`, {
    method: 'POST',
    body: {sid: state.value.sid,}
  })
  if (error.value) {
    message.error('服务器异常请稍后重试')
    state.value.loading = pending
    return
  }
  if (data.value?.errno == 0) {
    let res = data.value.data
    if (res.needPw) {
      state.value.needPw = res.needPw
      message.info('请输入密码')
    } else {
      state.value.content = res.content
      state.value.read_num = res.read_num
      message.success('解析成功')
    }
  } else {
    message.error(data.value?.errmsg)
  }
  state.value.loading = pending
}

//输入密码验证
const handleVerifyPw = async () => {
  if (state.value.password.length !== 4) {
    message.error('密码不正确')
  } else {
    state.value.loading = true
    const {data, error} = await useFetch(`${BASE_URL}/decrypt_env/`, {
      method: 'POST',
      body: {
        sid: state.value.sid,
        password: state.value.password
      }
    })
    if (error.value) {
      message.error('服务器异常请稍后重试')
      return
    }
    if (data.value?.errno == 0) {
      let res = data.value.data
      state.value.content = res.content
      state.value.read_num = res.read_num
      message.success('文件解析成功')
    } else {
      message.error(data.value?.errmsg)
    }
    state.value.loading = false
  }
}

//复制
const handleCopy = (className, text) => {
  const clipboard = new Clipboard(className, {
    text: () => text
  });
  clipboard.on('success', () => {
    message.success('已复制到剪贴板');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    message.error('复制失败，请手动复制');
    clipboard.destroy();
  });
  clipboard.onClick(event);
}

//复制链接
const handleCopyLink = () => {
  handleCopy('.copy-link', window.location.href)
}

//下载
const handleDownloadFile = () => {
  const dataStr = `data:application/md;charset=utf-8,` + encodeURIComponent(state.value.content);
  const download = document.createElement('a');
  download.setAttribute('href', dataStr);
  download.setAttribute('download', '.env');
  document.body.appendChild(download);
  download.click();
  download.remove();
  message.success('下载成功')
}

const handleCopyData = () => {
  handleCopy('.copy-data', state.value.content)
}
</script>