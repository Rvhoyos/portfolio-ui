// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // keep your existing dev config as-is; this fixes *preview* only
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ['code.quackedmod.wiki'], // ← REQUIRED for your domain
  },
  // (optional but safe) relative base for built assets so /proxy/4173/ works
  base: './',
})
