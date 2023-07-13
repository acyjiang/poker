import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { BACKEND_URL } from './src/config'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, '..', '')

  return {
    plugins: [react(), svgr()],
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
        }
      }
    }
  }
})