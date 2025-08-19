import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/'
  
  return {
    plugins: [react(), tailwindcss()],
    base,
  }
})