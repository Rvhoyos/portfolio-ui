import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export function Hero() {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: copy */}
          <div>
            
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              I build clean, reliable software.
            </h1>
            <p className="mt-3 text-muted-foreground max-w-prose">
              Backend services in Spring Boot, SPAs in React, and Dockerized deploys behind Caddy/nginx.
              This portfolio highlights my stack, services, and selected projects.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><a href="#projects">View projects</a></Button>
              <Button asChild variant="outline"><a href="#services">What I offer</a></Button>
            </div>
          </div>

          {/* Right: visual placeholder */}
          <div className="md:order-last">
            <AspectRatio ratio={16 / 9} className="rounded-xl bg-muted">
              <div className="h-full w-full grid place-items-center text-sm text-muted-foreground">
                Add a screenshot or graphic here
              </div>
              <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Full-stack</Badge>
              <Badge variant="secondary">Java / Spring</Badge>
              <Badge variant="secondary">React + Vite</Badge>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  )
}
