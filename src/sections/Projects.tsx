import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  img: string
  tech: string[]
  highlights: string[]
}

const projects: Project[] = [
  {
    title: "Portfolio API",
    desc:
      "Spring Boot 3 (Java 25) service that powers the site. PostgreSQL with Flyway migrations, versioned REST endpoints, and request-scoped structured logs. Built on a self-hosted GitHub Actions runner and promoted from staging to production behind Caddy with zero-downtime rolling updates gated by /livez and /readyz.",
    img: "https://via.placeholder.com/1200x675?text=API",
    tech: ["Spring Boot 3", "Java 25", "PostgreSQL", "Flyway", "JPA/Hibernate", "Docker", "Caddy", "GitHub Actions"],
    highlights: ["Zero-downtime rolling deploys", "OpenAPI schema", "Request IDs & structured logs"],
  },
  {
    title: "Portfolio UI",
    desc:
      "React + Vite + Tailwind + shadcn/ui. Prebuilt static site with clean OG/SEO metadata and consent-aware analytics. Served via nginx/Caddy, simple App Shell, and fast CI promotions to staging and production.",
    img: "https://via.placeholder.com/1200x675?text=Web",
    tech: ["React", "Vite", "Tailwind", "shadcn/ui", "nginx", "Caddy"],
    highlights: ["Edge-cacheable static build", "SEO & social metadata", "Fast CI rollouts"],
  },
  {
    title: "QuackedMod",
    desc:
      "Cross-platform Minecraft mod using Architectury + GeckoLib 5 with a custom Duck entity and bespoke animations. Automated Gradle builds and version management; public releases on major modding platforms (~300 downloads to date).",
    img: "https://via.placeholder.com/1200x675?text=Mod",
    tech: ["Java", "Architectury", "GeckoLib 5", "Fabric", "NeoForge", "Gradle", "Docker", "Caddy", "n8n"],
    highlights: ["Automated builds & releases", "Ubuntu VPS (Docker + Caddy)", "Custom entity & animations"],
  },
  {
    title: "Smith Falls Airport — Passenger Flow Simulator",
    desc:
      "Discrete-event simulation built in Python (SimPy) to evaluate airport operating policies. Uses queuing models and random variate generation for realistic arrivals and service times, with scenario-based performance analysis and visual reporting. Data handling in Pandas/NumPy; charts via Matplotlib.",
    img: "https://via.placeholder.com/1200x675?text=Simulator",
    tech: ["Python", "SimPy", "Pandas", "NumPy", "Matplotlib"],
    highlights: ["Scenario analysis", "Random-variate arrivals/services", "Queue metrics (wait, throughput)"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <div className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-muted-foreground">Recent work and experiments.</p>

          <div className="mt-6">
            <TooltipProvider>
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                  {projects.map((p) => (
                    <CarouselItem key={p.title} className="basis-full">
                      <Card className="overflow-hidden border-border/60 shadow-sm transition-shadow hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="text-base">{p.title}</CardTitle>
                          <CardDescription>{p.desc}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                            <img src={p.img} alt={p.title} className="h-full w-full rounded-md object-cover" />
                          </AspectRatio>

                          {/* tech chips */}
                          <div className="flex flex-wrap gap-2">
                            {p.tech.map((t) => (
                              <Tooltip key={t}>
                                <TooltipTrigger asChild>
                                  <Badge variant="secondary">{t}</Badge>
                                </TooltipTrigger>
                                <TooltipContent>{t}</TooltipContent>
                              </Tooltip>
                            ))}
                          </div>

                          {/* highlights */}
                          <div className="flex flex-wrap gap-2">
                            {p.highlights.map((h) => (
                              <Badge key={h} variant="outline">
                                {h}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="mt-4 flex items-center justify-end gap-2">
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
