<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <div class="min-h-screen  bg-[#262A31] bg-gradient-to-tr from-zinc-900/50 to-zinc-700/30 flex flex-col justify-between items-center">
        <Header/>
        <main class="w-full relative flex-1">
          <NuxtPage/>
        </main>
        <Footer/>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {darkTheme, NConfigProvider, NDivider} from 'naive-ui'
import Header from './components/header'
import Footer from './components/footer'

</script>