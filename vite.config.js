import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 85
      },
      jpeg: {
        quality: 85
      },
      webp: {
        quality: 88
      },
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default' }
        ]
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      ext: '.br'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          pixi: ['pixi.js', '@pixi/react']
        }
      }
    }
  }
})
