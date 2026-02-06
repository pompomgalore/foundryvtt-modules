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
  server: {
    fs: {
      // Allow serving files from the modules and releases directories
      allow: ['..']
    }
  },
  publicDir: 'public'
})
