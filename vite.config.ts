import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/gsy-trend': {
        target: 'https://guoshuyu.cn',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/gsy-trend/, '/github/trend'),
        headers: {
          'api-token': '4d65e2a5626103f92a71867d7b49fea0'
        }
      }
    }
  }
})
