import { useRef, useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, GitBranch, RefreshCw, Activity, ShieldCheck } from "lucide-react"
import type { ReactNode } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


/* ---------- Mobile detection (no SSR crash) ---------- */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches)
    onChange(mql)
    mql.addEventListener("change", onChange as (e: MediaQueryListEvent) => void)
    return () => mql.removeEventListener("change", onChange as (e: MediaQueryListEvent) => void)
  }, [breakpoint])
  return isMobile
}

/* ---------- Shared reveal for cards/paragraphs with GSAP ---------- */
function Reveal({
  children,
  y = 16,
  delay = 0,
  amount = 0.6,
  baseDelay = 0,
}: {
  children: ReactNode
  y?: number
  delay?: number
  amount?: number
  baseDelay?: number
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
          delay: baseDelay + delay,
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${amount * 100}%`,
            once: true,
          },
        }
      )
    },
    { scope: ref, dependencies: [delay, baseDelay] }
  )

  return <div ref={ref}>{children}</div>
}

/* ---------- Heading: robust wipe (clip-path) + underline draw ---------- */
function AboutHeading({ baseDelay = 0, amount = 0.6 }: { baseDelay?: number; amount?: number }) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) return

      // Tunables matching original Framer Motion constants
      const WIPE_DUR = 1.6
      const WIPE_DELAY = 0.12
      const SYNC_OFFSET = 0.06
      const UNDERLINE_DUR = WIPE_DUR - SYNC_OFFSET
      const UNDERLINE_DELAY = WIPE_DELAY + SYNC_OFFSET
      const DOT_DUR = 0.6
      const DOT_DELAY = 0.18
      const EASE = "power2.out" // Approx match for [0.22, 1, 0.36, 1]

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${amount * 100}%`,
          once: true,
        },
        delay: baseDelay,
      })

      // Dot
      tl.fromTo(
        ".dot-target",
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: DOT_DUR, ease: EASE },
        DOT_DELAY
      )

      // Text Reveal (Clip Path)
      tl.fromTo(
        ".text-reveal-wrapper",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: WIPE_DUR, ease: EASE },
        WIPE_DELAY
      )

      // Underline
      tl.fromTo(
        ".underline-target",
        { scaleX: 0 },
        { scaleX: 1, duration: UNDERLINE_DUR, ease: EASE },
        UNDERLINE_DELAY
      )
    },
    { scope: containerRef, dependencies: [baseDelay] }
  )

  return (
    <h2 ref={containerRef} className="text-2xl md:text-3xl font-semibold tracking-tight">
      <span className="inline-flex items-center gap-2">
        {/* Dot reveal */}
        <span
          aria-hidden
          className="dot-target h-2 w-2 rounded-full bg-primary/70"
        />

        {/* Text + underline */}
        <span className="relative inline-block">
          {/* Text with clip-path reveal */}
          <span className="text-reveal-wrapper relative inline-block will-change-[clip-path]">
            About
          </span>

          {/* Underline draw */}
          <span
            aria-hidden
            className="underline-target absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0 origin-left"
          />
        </span>
      </span>
    </h2>
  )
}

export function About() {
  const isMobile = useIsMobile()

  // Standard snappy timing
  const SECTION_BASE = 0.1
  const CARD_BASE = 0.25

  const focus = [
    { label: "React-powered user interfaces", desc: "Modern UI with fast navigation.", Icon: Code2 },
    { label: "Spring for APIs and services", desc: "Typed contracts, validation, and versioned endpoints.", Icon: Server },
    { label: "Automated CI and CD to staging and production", desc: "Every change rolls out safely with rollbacks ready.", Icon: GitBranch },
  ] as const

  const principles = [
    { label: "Repeatable deployments", desc: "Scripted infrastructure and containers for parity across envs.", Icon: RefreshCw },
    { label: "Observable systems", desc: "Logging, metrics, and alerts by default for clear ops signals.", Icon: Activity },
    { label: "Clear security practices", desc: "Sensible headers (CSP, HSTS) and strict input validation.", Icon: ShieldCheck },
  ] as const

  // Slightly earlier viewport trigger on phones
  const headingAndParaAmount = isMobile ? 0.4 : 0.6
  const cardAmount = isMobile ? 0.45 : 0.55

  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <AboutHeading baseDelay={SECTION_BASE} amount={headingAndParaAmount} />

        {/* Paragraphs: tighter stagger right after the heading starts */}
        <div className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground/90 space-y-1.5">
          <Reveal y={12} delay={0.0} baseDelay={SECTION_BASE} amount={headingAndParaAmount}>
            <p className="leading-relaxed">
              <strong> I build reliable</strong>, and simple to run web solutions.
            </p>
          </Reveal>
          <Reveal y={12} delay={0.10} baseDelay={SECTION_BASE} amount={headingAndParaAmount}>
            <p className="leading-relaxed">
              Every project ships with automated deployments <strong>and observable</strong> systems.
            </p>
          </Reveal>
          <Reveal y={12} delay={0.20} baseDelay={SECTION_BASE} amount={headingAndParaAmount}>
            <p className="leading-relaxed">
              <strong>Scalable </strong> <strong>software</strong> when you need it.
            </p>
          </Reveal>
        </div>

        {/* Cards: much earlier on desktop, same cadence on mobile but shifted earlier */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Focus */}
          <Reveal baseDelay={CARD_BASE} delay={0.12} amount={cardAmount}>
            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Focus</CardTitle>
                  <Badge variant="secondary">Delivery</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {focus.map(({ label, desc, Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 opacity-70" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          {/* Principles */}
          <Reveal
            baseDelay={CARD_BASE + 0.15}
            delay={0.24}
            amount={cardAmount}
          >
            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Principles</CardTitle>
                  <Badge variant="secondary">Guardrails</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {principles.map(({ label, desc, Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 opacity-70" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
