import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      port: 3005,
      strictPort: true,
    },
    plugins: [react()],
  };
});