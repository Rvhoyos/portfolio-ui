// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
      })
    },
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  // keep your existing dev config as-is; this fiyxes *preview* only
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ['code.quackedmod.wiki'], // ← REQUIRED for your domain
  },
  // (optional but safe) relative base for built assets so /proxy/4173/ works
  base: './',
})
