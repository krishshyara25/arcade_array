import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts:[
      '47ab-2409-40c1-302f-f68c-6c14-fd4c-36d4-af4c.ngrok-free.app'
    ]
  }
})
