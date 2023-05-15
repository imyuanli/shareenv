<template>
  <div class="h-full absolute top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-around">
    <div class="flex flex-col items-center justify-center max-w-2xl px-8 mt-12 mx-auto space-y-8 w-full">
      <a href="https://github.com/imyuanli/shareenv">
        <n-button round>ShareEnv 已在 Github 开源 →</n-button>
      </a>
      <h1 class="text-5xl font-bold tracking-tight text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-100/50 to-white sm:text-7xl">
        <div>安全共享</div>
        <div>你的环境变量</div>
      </h1>
      <p class="leading-5 text-zinc-600 sm:text-center">
        您的文档在存储一段有限的时间和读取操作之前，会在浏览器中进行加密。数据永远不会离开您的浏览器。
      </p>
      <div class="w-full flex justify-center items-center space-x-4">
        <NuxtLink to="/unseal" class="inline-block w-full max-w-md">
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
            解密文档
          </n-button>
        </NuxtLink>
        <NuxtLink to="/share" class="inline-block w-full max-w-md">
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
            文档分享
          </n-button>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full">
      <h2 class="py-12 text-3xl font-bold text-center text-zinc-300 ">工具使用状态</h2>
      <section class="container mx-auto grid grid-cols-3">
        <div class="flex flex-col justify-center items-center">
          <div class="text-2xl font-bold tracking-tight text-center sm:text-5xl text-zinc-200">
            {{numFormat(2580)}}
          </div>
          <div class="leading-6 text-center text-zinc-500">
            已加密文档
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-2xl font-bold tracking-tight text-center sm:text-5xl text-zinc-200">
            {{numFormat(100)}}
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
import {NIcon} from 'naive-ui'
import {numFormat} from '../utils/index'
</script>

<style scoped>

</style>