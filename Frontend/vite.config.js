import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ✅ Change this from 5173 to 5174
    host: 'localhost',
    cors: true
  }
});
