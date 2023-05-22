<template>
  <div class="h-full flex flex-col items-center justify-around">
    <div class="flex flex-col items-center justify-center max-w-2xl px-4 md:px-8 mt-4 mx-auto space-y-8 w-full">
      <a href="https://github.com/imyuanli/shareenv">
        <n-button round>ShareEnv 已在 Github 开源 →</n-button>
      </a>
      <h1 class="text-5xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white sm:text-7xl">
        <div>安全共享</div>
        <div>你的环境变量</div>
      </h1>
      <p class="leading-5 text-zinc-500 sm:text-center">
        您的文档在存储一段有限的时间和读取操作之前，会在浏览器中进行加密。数据永远不会离开您的浏览器。
      </p>
      <div class="w-full flex justify-center items-center space-x-4">
        <NuxtLink to="/unseal" external class="inline-block w-full max-w-md">
          <n-button
              size="large"
              icon-placement="right"
              class="w-full"
          >
            <template #icon>
              <n-icon>
                <LockOpenOutline/>
              </n-icon>
            </template>
            解密
          </n-button>
        </NuxtLink>
        <NuxtLink to="/share" external class="inline-block w-full max-w-md">
          <n-button
              size="large"
              type="primary"
              text-color="#fff"
              icon-placement="right"
              class="w-full"
          >
            <template #icon>
              <n-icon>
                <ArrowForwardSharp/>
              </n-icon>
            </template>
            分享
          </n-button>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full mt-4">
      <h2 class="py-12 text-3xl font-bold text-center text-zinc-300 ">工具使用状态</h2>
      <section class="container mx-auto grid grid-cols-3">
        <div class="flex flex-col justify-center items-center">
          <div class="text-2xl font-bold tracking-tight text-center sm:text-5xl text-zinc-200">
            {{ numFormat(state.encryption_count) }}
          </div>
          <div class="leading-6 text-center text-zinc-500">
            已加密文档
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-2xl font-bold tracking-tight text-center sm:text-5xl text-zinc-200">
            {{ numFormat(state.decrypt_count) }}
          </div>
          <div class="leading-6 text-center text-zinc-500">
            已解密文档
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-2xl font-bold tracking-tight text-center sm:text-5xl text-zinc-200">
            98%
          </div>
          <div class="leading-6 text-center text-zinc-500">
            安全度提升
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {ArrowForwardSharp, LockOpenOutline} from '@vicons/ionicons5'
import {NIcon, useMessage} from 'naive-ui'
import {numFormat} from '../utils/index'
import {useLazyFetch, useState} from "nuxt/app";
import BASE_URL from "../utils/base_url";

const message = useMessage()
const state = useState('state', () => {
  return {
    encryption_count: 0,
    decrypt_count: 0,
  }
})

const {pending, data} = await useLazyFetch(`${BASE_URL}/get_share_env_count/`)
watch(data, (newData) => {
  state.value.encryption_count = newData.data.encryption_count
  state.value.decrypt_count = newData.data.decrypt_count
})
</script>