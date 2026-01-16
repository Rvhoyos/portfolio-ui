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

/* -------------------------------------------------------------------------- */
/*                                   Main                                     */
/* -------------------------------------------------------------------------- */

export function Stack() {
  const [activeTab, setActiveTab] = useState("Frontend")
  const containerRef = useRef<HTMLDivElement>(null)

  // Use GSAP for the Item Stagger
  useGSAP(() => {
    // Target only the visible items in the active tab (Radix unmounts inactive ones)
    const items = gsap.utils.toArray<HTMLElement>(".stack-item")

    if (items.length > 0) {
      // We attach a ScrollTrigger to the FIRST animation so it waits for view.
      // Subsequent tab switches will likely be in view, so ST will fire immediately.
      gsap.fromTo(
        items,
        {
          y: 30,
          autoAlpha: 0,
          scale: 0.9
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            grid: "auto",
            from: "start"
          },
          ease: "back.out(1.7)",
          duration: 0.5,
          overwrite: "auto",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, {
    dependencies: [activeTab],
    scope: containerRef
  })

  // Use GSAP for the Section Reveal (Header + Intro + Pills)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#stack",
        start: "top 70%", // Triggers later, ensuring visibility
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(
      "#stack-header",
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        "#stack-intro",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".stack-pills",
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      )

  }, { scope: containerRef })

  return (
    <section id="stack" ref={containerRef} className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">

        {/* Header with Dot */}
        <div id="stack-header">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Stack
          </h2>
        </div>

        {/* Intro Text - Preserved Exactly */}
        <div id="stack-intro">
          <p className="mt-2 text-muted-foreground">
            Tools and practices I use day-to-day and what your build can ship with.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue="Frontend"
          className="mt-6"
        >
          {/* Pills: wrap by default; single row on lg+ */}
          <TabsList className="stack-pills h-auto flex-wrap gap-2 justify-start max-w-full md:flex-wrap lg:h-10 lg:flex-nowrap">
            {Object.keys(buckets).map((k) => (
              <TabsTrigger key={k} value={k} className="whitespace-nowrap rounded-full">
                {k}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(buckets).map(([k, items]) => {
            const Icon = bucketIcons[k] ?? CheckCircle2
            return (
              <TabsContent key={k} value={k} className="mt-6 outline-none">
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

                    {/* Grid of items */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {items.map((item, i) => {
                        const data = typeof item === "string" ? { label: item } : item
                        return (
                          <div
                            key={i}
                            className="stack-item rounded-lg border border-border/60 bg-muted/30 p-3"
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