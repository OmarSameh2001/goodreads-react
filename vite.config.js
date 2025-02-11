import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      port: 3008,
      strictPort: true,
      historyApiFallback: true, // Enable client-side routing
    },
    plugins: [react()],
  };
});