import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/portfolio_gazeux/'
  
  return {
    plugins: [react(), tailwindcss()],
    base,
  }
})