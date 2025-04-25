import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    root: 'src', // Your entry folder
    publicDir: '../public', // Optional: use if you have /public assets like icons or logos
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          dashboard: resolve(__dirname, 'src/dashboard/dashboard.html'),
          login: resolve(__dirname, 'src/login/login.html'),
        }
      }
    }
  }
});
