import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Use a conditional base so local dev server doesn't use the GitHub Pages base.
export default defineConfig(() => {

  return {
    plugins: [react(), tailwindcss()],
    base: "/portfolio_gazeux/", // Set the base path for GitHub Pages
  }
})
