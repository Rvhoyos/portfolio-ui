import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight", className)}>
      <span className="inline-flex items-center gap-3">
        <span aria-hidden className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
        <span className="relative inline-block">
          {children}
          <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0" />
        </span>
      </span>
    </h2>
  )
}
