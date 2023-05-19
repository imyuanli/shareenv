<template>
  <div class="container mx-auto px-4 md:px-8">
    <div class="max-w-2xl mx-auto space-y-4">
      <Title text="解密文档"/>
      <n-input type="text" size="large" placeholder="请输入加密的key"/>
      <n-button
          type="primary"
          text-color="#fff"
          size="large"
          icon-placement="right"
          class="w-full"
      >
        解密
      </n-button>
    </div>
  </div>
</template>

<script setup>
import Title from '../../components/title'
import {useAsyncData, useFetch, useRouter} from "nuxt/app";
import BASE_URL from "../../utils/base_url";

const router = useRouter()
console.log(router)
// const handleFetch = async () => {
//   const {data, pending} = await useFetch(`${BASE_URL}/create_encryption_env/`, {
//     method: 'POST',
//     body: {
//       sid: router.,
//       read_num: state.value.readNum,
//       ttl: state.value.ttl,
//       dateType: state.value.dateType,
//       password: state.value.password,
//     }
//   })
//   if (data.value?.errno == 0) {
//     state.value.sid = window.location.hostname + '/unseal/' + data.value.data.sid
//   } else {
//     message.error(data.value?.errmsg)
//   }
//   state.value.loading = pending
// }
// mounted()
// {
//
// }
// const {data, pending} = await useFetch(`${BASE_URL}/create_encryption_env/`, {
//   method: 'POST',
//   body: {
//     content: state.value.content,
//     read_num: state.value.readNum,
//     ttl: state.value.ttl,
//     dateType: state.value.dateType,
//     password: state.value.password,
//   }
// })
//
// const {data} = await useAsyncData('content', () => $fetch('/api/get_current_encryption_env'))
//
//
// const asyncData = async ({params}) => {
//   const {id} = params
//   // 根据 id 获取对应的文章数据
//   const post = await fetch(`/api/posts/${id}`).then(res => res.json())
//   return {post}
// }
</script>