import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

/** Reveal-on-scroll helper:
 * - Triggers later (amount: 0.6 → ~60% of element must be in view)
 * - Slightly stronger lift (y: 16)
 * - A touch longer duration (0.7s)
 */
function Reveal({
  children,
  y = 16,
  delay = 0,
  amount = 0.6,
}: {
  children: ReactNode
  y?: number
  delay?: number
  amount?: number
}) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
            <span className="relative inline-block">
              Services
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
              />
            </span>
          </span>
        </h2>

        <div className="mt-4 max-w-3xl">
          <Reveal>
            <Card className="border-border/70 bg-muted/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How I work</CardTitle>
                <CardDescription>
                  Modern web projects end-to-end: UI, backend services, and the systems around them.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  I help teams build and run modern websites, web apps, APIs, and the systems around them. Apps and
                  dashboards use React/Next.js for server rendering or client-side interactivity; pure marketing and
                  docs sites ship as fast, low-cost static or hybrid builds.
                </p>
                <p>
                  Projects come in two forms: items purchased directly from my catalog, or custom work defined through
                  a proposal.
                </p>
                <p>
                  When a project begins, it will appear as an engagement in the Client Dashboard (coming soon), where
                  you&apos;ll be able to follow progress, share materials, review milestones, and manage any hosting or
                  operational work attached to it.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Privacy by design is included. Canada PIPEDA and CASL are observed. GDPR support is available when your
          audience includes the EU. Sub processors are disclosed in contracts. Consent is captured for non essential
          trackers.
        </p>
      </div>
    </section>
  )
}