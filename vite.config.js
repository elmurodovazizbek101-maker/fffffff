import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild', // Use esbuild instead of terser
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons'
            }
          }
        }
      }
    },
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (optional)
    sourcemap: false
  },
  // Server optimization
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    // Enable HTTP/2
    https: false,
    // Optimize HMR
    hmr: {
      overlay: true
    }
  },
  // Preview optimization
  preview: {
    port: 4173,
    strictPort: false,
    open: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    exclude: []
  }
})
