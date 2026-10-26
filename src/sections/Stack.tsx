import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react"
import {
  SiApachemaven, SiDocker, SiFlyway, SiGithubactions, SiHibernate, SiJunit5, SiKubernetes,
  SiNextdotjs, SiNginx, SiOpenjdk, SiPostgresql, SiPython, SiReact, SiRedis, SiSpringboot,
  SiTailwindcss, SiTimescale, SiTypescript, SiVite,
} from "@icons-pack/react-simple-icons"
import {
  Activity, Box, Boxes, CircuitBoard, Cpu, Dices, FlaskConical, Gauge, KeyRound,
  ChartPie, Scale, ScrollText, Shapes, ShieldCheck, Table2, Container, Workflow, RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { gsap, Flip, useGSAP } from "@/lib/gsap"
import { useReveal } from "@/lib/useReveal"
import { SectionHeading } from "@/components/SectionHeading"
import { SectionBackdrop } from "@/components/SectionBackdrop"
import bgSmall from "@/assets/photos/bg-windmill-1200.webp"
import bgLarge from "@/assets/photos/bg-windmill-2400.webp"

// title="" suppresses the brand name Simple Icons renders as a native tooltip
type Icon = ComponentType<{ className?: string; title?: string }>
type Item = { short: string; label: string; desc: string; icon: Icon }
type Group = "build" | "ship" | "engineering"
type Filter = Group | "all"
type Category = { title: string; short: string; group: Group; items: Item[] }

// Ordered by importance: attention drops sharply down the page, so foundations and backend lead
const categories: Category[] = [
  {
    title: "Engineering Foundations",
    short: "Engineering",
    group: "engineering",
    items: [
      { short: "Microcontrollers", label: "Microcontroller programming", icon: Cpu, desc: "Embedded C/C++ projects with sensors, LEDs, actuators, and servos, timers, and I/O." },
      { short: "Control theory", label: "System dynamics & control theory", icon: Activity, desc: "Time- and frequency-response analysis of LTI dynamic systems (Laplace, convolution, Bode) to model input signal responses. MATLAB & Simulink for simulation." },
      { short: "Queuing models", label: "Random variate generation & queuing models", icon: Dices, desc: "Arrival/service time distributions for operating policy simulation studies." },
      { short: "Op-amp circuits", label: "Analog circuits with op-amps", icon: CircuitBoard, desc: "Signal filtering, and circuits for microcontrollers." },
      { short: "Field electronics", label: "Field electronics troubleshooting", icon: Gauge, desc: "Hands-on fault-finding on specialized geophysical EM equipment with multimeters." },
    ],
  },
  {
    title: "Backend",
    short: "Backend",
    group: "build",
    items: [
      { short: "Spring Boot", label: "Spring Boot", icon: SiSpringboot, desc: "APIs and services with validation and versioned contracts." },
      { short: "JPA/Hibernate", label: "JPA/Hibernate", icon: SiHibernate, desc: "Data mapping and transactional repositories." },
      { short: "Maven & Gradle", label: "Maven & Gradle", icon: SiApachemaven, desc: "Reproducible builds and dependency management." },
    ],
  },
  {
    title: "Languages",
    short: "Languages",
    group: "build",
    items: [
      { short: "Java", label: "Java", icon: SiOpenjdk, desc: "Primary backend language for APIs and services." },
      { short: "TypeScript", label: "TypeScript", icon: SiTypescript, desc: "Typed client code for reliable UI and shared contracts." },
      { short: "Python", label: "Python", icon: SiPython, desc: "Fast prototyping and custom integrations / project-specific tasks." },
      { short: "SQL", label: "SQL", icon: Table2, desc: "Relational queries with schema changes tracked via migrations." },
    ],
  },
  {
    title: "Frontend",
    short: "Frontend",
    group: "build",
    items: [
      { short: "React", label: "React", icon: SiReact, desc: "Client-rendered experiences with protected routes when needed." },
      { short: "Next.js", label: "Next.js", icon: SiNextdotjs, desc: "Hybrid SSR, routing, and data fetching for modern app UIs." },
      { short: "Vite", label: "Vite", icon: SiVite, desc: "Fast local dev and optimized production builds." },
      { short: "Tailwind", label: "Tailwind", icon: SiTailwindcss, desc: "Utility-first styling for consistent, accessible UI." },
    ],
  },
  {
    title: "Data Stores",
    short: "Data",
    group: "build",
    items: [
      { short: "PostgreSQL", label: "PostgreSQL", icon: SiPostgresql, desc: "Reliable relational core for most workloads." },
      { short: "Redis", label: "Redis", icon: SiRedis, desc: "High-performance in-memory cache and message broker." },
      { short: "TimescaleDB", label: "TimescaleDB", icon: SiTimescale, desc: "Time-series on Postgres for metrics/events." },
      { short: "Flyway", label: "Flyway", icon: SiFlyway, desc: "Schema migrations applied safely via CI/CD." },
    ],
  },
  {
    title: "DevOps",
    short: "DevOps",
    group: "ship",
    items: [
      { short: "Docker", label: "Docker", icon: SiDocker, desc: "Containerized runtime for parity across environments." },
      { short: "Caddy / Nginx", label: "Caddy or Nginx", icon: SiNginx, desc: "Edge proxy & static serving with TLS and routing." },
      { short: "GitHub Actions", label: "GitHub Actions", icon: SiGithubactions, desc: "Automated builds, tests, and deployments." },
      { short: "CI/CD", label: "CI/CD (staging to production)", icon: Workflow, desc: "Ship to staging first. Promote to production safely." },
      { short: "Zero-downtime", label: "Zero-downtime deploys", icon: RefreshCw, desc: "Rolling updates with health checks and safe rollbacks." },
      { short: "Kubernetes", label: "Kubernetes (optional)", icon: SiKubernetes, desc: "Ingress, Deployments, readiness/liveness, rolling updates." },
    ],
  },
  {
    title: "Security & Privacy",
    short: "Security",
    group: "ship",
    items: [
      { short: "OAuth2/SSO", label: "OAuth2/SSO", icon: KeyRound, desc: "Short-lived tokens, refresh cookies (HttpOnly, Secure), role-based access." },
      { short: "CSP + headers", label: "CSP + headers", icon: ShieldCheck, desc: "CSP (nonces), HSTS, and Referrer Policy by default." },
      { short: "Rate limits & logs", label: "Rate-limits & logs", icon: ScrollText, desc: "Abuse protection with request IDs and structured logs." },
      { short: "PIPEDA/CASL & GDPR", label: "PIPEDA/CASL & GDPR awareness", icon: Scale, desc: "Privacy-first builds with consent flows and minimal data collection." },
    ],
  },
  {
    title: "Testing & Quality",
    short: "Testing",
    group: "ship",
    items: [
      { short: "JUnit 5", label: "JUnit 5", icon: SiJunit5, desc: "Unit and integration tests for services and logic." },
      { short: "Testcontainers", label: "Testcontainers", icon: Container, desc: "Real services (Postgres, etc.) in ephemeral test envs." },
      { short: "JaCoCo", label: "JaCoCo reports", icon: ChartPie, desc: "Coverage reporting in CI." },
      { short: "Model-based testing", label: "Input Domain & Model-Based Testing", icon: FlaskConical, desc: "Engineering-grade test design to expose edge cases." },
    ],
  },
  {
    title: "Software Architecture",
    short: "Architecture",
    group: "engineering",
    items: [
      { short: "Monolith", label: "Monolith", icon: Box, desc: "Simple deployment, strong testability." },
      { short: "Microservice", label: "Microservice", icon: Boxes, desc: "Independent services with clear, versioned APIs and separate deployments." },
      { short: "Design patterns", label: "OOP Design Patterns (SOLID, DRY)", icon: Shapes, desc: "Composition-first, clear boundaries and reuse." },
    ],
  },
]

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "build", label: "Build" },
  { value: "ship", label: "Ship" },
  { value: "engineering", label: "Engineering" },
]

type Selection = { category: Category; item: Item }

// NN/g timing guidance: a hover only signals intent once the cursor has rested ~0.3-0.5 s
const HOVER_INTENT_MS = 300
// ...and leaving only signals intent once the cursor has been gone for more than 0.5 s
const HOVER_EXIT_MS = 500

const isShown = (category: Category, filter: Filter) => filter === "all" || category.group === filter

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function Detail({ category, item }: Selection) {
  return (
    <div className="stack-detail-body">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border/60 bg-background/80">
          <item.icon className="h-7 w-7 text-foreground/85" title="" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="text-sm text-muted-foreground">{category.title}</div>
          <div className="text-lg font-semibold leading-snug">{item.label}</div>
        </div>
      </div>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.desc}</p>
    </div>
  )
}

function StackItem({
  item,
  expanded,
  selected,
  onSelect,
}: {
  item: Item
  expanded: boolean
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "stack-item transition-colors duration-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        expanded
          ? "flex h-[76px] w-full flex-col items-center gap-1 rounded-lg border px-2 pt-2 text-center"
          : "rounded-md px-2 py-1 text-left text-sm xl:w-full",
        expanded && selected && "border-primary bg-primary/15 font-semibold text-foreground",
        expanded && !selected && "border-border/70 bg-background/60 font-medium text-foreground/85 hover:border-primary/50 hover:bg-background",
        !expanded && selected && "font-medium text-primary",
        !expanded && !selected && "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
      )}
    >
      {expanded && <item.icon className="stack-icon h-7 w-7 shrink-0" title="" aria-hidden />}
      <span className="text-sm leading-tight hyphens-auto">{item.short}</span>
    </button>
  )
}

export function Stack() {
  const [filter, setFilter] = useState<Filter>("all")
  const [active, setActive] = useState<Category | null>(null)
  const [selection, setSelection] = useState<Selection>({ category: categories[0], item: categories[0].items[0] })
  const [lastByCategory, setLastByCategory] = useState<Record<string, Item>>({})
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const filterFlip = useRef<Flip.FlipState | null>(null)
  const expandFlip = useRef<Flip.FlipState | null>(null)
  const gridHeightBefore = useRef(0)
  const hoverTimer = useRef<number | undefined>(undefined)
  const exitTimer = useRef<number | undefined>(undefined)

  useReveal(sectionRef)

  // Swapping the detail content is the feedback for a selection, so it moves enough to be noticed
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo(".stack-detail-body", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" })
  }, { scope: sectionRef, dependencies: [selection.item] })

  useLayoutEffect(() => {
    const state = expandFlip.current
    const grid = gridRef.current
    if (!state || !grid) return
    expandFlip.current = null

    // The grid fits whichever column is open, so ease its height rather than letting the page jump
    gsap.fromTo(grid, { height: gridHeightBefore.current }, { height: grid.offsetHeight, duration: 0.35, ease: "power2.out", clearProps: "height" })
    Flip.from(state, { duration: 0.35, ease: "power2.out", scale: false, nested: true })
    if (!active) return
    const column = `[data-flip-id="${active.title}"]`
    gsap.fromTo(
      `${column} .stack-icon`,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.25, delay: 0.12, stagger: 0.03, ease: "power2.out" },
    )
    gsap.fromTo(`${column} .stack-inline-detail`, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, delay: 0.1, ease: "power2.out" })
  }, [active])

  useLayoutEffect(() => {
    const state = filterFlip.current
    const grid = gridRef.current
    if (!state || !grid) return
    filterFlip.current = null

    // Flip lifts every column out of flow while it animates, so hold the grid's height and ease it
    // to the new one; otherwise everything below the section jumps up and back
    gsap.fromTo(grid, { height: gridHeightBefore.current }, { height: grid.offsetHeight, duration: 0.3, ease: "power2.out", clearProps: "height" })
    Flip.from(state, {
      duration: 0.3,
      ease: "power2.out",
      absolute: true,
      // Opacity only: Flip positions the absolute columns with transform, so tweening y here would override it
      onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
    })
  }, [filter])

  useEffect(() => () => {
    window.clearTimeout(hoverTimer.current)
    window.clearTimeout(exitTimer.current)
  }, [])

  const expand = (category: Category | null) => {
    window.clearTimeout(hoverTimer.current)
    window.clearTimeout(exitTimer.current)
    if (category === active) return
    if (!prefersReducedMotion() && sectionRef.current) {
      // Columns are included because on narrow screens expanding one group moves the groups below it
      const columns = [active, category].filter((c): c is Category => c !== null)
      expandFlip.current = Flip.getState(
        sectionRef.current.querySelectorAll(
          [".stack-col", ...columns.map((c) => `[data-flip-id="${c.title}"] .stack-item`)].join(", "),
        ),
      )
      gridHeightBefore.current = gridRef.current?.offsetHeight ?? 0
    }
    setActive(category)
  }

  const select = (category: Category, item: Item) => {
    expand(category)
    setSelection({ category, item })
    setLastByCategory((prev) => ({ ...prev, [category.title]: item }))
  }

  const applyFilter = (next: Filter) => {
    if (next === filter) return
    if (!prefersReducedMotion() && sectionRef.current) {
      filterFlip.current = Flip.getState(sectionRef.current.querySelectorAll(".stack-col"))
      gridHeightBefore.current = gridRef.current?.offsetHeight ?? 0
    }
    setFilter(next)
    if (active && !isShown(active, next)) setActive(null)
    if (!isShown(selection.category, next)) {
      const first = categories.find((c) => isShown(c, next))
      if (first) setSelection({ category: first, item: first.items[0] })
    }
  }

  return (
    <section id="stack" ref={sectionRef} className="relative isolate overflow-hidden border-t border-border scroll-mt-28">
      <SectionBackdrop small={bgSmall} large={bgLarge} position="object-[center_65%]" />
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="grid gap-8 xl:grid-cols-2 xl:items-end">
          <div data-reveal>
            <SectionHeading>Stack</SectionHeading>
            <p className="mt-3 text-base text-muted-foreground">The tools and practices my work relies on.</p>

            <div role="group" aria-label="Filter categories" className="mt-5 flex flex-wrap gap-2">
              {filters.map((f) => {
                const on = filter === f.value
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => applyFilter(f.value)}
                    className={cn(
                      "h-9 rounded-full border px-4 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      on
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-background/60 text-foreground/80 hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            data-reveal
            aria-live="polite"
            className="hidden h-[11rem] overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 p-4 backdrop-blur-sm xl:block"
          >
            <Detail {...selection} />
          </div>
        </div>

        <div
          ref={gridRef}
          onPointerEnter={() => window.clearTimeout(exitTimer.current)}
          onPointerLeave={(e) => {
            if (e.pointerType !== "mouse") return
            window.clearTimeout(hoverTimer.current)
            exitTimer.current = window.setTimeout(() => expand(null), HOVER_EXIT_MS)
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) expand(null)
          }}
          className="mt-6 grid items-start gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9"
        >
          {categories.map((c) => {
            const expanded = active === c
            const shownItem = selection.category === c ? selection.item : lastByCategory[c.title] ?? c.items[0]
            const listId = `stack-${c.short.toLowerCase()}`
            return (
              <div
                key={c.title}
                data-reveal
                data-flip-id={c.title}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse" || expanded) return
                  hoverTimer.current = window.setTimeout(() => expand(c), HOVER_INTENT_MS)
                }}
                onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
                onFocus={() => expand(c)}
                className={cn("stack-col group", !isShown(c, filter) && "hidden")}
              >
                <h3 className="mb-2">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={listId}
                    onClick={() => select(c, shownItem)}
                    className={cn(
                      "w-full border-b pb-1.5 text-left text-sm font-semibold tracking-wide transition-colors duration-100",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      expanded
                        ? "border-primary text-primary"
                        : "border-border text-foreground/70 group-hover:border-primary/50 group-hover:text-primary",
                    )}
                  >
                    <span className="xl:hidden">{c.title}</span>
                    <span className="hidden xl:inline">{c.short}</span>
                  </button>
                </h3>
                <div
                  id={listId}
                  className={cn(
                    expanded
                      ? "grid grid-cols-3 gap-2 xl:grid-cols-1"
                      : "flex flex-wrap gap-x-1 gap-y-0.5 xl:flex-col xl:flex-nowrap",
                  )}
                >
                  {c.items.map((item) => (
                    <StackItem
                      key={item.label}
                      item={item}
                      expanded={expanded}
                      selected={selection.item === item}
                      onSelect={() => select(c, item)}
                    />
                  ))}
                </div>
                {expanded && (
                  <div className="stack-inline-detail mt-2 rounded-xl border border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 p-4 xl:hidden">
                    <Detail category={c} item={shownItem} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
