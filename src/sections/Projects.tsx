import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Portfolio API",
    desc: "Spring Boot 3 + PostgreSQL + Flyway. CI/CD to VPS via Caddy.",
    img: "https://via.placeholder.com/1200x675?text=API",
    tech: ["Spring", "PostgreSQL", "Docker"],
  },
  {
    title: "Portfolio Web",
    desc: "React + Vite + Tailwind + shadcn/ui. Static deploy via nginx.",
    img: "https://via.placeholder.com/1200x675?text=Web",
    tech: ["React", "Vite", "Tailwind"],
  },
  {
    title: "QuackedMod",
    desc: "Minecraft modding: Architectury + GeckoLib. Server + client.",
    img: "https://via.placeholder.com/1200x675?text=Mod",
    tech: ["Java", "Architectury", "GeckoLib"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="text-xl font-medium">Projects</h2>
      <p className="mt-2 text-muted-foreground">Recent work and experiments.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TooltipProvider>
          {projects.map((p) => (
            <Card key={p.title} className="overflow-hidden">
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
                      <TooltipTrigger asChild>
                        <Badge variant="secondary">{t}</Badge>
                      </TooltipTrigger>
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
    </section>
  )
}
