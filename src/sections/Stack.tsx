import { useRef, useState } from "react"
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
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

type BucketItem = string | { label: string; desc?: string }

/* -------------------------------------------------------------------------- */
/*                                Data Config                                 */
/* -------------------------------------------------------------------------- */

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
    { label: "Redis", desc: "High-performance in-memory cache and message broker." },
    { label: "TimescaleDB", desc: "Time-series on Postgres for metrics/events." },
    { label: "Flyway", desc: "Schema migrations applied safely via CI/CD." },
  ],

  "Security & Privacy": [
    { label: "OAuth2/SSO", desc: "Short-lived tokens, refresh cookies (HttpOnly, Secure), role-based access." },
    { label: "CSP + headers", desc: "CSP (nonces), HSTS, and Referrer Policy by default." },
    { label: "Rate-limits & logs", desc: "Abuse protection with request IDs and structured logs." },
    { label: "PIPEDA/CASL & GDPR awareness", desc: "Privacy-first builds with consent flows and minimal data collection." },
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

/* -------------------------------------------------------------------------- */
/*                                   Main                                     */
/* -------------------------------------------------------------------------- */

export function Stack() {
  const [activeTab, setActiveTab] = useState("Frontend")
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Section entrance animation
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      }
    })

    // Heading with split effect
    tl.fromTo(
      "#stack-header",
      { y: 40, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      { y: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
    )

    // Intro text
    tl.fromTo(
      "#stack-intro",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )

    // Tab pills cascade
    tl.fromTo(
      ".stack-pill",
      { scale: 0.8, opacity: 0, y: 10 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(2)"
      },
      "-=0.3"
    )

    // Card container
    tl.fromTo(
      ".stack-card",
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    )

  }, { scope: containerRef })

  // Item stagger on tab change with 3D flip
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const items = cardRef.current?.querySelectorAll<HTMLElement>(".stack-item")
    if (!items || items.length === 0) return

    gsap.fromTo(
      items,
      {
        y: 25,
        opacity: 0,
        rotationX: -15,
        transformOrigin: "50% 0%",
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: {
          each: 0.06,
          from: "start",
        },
        ease: "power3.out",
        duration: 0.5,
        overwrite: "auto",
      }
    )
  }, {
    dependencies: [activeTab],
    scope: cardRef
  })

  // Tab pill hover effects
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const pills = containerRef.current?.querySelectorAll(".stack-pill")

    pills?.forEach((pill) => {
      const onEnter = () => {
        gsap.to(pill, { scale: 1.05, y: -2, duration: 0.25, ease: "power2.out" })
      }
      const onLeave = () => {
        gsap.to(pill, { scale: 1, y: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" })
      }

      pill.addEventListener("mouseenter", onEnter)
      pill.addEventListener("mouseleave", onLeave)
    })
  }, { scope: containerRef })

  // Stack item hover effects
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const items = cardRef.current?.querySelectorAll(".stack-item")

    items?.forEach((item) => {
      const icon = item.querySelector(".stack-icon")

      const onEnter = () => {
        gsap.to(item, {
          scale: 1.02,
          y: -2,
          boxShadow: "0 8px 25px -8px hsl(var(--primary) / 0.15)",
          borderColor: "hsl(var(--primary) / 0.3)",
          duration: 0.3,
          ease: "power2.out"
        })
        if (icon) {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            color: "hsl(var(--primary))",
            duration: 0.4,
            ease: "back.out(2)"
          })
        }
      }

      const onLeave = () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          boxShadow: "none",
          borderColor: "hsl(var(--border) / 0.6)",
          duration: 0.4,
          ease: "elastic.out(1, 0.5)"
        })
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            color: "currentColor",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }

      item.addEventListener("mouseenter", onEnter)
      item.addEventListener("mouseleave", onLeave)
    })
  }, { dependencies: [activeTab], scope: cardRef })

  return (
    <section id="stack" ref={containerRef} className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 md:py-6">

        {/* Header with animated dot */}
        <div id="stack-header" className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            <span className="relative inline-block">
              Stack
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
              />
            </span>
          </h2>
        </div>

        {/* Intro Text - Preserved Exactly */}
        <p id="stack-intro" className="mt-1 text-sm text-muted-foreground max-w-xl">
          Tools and practices I use day-to-day and what your build can ship with.
        </p>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue="Frontend"
          className="mt-4"
        >
          {/* Pills with enhanced styling */}
          <TabsList className="h-auto flex-wrap gap-1 justify-start max-w-full bg-transparent p-0">
            {Object.keys(buckets).map((k) => {
              const Icon = bucketIcons[k]
              return (
                <TabsTrigger
                  key={k}
                  value={k}
                  className="stack-pill text-xs whitespace-nowrap rounded-full border border-border/60 bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all will-change-transform gap-1 px-2 py-1"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                  <span className="hidden sm:inline">{k}</span>
                  <span className="sm:hidden">{k.split(" ")[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {Object.entries(buckets).map(([k, items]) => {
            const Icon = bucketIcons[k] ?? CheckCircle2
            return (
              <TabsContent key={k} value={k} className="mt-3 outline-none">
                <Card ref={cardRef} className="stack-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-2 pt-3 px-4 border-b border-border/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-lg">{k}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="rounded-full px-3">
                        {items.length} items
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-3 px-4">
                    {/* Grid of items with enhanced cards */}
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
                      {items.map((item) => {
                        const data = typeof item === "string" ? { label: item } : item
                        return (
                          <div
                            key={data.label}
                            className="stack-item group rounded-lg border border-border/50 bg-background/80 p-2 transition-all cursor-default will-change-transform [transform-style:preserve-3d]"
                          >
                            <div className="flex items-start gap-2">
                              <div className="p-1 rounded bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                <CheckCircle2 className="stack-icon h-3 w-3 opacity-70 transition-all" aria-hidden="true" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                                  {data.label}
                                </div>
                                {data.desc && (
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {data.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}