import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Use a conditional base so local dev server doesn't use the GitHub Pages base.
export default defineConfig(({ command }) => {
  // command === 'serve' for `vite` / `npm run dev`, 'build' for `npm run build`
  const base = command === 'serve' ? '/' : '/portfolio_gazeux/'

  return {
    base,
    plugins: [react(), tailwindcss()],
  }
})
