import { useRef, type MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ExternalLink, LayoutDashboard, Gamepad2, ChartLine, Fan, Leaf, type LucideIcon } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SectionHeading } from "@/components/SectionHeading"
import { SectionBackdrop } from "@/components/SectionBackdrop"
import bgSmall from "@/assets/photos/bg-lake-1200.webp"
import bgLarge from "@/assets/photos/bg-lake-2400.webp"
import { useReveal } from "@/lib/useReveal"

type Project = {
  title: string
  desc: string
  icon: LucideIcon
  links?: { github?: string; live?: string }
}

const projects: Project[] = [
  {
    title: "Portfolio UI",
    icon: LayoutDashboard,
    desc:
      "React + Vite + Tailwind + shadcn/ui. Client rendered SPA served via nginx/Caddy, Cloudflare Worker for form handling, and fast CI promotions to staging and production.",
    links: { github: "https://github.com/rvhoyos/portfolio-ui" },
  },
  {
    title: "QuackedMod",
    icon: Gamepad2,
    desc:
      "Cross-platform Minecraft mod using a standard multi-loader setup with Gradle + GeckoLib 5 with a custom Duck entity and bespoke animations. Public releases on major modding platforms (~400 downloads to date).",
    links: { github: "https://github.com/rvhoyos/QuackedMod" },
  },
  {
    title: "Smith Falls Airport Passenger Flow Simulator",
    icon: ChartLine,
    desc:
      "Discrete-event simulation built in Python (SimPy) to evaluate airport operating policies. Uses queuing models and random variate generation for realistic arrivals and service times, with scenario-based performance analysis and visual reporting.",
    links: { github: "https://github.com/Rvhoyos/A-DES-model-of-Airport-Passenger-Flow" },
  },
  {
    title: "MSEcoHaul",
    icon: Leaf,
    desc:
      "Client rendered SPA using Vite+React. Specialized form handling via Google Sheets API and Cloudflare Worker integration.",
    links: { live: "https://www.msecohaul.ca" },
  },
  {
    title: "Dr0nelia",
    icon: Fan,
    desc:
      "Client rendered SPA using Vite+React. Specialized form handling via Google API and Cloudflare Worker integration. Custom drone aesthetic and animations.",
    links: { live: "https://dr0nelia.ca" },
  },
]

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.12]
                   bg-[conic-gradient(from_120deg,var(--primary)_0%,transparent_35%,transparent_65%,var(--primary)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40
                   bg-[radial-gradient(color-mix(in_oklch,var(--foreground)_8%,transparent)_1px,transparent_1px)] [background-size:16px_16px]"
      />
      <div className="relative z-10 grid h-full w-full place-items-center">
        <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-foreground/85 transition-transform duration-300 group-hover:scale-[1.02]" />
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
      <Card className="group relative h-full overflow-hidden border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(800px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.06), transparent 40%)"
          }}
        />

        <div
          aria-hidden
          className="h-px w-full origin-right bg-gradient-to-r from-primary/60 via-primary/35 to-transparent
                     transition-transform duration-300 motion-safe:group-hover:scale-x-0"
        />

        <div aria-hidden className="pointer-events-none absolute inset-[1px] z-[1] rounded-lg">
          <span
            className="absolute right-0 top-0 h-px w-0 rounded-full bg-primary/60
                       transition-[width] duration-[700ms] delay-[220ms]
                       motion-safe:group-hover:w-full"
          />
          <span
            className="absolute right-0 top-0 h-0 w-px rounded-full bg-primary/60
                       transition-[height] duration-[700ms] delay-[420ms]
                       motion-safe:group-hover:h-full"
          />
          <span
            className="absolute right-0 bottom-0 h-px w-0 rounded-full bg-primary/60
                       transition-[width] duration-[700ms] delay-[620ms]
                       motion-safe:group-hover:w-full"
          />
          <span
            className="absolute left-0 bottom-0 h-0 w-px rounded-full bg-primary/60
                       transition-[height] duration-[700ms] delay-[820ms]
                       motion-safe:group-hover:h-full"
          />
        </div>

        <CardHeader className="pb-2 relative z-20">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle className="min-h-10 text-sm leading-5">{p.title}</CardTitle>
            </div>

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
          <AspectRatio ratio={16 / 7} className="rounded-md bg-transparent overflow-hidden">
            <IconTile icon={p.icon} />
          </AspectRatio>
        </CardContent>
      </Card>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id="projects" className="relative isolate overflow-hidden border-t border-border scroll-mt-28">
      <SectionBackdrop small={bgSmall} large={bgLarge} position="object-[center_55%]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10">
        <div data-reveal>
          <SectionHeading>Projects</SectionHeading>
          <p className="mt-3 text-base text-muted-foreground">Recent work and experiments.</p>
        </div>

        <div className="mt-6">
          <TooltipProvider>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {projects.map((p) => (
                  <CarouselItem key={p.title} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                    <div data-reveal className="h-full">
                      <ProjectCard p={p} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-3 flex items-center justify-between gap-2">
                <a
                  href="https://github.com/rvhoyos?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground underline decoration-dotted underline-offset-4 hover:text-foreground"
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
