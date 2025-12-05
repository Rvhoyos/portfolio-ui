import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Braces,
  Server,
  Boxes,
  Wrench,
  FlaskConical,
  Shield,
  Layers,
  Database,
  LineChart,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

type BucketItem = string | { label: string; desc?: string }

/* -------- minimal, layout-safe reveal helper -------- */
function Reveal({
  children,
  y = 12,
  delay = 0,
  amount = 0.6,
}: {
  children: React.ReactNode
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
      transition={{ duration: 0.28, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Order: service-oriented first, supporting/assurance last.
 */
const buckets: Record<string, BucketItem[]> = {
  Frontend: [
    { label: "React", desc: "Client-rendered experiences with protected routes when needed." },
    { label: "Next.js", desc: "Hybrid SSR, routing, and data fetching for modern app UIs." },
    { label: "Vite", desc: "Fast local dev and optimized production builds." },
    { label: "Tailwind", desc: "Utility-first styling for consistent, accessible UI." },
  ],

  Backend: [
    { label: "Spring Boot", desc: "APIs and services with validation and versioned contracts." },
    { label: "JPA/Hibernate", desc: "Data mapping and transactional repositories." },
    { label: "Maven & Gradle", desc: "Reproducible builds and dependency management." },
  ],

  DevOps: [
    { label: "Docker", desc: "Containerized runtime for parity across environments." },
    { label: "Caddy or Nginx", desc: "Edge proxy & static serving with TLS and routing." },
    { label: "GitHub Actions", desc: "Automated builds, tests, and deployments." },
    { label: "CI/CD (staging to production)", desc: "Ship to staging first. Promote to production safely." },
    { label: "Zero-downtime deploys", desc: "Rolling updates with health checks and safe rollbacks." },
    { label: "Kubernetes (optional)", desc: "Ingress, Deployments, readiness/liveness, rolling updates." },
  ],

  Languages: [
    { label: "Java", desc: "Primary backend language for APIs and services." },
    { label: "TypeScript", desc: "Typed client code for reliable UI and shared contracts." },
    { label: "Python", desc: "Fast prototyping and custom integrations / project-specific tasks." },
    { label: "SQL", desc: "Relational queries with schema changes tracked via migrations." },
  ],

  "Data Stores": [
    { label: "PostgreSQL", desc: "Reliable relational core for most workloads." },
    { label: "TimescaleDB", desc: "Time-series on Postgres for metrics/events." },
    { label: "Flyway", desc: "Schema migrations applied safely via CI/CD." },
  ],

  "Security & Privacy": [
    { label: "OAuth2/SSO", desc: "Short-lived tokens, refresh cookies (HttpOnly, Secure), role-based access." },
    { label: "CSP + headers", desc: "CSP (nonces), HSTS, and Referrer Policy by default." },
    { label: "Rate-limits & logs", desc: "Abuse protection with request IDs and structured logs." },
    { label: "PIPEDA/CASL baseline - GDPR add-on", desc: "Privacy by design - consent for non-essential trackers." },
  ],

  "Testing & Quality": [
    { label: "JUnit 5", desc: "Unit and integration tests for services and logic." },
    { label: "Testcontainers", desc: "Real services (Postgres, etc.) in ephemeral test envs." },
    { label: "JaCoCo reports", desc: "Coverage reporting in CI." },
    { label: "Input Domain & Model-Based Testing", desc: "Engineering-grade test design to expose edge cases." },
  ],

  "Software Architecture": [
    { label: "Monolith", desc: "Simple deployment, strong testability." },
    { label: "Microservice", desc: "Independent services with clear, versioned APIs and separate deployments." },
    { label: "OOP Design Patterns (SOLID, DRY)", desc: "Composition-first, clear boundaries and reuse." },
  ],

  "Engineering Foundations": [
    {
      label: "Microcontroller programming",
      desc: "Embedded C/C++ projects with sensors, LEDs, actuators, and servos, timers, and I/O.",
    },
    {
      label: "System dynamics & control theory",
      desc: "Time- and frequency-response analysis of LTI dynamic systems (Laplace, convolution, Bode) to model input signal responses. MATLAB & Simulink for simulation.",
    },
    {
      label: "Random variate generation & queuing models",
      desc: "Arrival/service time distributions for operating policy simulation studies.",
    },
    {
      label: "Analog circuits with op-amps",
      desc: "Signal filtering, and circuits for microcontrollers.",
    },
  ],
} as const

const bucketIcons: Record<string, LucideIcon> = {
  Frontend: Boxes,
  Backend: Server,
  DevOps: Wrench,
  Languages: Braces,
  "Data Stores": Database,
  "Security & Privacy": Shield,
  "Testing & Quality": FlaskConical,
  "Software Architecture": Layers,
  "Engineering Foundations": LineChart,
}

export function Stack() {
  return (
    <section id="stack" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="relative inline-block">
                Stack
                <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0" />
              </span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-2 text-muted-foreground">
            Tools and practices I use day-to-day and what your build can ship with.
          </p>
        </Reveal>

        <Tabs defaultValue="Frontend" className="mt-6">
          {/* Pills: wrap by default; single row on lg+ (unchanged for mobile safety) */}
          <TabsList className="h-auto flex-wrap gap-2 justify-start max-w-full md:flex-wrap lg:h-10 lg:flex-nowrap">
            {Object.keys(buckets).map((k) => (
              <TabsTrigger key={k} value={k} className="whitespace-nowrap rounded-full">
                {k}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(buckets).map(([k, items]) => {
            const Icon = bucketIcons[k] ?? CheckCircle2
            return (
              <TabsContent key={k} value={k} className="mt-6">
                <Reveal>
                  <Card className="border-border/70">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 opacity-70" aria-hidden="true" />
                          <CardTitle className="text-base">{k}</CardTitle>
                        </div>
                        <Badge variant="secondary">{items.length} items</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Row-cascade grid: staggered fade-up (does not affect layout/wrap) */}
                      <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                          hidden: {},
                          show: { transition: { staggerChildren: 0.06 } },
                        }}
                        className="grid gap-3 sm:grid-cols-2"
                      >
                        {items.map((item) => {
                          const data = typeof item === "string" ? { label: item } : item
                          return (
                            <motion.div
                              key={data.label}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: { opacity: 1, y: 0 },
                              }}
                              transition={{ duration: 0.24, ease: "easeOut" }}
                              className="rounded-lg border border-border/60 bg-muted/30 p-3"
                            >
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 opacity-70" aria-hidden="true" />
                                <div>
                                  <div className="text-sm font-medium">{data.label}</div>
                                  {data.desc ? (
                                    <p className="text-xs text-muted-foreground">{data.desc}</p>
                                  ) : null}
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    </CardContent>
                  </Card>
                </Reveal>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}