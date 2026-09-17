import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const index = resolve(rootDir, 'dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(rootDir, 'dist/404.html'))
      }
    },
  }
}

// Project site: https://web-developer89.github.io/web-developer/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/web-developer/' : '/',
  plugins: [react(), githubPagesSpaFallback()],
}))
