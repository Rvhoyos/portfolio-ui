import { useState, type ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Globe2, LayoutDashboard, ServerCog, CloudCog, ShieldCheck, Activity } from "lucide-react"

type Pill = {
  label: string
  body: string
  icon: LucideIcon
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

const buildPills: Pill[] = [
  {
    label: "Websites",
    body: "Marketing, product, and docs sites as static or hybrid builds that load fast and stay easy to update.",
    icon: Globe2,
  },
  {
    label: "Web apps",
    body: "Dashboards, portals, and internal tools with sign-in, roles, and a clean API behind them.",
    icon: LayoutDashboard,
  },
  {
    label: "APIs & services",
    body: "Backend services that power your product, mobile apps, and integrations.",
    icon: ServerCog,
  },
]

const opsPills: Pill[] = [
  {
    label: "Managed hosting",
    body: "Staging and production environments with zero-downtime deploys where the stack supports it.",
    icon: CloudCog,
  },
  {
    label: "Monitoring & alerts",
    body: "Logs, metrics, and uptime checks so incidents are visible instead of silent.",
    icon: Activity,
  },
  {
    label: "Backups & safety",
    body: "Regular backups and restore drills sized to the risk level of your data.",
    icon: ShieldCheck,
  },
]

const paragraphs: string[] = [
  "I help teams build and run modern websites, web apps, APIs, and the systems around them.",
  "Projects come in two forms: items purchased directly from my catalog, or custom work defined through a proposal.",
  "When a project begins, it will appear as an engagement in the Client Dashboard (coming soon), where you'll be able to follow progress, share materials, review milestones, and manage any hosting or operational work attached to it.",
  "Interested? Register in the client area to book a consultation, or send me an email through the contact form below.",
]

export function Services() {
  const [mode, setMode] = useState<"build" | "ops">("build")
  const pills = mode === "build" ? buildPills : opsPills

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
              <CardHeader className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">How I work</CardTitle>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    Modern web projects end-to-end: from UI and backend services to the systems that keep them online.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="hidden sm:inline">Focus</span>
                  <div className="inline-flex items-center rounded-full border border-border/60 bg-background/60 p-0.5">
                    <button
                      type="button"
                      onClick={() => setMode("build")}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        mode === "build"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/60"
                      }`}
                    >
                      Build
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("ops")}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        mode === "ops"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/60"
                      }`}
                    >
                      Ops
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] lg:gap-8">
                {/* Left: process copy with hover emphasis */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {paragraphs.map((text) => (
                    <div
                      key={text}
                      className="group rounded-lg border border-transparent bg-transparent px-2 py-1 transition-colors hover:border-border/60 hover:bg-background/60"
                    >
                      <p className="text-sm text-muted-foreground group-hover:text-foreground">{text}</p>
                    </div>
                  ))}
                </div>

                {/* Right: build/ops tiles with icons */}
                <div className="space-y-3 md:border-l md:border-border/60 md:pl-6">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>{mode === "build" ? "Build & product" : "Ops & reliability"}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      {mode === "build" ? "Catalog & proposals" : "Hosting & ongoing"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {pills.map((pill) => (
                      <div
                        key={pill.label}
                        className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-3 text-sm shadow-sm"
                      >
                        <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                          <pill.icon className="h-4 w-4 text-primary" aria-hidden />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-1 rounded-full">
                            {pill.label}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{pill.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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