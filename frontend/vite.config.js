import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/anhei-games/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false, // 使用 public/manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wof,woff2}']
      }
    })
  ],
})
