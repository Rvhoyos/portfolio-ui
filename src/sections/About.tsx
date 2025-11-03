import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, GitBranch, RefreshCw, Activity, ShieldCheck } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"

/* ---------- Shared reveal for cards/paragraphs ---------- */
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

/* ---------- Heading: wipe + underline draw (dot is STATIC to avoid flicker) ---------- */
function AboutHeading() {
  const prefersReduced = useReducedMotion()
  const vp = { once: true, amount: 0.6 as const }

  return (
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
      <span className="inline-flex items-center gap-2">
        {/* Dot: static (no animation) */}
        <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />

        {/* Text: wipe reveal underline: draw from left */}
        <span className="relative inline-block">
          {prefersReduced ? (
            <span>About</span>
          ) : (
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              viewport={vp}
              className="inline-block"
            >
              About
            </motion.span>
          )}

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
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              style={{ transformOrigin: "left" }}
              viewport={vp}
            />
          )}
        </span>
      </span>
    </h2>
  )
}

export function About() {
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

  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        {/* Heading with wipe + underline draw (dot static) */}
        <AboutHeading />

        {/* Paragraphs with the same Reveal animation (slight stagger) */}
        <div className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground/90 space-y-1.5">
          <Reveal y={12} delay={0.0}>
            <p className="leading-relaxed">
              <strong> I build reliable</strong>, and simple to run web solutions.
            </p>
          </Reveal>
          <Reveal y={12} delay={0.08}>
            <p className="leading-relaxed">
              Every project ships with automated deployments <strong>and observable</strong> systems.
            </p>
          </Reveal>
          <Reveal y={12} delay={0.16}>
            <p className="leading-relaxed">
              <strong>Scalable </strong> <strong>software</strong> when you need it.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Focus */}
          <Reveal>
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
          <Reveal>
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
