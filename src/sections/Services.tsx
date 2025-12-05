import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type Pill = {
  label: string
  body: string
}

/** Reveal-on-scroll helper */
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

const workPills: Pill[] = [
  {
    label: "Websites",
    body: "Marketing, product, and docs sites as static or hybrid builds that load fast and stay easy to update.",
  },
  {
    label: "Web apps",
    body: "Dashboards, portals, and internal tools with sign-in, roles, and a clean API behind them.",
  },
  {
    label: "APIs & Ops",
    body: "Backend services, hosting, and automation so your stack stays observable, backed up, and deployable.",
  },
]

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

        <div className="mt-4">
          <Reveal>
            <Card className="border-border/70 bg-muted/40">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">How I work</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] lg:gap-8">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    I help teams build and run modern websites, web apps, APIs, and the systems around them.
                  </p>
                  <p>
                    Projects come in two forms: items purchased directly from my catalog, or custom work defined through
                    a proposal.
                  </p>
                  <p>
                    When a project begins, it will appear as an engagement in the Client Dashboard (coming soon), where
                    you&apos;ll be able to follow progress, share materials, review milestones, and manage any hosting
                    or operational work attached to it.
                  </p>
                  <p>
                    Interested? Register in the client area to book a consultation, or send me an email through the
                    contact form below.
                  </p>
                </div>

                <div className="space-y-3 md:border-l md:border-border/60 md:pl-6">
                  {workPills.map((pill) => (
                    <div
                      key={pill.label}
                      className="rounded-xl border border-border/70 bg-background/60 p-3 text-sm shadow-sm"
                    >
                      <Badge variant="secondary" className="mb-1 rounded-full">
                        {pill.label}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{pill.body}</p>
                    </div>
                  ))}
                </div>
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