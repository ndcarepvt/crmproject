import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy :{
      '/api':{
        target: 'https://crmproject-zeta.vercel.app',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
