import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig(() => ({
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress', ext: '.br', deleteOriginFile: false }),
    compression({ algorithm: 'gzip', ext: '.gz', deleteOriginFile: false }),
    visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true, brotliSize: true }),
  ],
  build: {
    sourcemap: true,
    target: 'es2018',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          recharts: ['recharts'],
          ui: ['react-icons', '@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
}));
