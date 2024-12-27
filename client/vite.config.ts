import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
    optimizeDeps: {
      include: ['vue', 'vue-router']
    },
    build: {
      rollupOptions: {
        input: 'src/main.ts'
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173
    }
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:3000/api',
    //         changeOrigin: true,
    //         secure: false, // измените на true, если используете HTTPS (рекомендуется)
    //         rewrite: function (path) { return path.replace(/^\/api/, ''); },
    //     },
    // },
  
  }
)
