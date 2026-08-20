import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project from /DS-Test/, but local dev still uses /.
  base: command === 'build' ? '/DS-Test/' : '/',
  plugins: [tailwindcss(), react()],
}))
