import { useState, type ReactNode, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { Globe2, LayoutDashboard, ServerCog, CloudCog, ShieldCheck, Activity } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Pill = {
  label: string
  body: string
  icon: LucideIcon
}

type LeftBlock = {
  title: string
  body: string
}

/** Reveal-on-scroll helper - GSAP Version */
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
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${amount * 100}%`,
            once: true,
          },
        }
      )
    },
    { scope: ref }
  )

  return <div ref={ref}>{children}</div>
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

const leftBlocks: LeftBlock[] = [
  {
    title: "Build & run",
    body: "I help teams build and run modern websites, web apps, APIs, and the systems around them.",
  },
  {
    title: "How projects start",
    body: "We either pick something from the catalog or define a custom proposal together.",
  },
  {
    title: "Where work lives",
    body: "Each project appears as an engagement in the Client Dashboard (coming soon) where you can follow progress, share materials, review milestones, and manage any hosting or ops attached to it.",
  },
  {
    title: "Getting in touch",
    body: "Register in the client area to book a consultation, or reach out through the contact form below.",
  },
]

export function Services() {
  const [mode, setMode] = useState<"build" | "ops">("build")
  const pills = mode === "build" ? buildPills : opsPills
  const pillsRef = useRef<HTMLDivElement>(null)

  // Animate pills on mode change (3D Flip)
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    gsap.fromTo(
      ".pill-item",
      {
        opacity: 0,
        rotationX: -45, // Stronger tilt
        y: -20,
        z: -50,
        transformOrigin: "50% 0%", // Top center
        immediateRender: false,
      },
      {
        opacity: 1,
        rotationX: 0,
        y: 0,
        z: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.2)", // Nice snappy elastic
        clearProps: "transform,opacity,visibility" // Ensure clean final state
      }
    )
  }, { scope: pillsRef, dependencies: [mode] })

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
                    Use my shop or reach out through my form to book a consultation.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="hidden sm:inline">Focus</span>
                  <div className="inline-flex items-center rounded-full border border-border/60 bg-background/60 p-0.5">
                    <button
                      type="button"
                      onClick={() => setMode("build")}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${mode === "build"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60"
                        }`}
                    >
                      Build
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("ops")}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${mode === "ops"
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
                {/* Left: structured blocks with hover emphasis */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {leftBlocks.map((block) => (
                    <div
                      key={block.title}
                      className="group rounded-lg border border-transparent bg-transparent px-2 py-2 transition-colors hover:border-border/60 hover:bg-background/60"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                        {block.title}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground group-hover:text-foreground">{block.body}</p>
                    </div>
                  ))}
                </div>

                {/* Right: build/ops tiles with icons */}
                <div className="md:border-l md:border-border/60 md:pl-6" ref={pillsRef}>
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-3">
                    <span>{mode === "build" ? "Build & product" : "Ops & reliability"}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      {mode === "build" ? "Catalog & proposals" : "Hosting & ongoing"}
                    </span>
                  </div>

                  <div className="space-y-3 perspective-[1000px]">
                    {pills.map((pill) => (
                      <div
                        key={pill.label}
                        className="pill-item flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-3 text-sm shadow-sm will-change-transform"
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