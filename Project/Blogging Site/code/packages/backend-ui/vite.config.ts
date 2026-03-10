import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '')

  const port = parseInt(env.BACKEND_UI_PORT || '3000', 10)


  return{
    plugins: [react()],
    server: {
      port: port,
    }
  }
})
