import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173, // Default to 5173 if PORT is not set
    host: '0.0.0.0', // Listen on all network interfaces
  },
  build: {
    outDir: 'dist',
  },
});
