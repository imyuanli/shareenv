<template>
  <header class="w-full p-4 backdrop-blur">
    <div class="container mx-auto">
      <div class="flex flex-col items-center justify-between sm:h-20 sm:flex-row">
        <NuxtLink class="text-3xl font-semibold duration-150 text-zinc-100 hover:text-white" to="/">ShareEnv</NuxtLink>
        <div class="flex justify-between space-x-4">
          <NuxtLink to="/share">
            <n-button size="large" quaternary :type="curRoute === 'share'?'primary':'default'">
              分享
            </n-button>
          </NuxtLink>
          <NuxtLink to="/unseal">
            <n-button size="large" quaternary :type="curRoute === 'unseal'?'primary':'default'">
              解密
            </n-button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {NButton} from "naive-ui";
import {useRoute, useState} from "nuxt/app";

const route = useRoute()
const curRoute = useState('curRoute')
watch(() => route.path, (newPath, oldPath) => {
  console.log()
  curRoute.value = newPath.split('/')[1]
}, {immediate: true});

</script>
