import { type ReactNode, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MessageSquare, ShoppingBag } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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

type WorkPath = {
  title: string
  description: string
  icon: typeof MessageSquare
}

const workPaths: WorkPath[] = [
  {
    title: "Consultations & Proposals",
    description:
      "Book a consultation to discuss your project. We'll define scope together and I'll send a proposal with milestones and pricing.",
    icon: MessageSquare,
  },
  {
    title: "Shop Catalog",
    description:
      "Browse productized offerings on the Client Dashboard. Pick something from the catalog for faster turnaround on common deliverables.",
    icon: ShoppingBag,
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
            <span className="relative inline-block">
              How I Work
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
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Two ways to start a project</CardTitle>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  Reach out for custom work or browse the catalog for productized services.
                </p>
              </CardHeader>

              <CardContent className="grid gap-4 sm:grid-cols-2">
                {workPaths.map((path) => (
                  <div
                    key={path.title}
                    className="group rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-border hover:bg-background/80"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <path.icon className="h-4 w-4 text-primary" aria-hidden />
                      </div>
                      <h3 className="text-sm font-semibold">{path.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                ))}
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