import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Project = {
  title: string
  desc: string
  img?: string
  links?: {
    github?: string
    live?: string
  }
}

const projects: Project[] = [
  {
    title: "Portfolio API",
    desc:
      "Spring Boot 3 (Java 25) service that powers the site. PostgreSQL with Flyway migrations.",
    img: "https://via.placeholder.com/1200x675?text=API",
    links: { github: "https://github.com/rvhoyos/portfolio-api" },
  },
  {
    title: "Portfolio UI",
    desc:
      "React + Vite + Tailwind + shadcn/ui. Client rendered SPA Served via nginx/Caddy, simple App Shell, and fast CI promotions to staging and production.",
    img: "https://via.placeholder.com/1200x675?text=Web",
    // adjust if your repo name differs (e.g., portfolio-web)
    links: { github: "https://github.com/rvhoyos/portfolio-ui" },
  },
  {
    title: "QuackedMod",
    desc:
      "Cross-platform Minecraft mod using Architectury + GeckoLib 5 with a custom Duck entity and bespoke animations. Public releases on major modding platforms (~400 downloads to date).",
    img: "https://via.placeholder.com/1200x675?text=Mod",
    links: { github: "https://github.com/rvhoyos/QuackedMod" },
  },
  {
    title: "Smith Falls Airport — Passenger Flow Simulator",
    desc:
      "Discrete-event simulation built in Python (SimPy) to evaluate airport operating policies. Uses queuing models and random variate generation for realistic arrivals and service times, with scenario-based performance analysis and visual reporting.",
    // no image provided — card will show a consistent skeleton
    links: { github: "https://github.com/Rvhoyos/A-DES-model-of-Airport-Passenger-Flow" },
  },
]

function ProjectCard({ p }: { p: Project }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const showRealImage = !!p.img && !imgError

  return (
    <Card className="overflow-hidden border-border/60 shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-base">{p.title}</CardTitle>
          </div>

          {/* Link buttons (render only if provided) */}
          <div className="flex shrink-0 items-center gap-1.5">
            {p.links?.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild size="sm" variant="outline" className="h-8">
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
                  <Button asChild size="sm" variant="ghost" className="h-8">
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

        <CardDescription className="mt-1 text-sm">{p.desc}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Media: always render a neutral Skeleton on sm+; show image when it loads, else keep the Skeleton */}
        <AspectRatio ratio={16 / 9} className="hidden sm:block rounded-md bg-transparent">
          {showRealImage ? (
            <>
              {!imgLoaded && (
                <Skeleton
                  className="h-full w-full rounded-md animate-pulse bg-muted-foreground/20"
                  aria-hidden
                />
              )}
              <img
                src={p.img}
                alt={p.title}
                className={`h-full w-full rounded-md object-cover ${imgLoaded ? "block" : "hidden"}`}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            </>
          ) : (
            <Skeleton className="h-full w-full rounded-md animate-pulse bg-muted-foreground/20" aria-hidden />
          )}
        </AspectRatio>
      </CardContent>
    </Card>
  )
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-10 md:pt-16 md:pb-12">
        <div className="rounded-2xl border border-border bg-muted/40 px-6 md:px-8 pt-6 pb-4 md:pt-8 md:pb-6">
          {/* Section heading with dot + subtle underline */}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
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
          <p className="mt-2 text-muted-foreground">Recent work and experiments.</p>

          <div className="mt-6">
            <TooltipProvider>
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                  {projects.map((p) => (
                    <CarouselItem key={p.title} className="basis-full md:basis-1/2 lg:basis-1/3">
                      <ProjectCard p={p} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="mt-2 flex items-center justify-end gap-2">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  )
}
