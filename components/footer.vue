<template>
  <div class="w-full">
    <n-divider/>
    <footer class="inset-2x-0 border-zinc-500/10">
      <div class="flex flex-col px-4 pb-4 mx-auto text-sm text-center text-zinc-700 max-w-7xl lg:px-8 space-y-2">
        <p>
          Copyright © {{ new Date().getFullYear() }}
          <MyLink href="https://imyuanli.cn" text="鸢离"/>
        </p>
        <p>ShareEnv is deployed on
          <MyLink href="https://vercel.com" text="Vercel"/>
          <a href="https://vercel.com" class="underline hover:text-white">Vercel</a>
          and driven by
          <MyLink href="https://nuxt.com" text="Nuxt."/>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import MyLink from './my-link'
</script>