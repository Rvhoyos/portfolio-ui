import type { ReactNode } from 'react'
import { Header } from '@/layout/Header'
import { Footer } from '@/layout/Footer'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
