import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Tool = { name: string; src: string }

const tools: Tool[] = [
  // Frontend
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },

  // Backend
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },

  // Data / Infra
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "nginx", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },

  // DevEx
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GitHub Actions", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
  { name: "Gradle", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-plain.svg" },

  // APIs / Schema
  { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
]

export function Hero() {
  return (
    <section id="hero">
      {/* local keyframes for gentle float */}
      <style>{`
        @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex">
              <Badge variant="secondary" className="rounded-full">Consulting &amp; Engineering</Badge>
            </div>

            <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Design. Build. Ship.
            </h1>

            <p className="mt-3 text-muted-foreground max-w-prose">
              Modern web apps and platforms with <span className="text-foreground">enterprise-proven infrastructure</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><a href="#contact">Start a project</a></Button>
              <Button asChild variant="outline"><a href="#services">View services</a></Button>
            </div>
          </div>

          {/* Right: logo wall (low-interaction, animated) */}
          <div className="md:order-last">
            <TooltipProvider>
              <div className="rounded-xl border border-border bg-muted/50 p-5 shadow-sm">
                {/* quilted responsive grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-5">
                  {tools.map((t, i) => (
                    <Tooltip key={t.name}>
                      <TooltipTrigger asChild>
                        <div
                          className="group grid place-items-center rounded-lg border border-border/60 bg-background p-3 sm:p-4 shadow-sm transition-transform"
                          style={{ animation: `floaty 6s ease-in-out ${i * 0.12}s infinite` }}
                          aria-label={t.name}
                        >
                          <img
                            src={t.src}
                            alt={t.name}
                            className="h-8 w-8 sm:h-10 sm:w-10 opacity-90 transition-opacity group-hover:opacity-100"
                            loading="lazy"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{t.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  )
}
