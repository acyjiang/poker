import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, '..', '')

  return {
    plugins: [react(), svgr()],
    server: {
      port: 5000,
      proxy: {
        '/api': {
          // target: env.BACKEND_URL,
          changeOrigin: true,
        }
      }
    }
  }
})