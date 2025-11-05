import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, GitBranch, RefreshCw, Activity, ShieldCheck } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"

/** -------------------- Global timing -------------------- **
 * Starts soon after the hero headline completes and the paragraph begins.
 */
const ABOUT_BASE_DELAY = 3.2 // seconds

/** Make cards begin much sooner on desktop so the pause is obvious */
const DESKTOP_ADVANCE_SEC = 2.4

/** Mobile keeps its existing feel */
const MOBILE_ADVANCE_SEC = 1.2

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

/* ---------- Shared reveal for cards/paragraphs ---------- */
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
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: "easeOut", delay: baseDelay + delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Heading: robust wipe (translateX) + underline draw ---------- */
function AboutHeading({ baseDelay = 0, amount = 0.6 }: { baseDelay?: number; amount?: number }) {
  const prefersReduced = useReducedMotion()

  // Tunables
  const WIPE_DUR = 1.6
  const WIPE_DELAY = 0.12
  const SYNC_OFFSET = 0.06 // underline starts just after the wipe begins
  const UNDERLINE_DUR = WIPE_DUR - SYNC_OFFSET
  const UNDERLINE_DELAY = WIPE_DELAY + SYNC_OFFSET
  const DOT_DUR = 0.6
  const DOT_DELAY = 0.18
  const EASE = [0.22, 1, 0.36, 1] as const

  return (
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
      <span className="inline-flex items-center gap-2">
        {/* Dot reveal */}
        {prefersReduced ? (
          <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
        ) : (
          <motion.span
            aria-hidden
            className="h-2 w-2 rounded-full bg-primary/70"
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: DOT_DUR, delay: baseDelay + DOT_DELAY, ease: EASE }}
            viewport={{ once: true, amount }}
            style={{ transformOrigin: "center", willChange: "transform, opacity" }}
          />
        )}

        {/* Text + underline */}
        <span className="relative inline-block">
          {/* Text with overlay wipe */}
          <span className="relative inline-block">
            <span className="relative z-10">About</span>
            {!prefersReduced && (
              <motion.span
                aria-hidden
                className="absolute inset-0 z-20 bg-background rounded-[2px]"
                initial={{ x: 0, opacity: 1 }}
                whileInView={{ x: "105%", opacity: 0.95 }}
                transition={{ duration: 1.6, ease: EASE, delay: baseDelay + WIPE_DELAY }}
                viewport={{ once: true, amount }}
                style={{ willChange: "transform, opacity" }}
              />
            )}
          </span>

          {/* Underline draw — synced with the wipe */}
          {prefersReduced ? (
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
            />
          ) : (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: UNDERLINE_DUR, ease: [0.22, 1, 0.36, 1], delay: baseDelay + UNDERLINE_DELAY }}
              viewport={{ once: true, amount }}
              style={{ transformOrigin: "left", willChange: "transform" }}
            />
          )}
        </span>
      </span>
    </h2>
  )
}

export function About() {
  const isMobile = useIsMobile()

  // Shift the whole section earlier on mobile (no change to choreography/order)
  const SECTION_BASE = ABOUT_BASE_DELAY - (isMobile ? 1.8 : 0)

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

  // Cards now begin noticeably sooner on desktop; on mobile they track SECTION_BASE
  const CARD_BASE = SECTION_BASE - (isMobile ? 0 : DESKTOP_ADVANCE_SEC)

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
            baseDelay={CARD_BASE + (isMobile ? -MOBILE_ADVANCE_SEC : 0)}
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
