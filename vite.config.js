import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { visualizer }  from 'rollup-plugin-visualizer';
import { resolve }      from 'path';

export default defineConfig(({ mode }) => ({
  server: {
    port: 3000,
    hmr:  { overlay: true },
  },

  build: {
    target:    'es2020',
    outDir:    'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development',
    minify:    'terser',
    cssMinify: true,
    reportCompressedSize: true,

    terserOptions: {
      compress: {
        drop_console:  true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        // Vendor splitting: separate chunks with long cache lives
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('/react/')
          ) {
            return 'vendor-react';
          }
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
          return 'vendor';
        },

        // Content-hashed filenames — perfect cache invalidation
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    react(),

    // Brotli compression for all text assets (served alongside originals)
    compression({
      algorithm:            'brotliCompress',
      exclude:              [/\.(br)$/, /\.(gz)$/],
      deleteOriginalAssets: false,
    }),

    // Gzip fallback for servers that don't support Brotli
    compression({
      algorithm: 'gzip',
      exclude:   [/\.(br)$/, /\.(gz)$/],
    }),

    // Bundle visualizer — only when running: npm run analyze
    mode === 'analyze' && visualizer({
      filename:   'reports/bundle-analysis.html',
      open:       true,
      gzipSize:   true,
      brotliSize: true,
      template:   'treemap',
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@':        resolve('./src'),
      '@styles':  resolve('./src/styles'),
      '@data':    resolve('./src/data'),
      '@js':      resolve('./src/js'),
      '@hooks':   resolve('./src/hooks'),
      '@context': resolve('./src/context'),
      '@lib':     resolve('./src/lib'),
    },
  },

  css: {
    devSourcemap: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
}));
