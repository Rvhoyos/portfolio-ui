import { useRef, type ReactNode, type MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ExternalLink, Server, LayoutDashboard, Gamepad2, LineChart, Fan, Leaf } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Project = {
  title: string
  desc: string
  links?: { github?: string; live?: string }
}

const projects: Project[] = [
  {
    title: "Portfolio API",
    desc: "Spring Boot 3 (Java 25) service that powers the site. PostgreSQL with Flyway migrations.",
    links: { github: "https://github.com/rvhoyos/portfolio-api" },
  },
  {
    title: "Portfolio UI",
    desc:
      "React + Vite + Tailwind + shadcn/ui. Client rendered SPA Served via nginx/Caddy, simple App Shell, and fast CI promotions to staging and production.",
    links: { github: "https://github.com/rvhoyos/portfolio-ui" },
  },
  {
    title: "QuackedMod",
    desc:
      "Cross-platform Minecraft mod using Architectury + GeckoLib 5 with a custom Duck entity and bespoke animations. Public releases on major modding platforms (~400 downloads to date).",
    links: { github: "https://github.com/rvhoyos/QuackedMod" },
  },
  {
    title: "Smith Falls Airport Passenger Flow Simulator",
    desc:
      "Discrete-event simulation built in Python (SimPy) to evaluate airport operating policies. Uses queuing models and random variate generation for realistic arrivals and service times, with scenario-based performance analysis and visual reporting.",
    links: { github: "https://github.com/Rvhoyos/A-DES-model-of-Airport-Passenger-Flow" },
  },
  {
    title: "MSEcoHaul",
    desc:
      "Client rendered SPA using Vite+React. Specialized form handling via Google Sheets API and Cloudflare Worker integration.",
    links: { live: "https://www.msecohaul.ca" },
  },
  {
    title: "Dr0nelia",
    desc:
      "Client rendered SPA using Vite+React. Specialized form handling via Google API and Cloudflare Worker integration. Custom drone aesthetic and animations.",
    links: { live: "https://dr0nelia.ca" },
  },
]

/* ---------- helpers ---------- */
function pickIcon(title: string) {
  if (/portfolio api/i.test(title)) return Server
  if (/portfolio ui/i.test(title)) return LayoutDashboard
  if (/quackedmod/i.test(title)) return Gamepad2
  if (/smith\s*falls|simulator|flow/i.test(title)) return LineChart
  if (/dr0nelia/i.test(title)) return Fan
  if (/msecohaul/i.test(title)) return Leaf
  return LayoutDashboard
}

function monogram(title: string) {
  if (/portfolio api/i.test(title)) return "API"
  if (/portfolio ui/i.test(title)) return "UI"
  if (/quackedmod/i.test(title)) return "QM"
  if (/smith\s*falls|simulator|flow/i.test(title)) return "SFA"
  if (/dr0nelia/i.test(title)) return "DR0"
  if (/msecohaul/i.test(title)) return "MSE"
  return "APP"
}

/* ---------- minimal, layout-safe reveal ---------- */
function Reveal({
  children,
  y = 12,
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
        { opacity: 0, y, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          ease: "power3.out",
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

/* ---------- icon tile (replaces images) ---------- */
function IconTile({ title }: { title: string }) {
  const Icon = pickIcon(title)
  const tag = monogram(title)
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      {/* soft conic gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.12]
                   bg-[conic-gradient(from_120deg,theme(colors.primary.DEFAULT)_0%,transparent_35%,transparent_65%,theme(colors.primary.DEFAULT)_100%)]"
      />
      {/* faint dotted grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40
                   bg-[radial-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:16px_16px]"
      />
      {/* content */}
      <div className="relative z-10 grid h-full w-full place-items-center">
        <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-foreground/85 transition-transform duration-300 group-hover:scale-[1.02]" />
        <span
          className="absolute left-2 top-2 rounded-md border border-border/60 bg-background/70 px-1.5 py-0.5
                     text-[10px] font-medium tracking-wide text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/50"
        >
          {tag}
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ p }: { p: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty("--x", `${x}px`)
    cardRef.current.style.setProperty("--y", `${y}px`)
  }

  return (
    <div
      className="project-card-wrapper h-full"
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      <Card className="group relative h-full overflow-hidden border-border/60 shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md">
        {/* Spotlight Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(800px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.06), transparent 40%)"
          }}
        />

        {/* 1px top accent that WIPES to the right on hover */}
        <div
          aria-hidden
          className="h-px w-full origin-right bg-gradient-to-r from-primary/60 via-primary/35 to-transparent
                     transition-transform duration-300 motion-safe:group-hover:scale-x-0"
        />

        {/* CLOCKWISE BORDER DRAW (top-right start) pure CSS */}
        <div aria-hidden className="pointer-events-none absolute inset-[1px] z-[1] rounded-lg">
          {/* top edge (right -> left) */}
          <span
            className="absolute right-0 top-0 h-px w-0 rounded-full bg-primary/60
                       transition-[width] duration-[700ms] delay-[220ms]
                       motion-safe:group-hover:w-full"
          />
          {/* right edge (top -> bottom) */}
          <span
            className="absolute right-0 top-0 h-0 w-px rounded-full bg-primary/60
                       transition-[height] duration-[700ms] delay-[420ms]
                       motion-safe:group-hover:h-full"
          />
          {/* bottom edge (right -> left) */}
          <span
            className="absolute right-0 bottom-0 h-px w-0 rounded-full bg-primary/60
                       transition-[width] duration-[700ms] delay-[620ms]
                       motion-safe:group-hover:w-full"
          />
          {/* left edge (bottom -> top) */}
          <span
            className="absolute left-0 bottom-0 h-0 w-px rounded-full bg-primary/60
                       transition-[height] duration-[700ms] delay-[820ms]
                       motion-safe:group-hover:h-full"
          />
        </div>

        <CardHeader className="pb-2 relative z-20">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle className="text-sm">{p.title}</CardTitle>
            </div>

            {/* Link buttons (render only if provided) */}
            <div className="flex shrink-0 items-center gap-1.5">
              {p.links?.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild size="sm" variant="outline" className="h-6 text-xs px-2">
                      <a href={p.links.github} target="_blank" rel="noreferrer">
                        <SiGithub className="mr-1.5 h-3.5 w-3.5" />
                        GitHub
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
              )}
              {p.links?.live && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild size="sm" variant="ghost" className="h-6 text-xs px-2">
                      <a href={p.links.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Live demo</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <CardDescription className="mt-1 text-xs line-clamp-2">{p.desc}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 relative z-20">
          {/* Icon placeholder — now visible on ALL breakpoints for parity */}
          <AspectRatio ratio={16 / 7} className="rounded-md bg-transparent overflow-hidden">
            <IconTile title={p.title} />
          </AspectRatio>
        </CardContent>
      </Card>
    </div>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    gsap.fromTo(
      ".project-card-wrapper",
      {
        opacity: 0,
        y: 40,
        scale: 0.92,
        rotationX: -12,
        transformOrigin: "50% 0%"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="projects" className="border-t border-border scroll-mt-28">
      <div ref={containerRef} className="relative mx-auto w-full max-w-7xl px-4 pt-4 pb-4 md:pt-6 md:pb-6">
        {/* background polish: faint dots + two blurred glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-20 h-56 w-56 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 blur-3xl" />
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <Reveal>
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="relative inline-block">
                Projects
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
                />
              </span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-1 text-sm text-muted-foreground">Recent work and experiments.</p>
        </Reveal>

        <div className="mt-3 [perspective:1200px]">
          <TooltipProvider>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {projects.map((p) => (
                  <CarouselItem key={p.title} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                    <ProjectCard p={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-2 flex items-center justify-between gap-2">
                <a
                  href="https://github.com/rvhoyos?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground underline decoration-dotted underline-offset-4"
                >
                  View all on GitHub
                </a>
                <div className="flex items-center gap-2">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>
            </Carousel>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}
