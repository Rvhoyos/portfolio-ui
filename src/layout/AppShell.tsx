import type { ReactNode } from 'react'
import { Header } from '@/layout/Header'
import { Footer } from '@/layout/Footer'
import { InteractiveBackground } from '@/components/InteractiveBackground'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/8 text-foreground">
      <InteractiveBackground />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
