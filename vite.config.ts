import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  const base = '/'

  return {
    plugins: [react(), tailwindcss()],
    base,
    build: {
      // Relative to the project root, which is process.cwd() when Vite runs
      // (this repo always builds from its own root) — avoids depending on
      // node:path/__dirname, neither of which this config's tsconfig types.
      rollupOptions: {
        input: {
          main: 'index.html',
          mentionsLegales: 'mentions-legales.html',
          frMain: 'fr/index.html',
          frMentionsLegales: 'fr/mentions-legales.html',
        },
      },
    },
  }
})