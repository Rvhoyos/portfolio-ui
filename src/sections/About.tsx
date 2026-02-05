import { useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, GitBranch, RefreshCw, Activity, ShieldCheck, Zap } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

  // Master timeline for orchestrated entrance
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(".about-heading, .about-para, .about-card, .about-item", {
        opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0% 0 0)"
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      }
    })

    // Phase 1: Heading with clip-path wipe
    tl.fromTo(
      ".about-heading",
      { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" }
    )

    // Phase 2: Paragraphs stagger with blur
    tl.fromTo(
      ".about-para",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out"
      },
      "-=0.6"
    )

    // Phase 3: Cards flip in with 3D effect
    tl.fromTo(
      ".about-card",
      {
        opacity: 0,
        y: 40,
        rotationX: -10,
        scale: 0.95,
        transformOrigin: "50% 0%"
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.3"
    )

    // Phase 4: Card items cascade
    tl.fromTo(
      ".about-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out"
      },
      "-=0.4"
    )

  }, { scope: sectionRef })

  // Card hover effects
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const cards = document.querySelectorAll(".about-card")

    cards.forEach((card) => {
      const onEnter = () => {
        gsap.to(card, {
          y: -4,
          scale: 1.02,
          boxShadow: "0 16px 40px -12px hsl(var(--primary) / 0.15)",
          borderColor: "hsl(var(--primary) / 0.3)",
          duration: 0.35,
          ease: "power2.out"
        })
      }
      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "none",
          borderColor: "hsl(var(--border) / 0.6)",
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        })
      }

      card.addEventListener("mouseenter", onEnter)
      card.addEventListener("mouseleave", onLeave)
    })
  }, { scope: sectionRef })

  // Item hover effects
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const items = document.querySelectorAll(".about-item")

    items.forEach((item) => {
      const icon = item.querySelector(".about-icon")

      const onEnter = () => {
        gsap.to(item, {
          x: 6,
          backgroundColor: "hsl(var(--primary) / 0.05)",
          duration: 0.3,
          ease: "power2.out"
        })
        if (icon) {
          gsap.to(icon, {
            scale: 1.3,
            rotation: 10,
            color: "hsl(var(--primary))",
            duration: 0.35,
            ease: "back.out(2)"
          })
        }
      }

      const onLeave = () => {
        gsap.to(item, {
          x: 0,
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out"
        })
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            color: "currentColor",
            duration: 0.25,
            ease: "power2.out"
          })
        }
      }

      item.addEventListener("mouseenter", onEnter)
      item.addEventListener("mouseleave", onLeave)
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="about" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        {/* Heading */}
        <h2 className="about-heading text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="inline-flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="relative inline-block">
              About
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
              />
            </span>
          </span>
        </h2>

        {/* Paragraphs with emphasis highlights */}
        <div className="mt-5 max-w-3xl space-y-3">
          <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
            I build <strong className="text-foreground">reliable</strong> and simple to run web solutions.
          </p>
          <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
            Every project ships with automated deployments and <strong className="text-foreground">observable</strong> systems.
          </p>
          <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
            <strong className="text-foreground">Scalable software</strong> when you need it.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2" style={{ perspective: "1000px" }}>
          {/* Focus Card */}
          <Card className="about-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm overflow-hidden will-change-transform">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <CardTitle className="text-lg">Focus</CardTitle>
                </div>
                <Badge variant="secondary" className="rounded-full px-3">Delivery</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5 space-y-3">
              {focus.map(({ label, desc, Icon }) => (
                <div
                  key={label}
                  className="about-item flex items-start gap-3 p-2 -mx-2 rounded-lg transition-colors cursor-default"
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-primary/5">
                    <Icon className="about-icon h-4 w-4 opacity-70 transition-all" aria-hidden />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground/90">{label}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Principles Card */}
          <Card className="about-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm overflow-hidden will-change-transform">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <CardTitle className="text-lg">Principles</CardTitle>
                </div>
                <Badge variant="secondary" className="rounded-full px-3">Guardrails</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-5 space-y-3">
              {principles.map(({ label, desc, Icon }) => (
                <div
                  key={label}
                  className="about-item flex items-start gap-3 p-2 -mx-2 rounded-lg transition-colors cursor-default"
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-primary/5">
                    <Icon className="about-icon h-4 w-4 opacity-70 transition-all" aria-hidden />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground/90">{label}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
