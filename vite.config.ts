// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
export default defineConfig({
plugins: [react(), tailwindcss()],
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
