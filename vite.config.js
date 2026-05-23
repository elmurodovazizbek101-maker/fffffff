import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: './',
  plugins: [
    react({
      // Fast Refresh ni sekinlashtirish
      fastRefresh: false
    }),
    legacy({
      targets: ['defaults', 'IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  server: {
    port: 5173,
    host: '0.0.0.0',
    // Hot reload ni sekinlashtirish
    hmr: {
      overlay: false
    },
    // File watching ni sekinlashtirish
    watch: {
      usePolling: false,
      interval: 1000
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
        inlineDynamicImports: true
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
})
