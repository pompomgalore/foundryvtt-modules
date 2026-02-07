import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/foundryvtt-modules/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    copyPublicDir: true
  },
  publicDir: 'public'
})
