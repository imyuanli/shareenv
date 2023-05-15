// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
export default defineNuxtConfig({
    modules:[
        '@nuxtjs/tailwindcss',
    ],
    components: true,
    vite: {
        plugins: [
            Components({
                resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
            }),
        ],
        // @ ts-expect-error: Missing ssr key
        ssr: {
            noExternal: ['moment', 'naive-ui', '@juggle/resize-observer', '@css-render/vue3-ssr'],
        },
        envDir: '~/env', // 指定env文件夹
        optimizeDeps: {
            include: ['@vicons/ionicons5']
        },
    }
})
