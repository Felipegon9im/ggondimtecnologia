import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mercadopdv: resolve(__dirname, 'mercadopdv.html'),
        sophiapainel: resolve(__dirname, 'sophiapainel.html'),
        zapflow: resolve(__dirname, 'zapflow.html'),
        agendaflow: resolve(__dirname, 'agendaflow.html'),
      }
    }
  }
})
