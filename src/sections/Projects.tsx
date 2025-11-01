import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const projects = [
  { title: "Portfolio API", desc: "Spring Boot 3 + PostgreSQL + Flyway. CI/CD to VPS via Caddy.", img: "https://via.placeholder.com/1200x675?text=API", tech: ["Spring", "PostgreSQL", "Docker"] },
  { title: "Portfolio Web", desc: "React + Vite + Tailwind + shadcn/ui. Static deploy via nginx.", img: "https://via.placeholder.com/1200x675?text=Web", tech: ["React", "Vite", "Tailwind"] },
  { title: "QuackedMod", desc: "Minecraft modding: Architectury + GeckoLib. Server + client.", img: "https://via.placeholder.com/1200x675?text=Mod", tech: ["Java", "Architectury", "GeckoLib"] },
]

export function Projects() {
  return (
    <section id="projects" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <div className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-muted-foreground">Recent work and experiments.</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TooltipProvider>
              {projects.map((p) => (
                <Card
                  key={p.title}
                  className="overflow-hidden border-border/60 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                    <CardDescription>{p.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                      <img src={p.img} alt={p.title} className="h-full w-full rounded-md object-cover" />
                    </AspectRatio>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Tooltip key={t}>
                          <TooltipTrigger asChild><Badge variant="secondary">{t}</Badge></TooltipTrigger>
                          <TooltipContent>{t}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  )
}
