<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-2xl mx-auto space-y-4">
      <Title text="解密文档"/>
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
            @click="handleFetch"
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
            type="password"
            show-password-on="click"
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
            @click="handleSubmitPw"
        >
          验证密码
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from '../../components/title'
import {useAsyncData, useFetch, useRouter, useState} from "nuxt/app";
import BASE_URL from "../../utils/base_url";
import {useMessage} from "naive-ui";

const message = useMessage()
const state = useState('state', () => {
  return {
    sid: null,
    needPw: 0,
    password: null,
    loading: false,
    content: null,
  }
})
const handleFetch = async () => {
  state.value.loading = true
  const {data, pending} = await useFetch(`${BASE_URL}/get_current_encryption_env/`, {
    method: 'POST',
    body: {sid: state.value.sid,}
  })
  if (data.value?.errno == 0) {
    let res = data.value.data
    if (res.needPw) {
      state.value.needPw = res.needPw
      message.info('请输入密码')
    } else {
      state.value.content = res.content
      message.success('解析成功')
    }
  } else {
    message.error(data.value?.errmsg)
  }
  state.value.loading = pending
}
const handleSubmitPw = async () => {
  if(state.value.password.length !== 4){
    message.error('密码不正确')
  }
  else{
    state.value.loading = true
    const {data,error} = await useFetch(`${BASE_URL}/decrypt_env/`, {
      method: 'POST',
      body: {
        sid: state.value.sid,
        password: state.value.password
      }
    })
    if(error){
      message.error('服务器不稳定，请稍后访问')
      state.value.loading = false
      return
    }
    if (data.value?.errno == 0) {
      let res = data.value.data
      state.value.content = res.content
      message.success('文件解析成功')
    } else {
      console.log(data)
      message.error(data.value?.errmsg)
    }
    state.value.loading = false
  }
}
</script>