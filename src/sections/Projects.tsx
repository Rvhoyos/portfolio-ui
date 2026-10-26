import { useRef, type ComponentType, type MouseEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { ExternalLink, PlaneTakeoff, SquareTerminal, type LucideIcon } from "lucide-react"
import { SiGithub, SiModrinth } from "@icons-pack/react-simple-icons"
import { cn } from "@/lib/utils"
import quackedSmpDuck from "@/assets/projects/quackedsmp-duck.svg"
import quackedModDucks from "@/assets/projects/quackedmod-ducks.webp"
import quackedModWiki from "@/assets/projects/quackedmod-wiki.svg"
import msecohaulLogo from "@/assets/projects/msecohaul.svg"
import dr0neliaLogo from "@/assets/projects/dr0nelia.svg"
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

type Visual =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "logo"; src: string; invertInDark?: boolean; pixelated?: boolean }
  | { kind: "icon"; Icon: LucideIcon }
  | { kind: "mark" }

type ProjectLink = { label: "GitHub" | "Modrinth" | "Live"; href: string }

type Project = {
  title: string
  desc: string
  visual: Visual
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    title: "QuackedSMP",
    desc: "Server-side Minecraft mod for Fabric and NeoForge: claims, skills, anti-grief, shops and hardcore mode, with an optional browser panel for config, backups and players. Nothing to install on the client.",
    visual: { kind: "logo", src: quackedSmpDuck, pixelated: true },
    links: [
      { label: "GitHub", href: "https://github.com/Rvhoyos/QuackedSMP" },
      { label: "Modrinth", href: "https://modrinth.com/mod/quackedsmp" },
    ],
  },
  {
    title: "QuackedMod",
    desc: "Ducky Quack Pack: ducks for Minecraft on Fabric and NeoForge. Flocks follow a leader, can be tamed with seeds, and fly off to new ground.",
    visual: { kind: "photo", src: quackedModDucks, alt: "A flock of yellow Minecraft ducks swimming near a sandy shore" },
    links: [
      { label: "GitHub", href: "https://github.com/Rvhoyos/QuackedMod" },
      { label: "Modrinth", href: "https://modrinth.com/mod/ducky-quack-pack" },
    ],
  },
  {
    title: "QuackedVPS",
    desc: "A Go command-line tool that sets up a modded Minecraft server and its web layer (panel, live map, HTTPS, firewall) on a fresh Ubuntu or Debian VPS.",
    visual: { kind: "icon", Icon: SquareTerminal },
    links: [{ label: "GitHub", href: "https://github.com/Rvhoyos/quackvps" }],
  },
  {
    title: "QuackedMod Wiki",
    desc: "Website for the mod and server: wiki pages for the ducks, items, recipes and commands, plus a page for the QuackedSMP server with its live status.",
    visual: { kind: "logo", src: quackedModWiki },
    links: [{ label: "Live", href: "https://quackedmod.wiki" }],
  },
  {
    title: "Portfolio UI",
    desc: "This site. React, TypeScript and Tailwind with GSAP animation, served by nginx and deployed to staging and production by GitHub Actions.",
    visual: { kind: "mark" },
    links: [{ label: "GitHub", href: "https://github.com/Rvhoyos/portfolio-ui" }],
  },
  {
    title: "Smiths Falls Airport Simulation",
    desc: "A SimPy discrete-event simulation of passenger flow through a small regional airport, used to find bottlenecks and test how staffing affects wait times, throughput and revenue.",
    visual: { kind: "icon", Icon: PlaneTakeoff },
    links: [{ label: "GitHub", href: "https://github.com/Rvhoyos/A-DES-model-of-Airport-Passenger-Flow" }],
  },
  {
    title: "MSEcoHaul",
    desc: "Website for an Ottawa waste management company connecting clients with certified recycling partners.",
    visual: { kind: "logo", src: msecohaulLogo },
    links: [{ label: "Live", href: "https://www.msecohaul.ca" }],
  },
  {
    title: "Dr0nelia",
    desc: "Landing page for a drone services company, with a drone that flies between the page sections in sync with scrolling.",
    visual: { kind: "logo", src: dr0neliaLogo, invertInDark: true },
    links: [{ label: "Live", href: "https://dr0nelia.ca" }],
  },
]

const linkIcons: Record<ProjectLink["label"], ComponentType<{ className?: string }>> = {
  GitHub: SiGithub,
  Modrinth: SiModrinth,
  Live: ExternalLink,
}

// This site's own favicon, drawn in the theme's colours
function PortfolioMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      <rect x="8" y="8" width="48" height="48" rx="12" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="20" cy="20" r="6" className="fill-primary" />
    </svg>
  )
}

function ProjectVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "photo") {
    return <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
  }
  return (
    <div className="relative h-full w-full">
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
      <div className="relative grid h-full w-full place-items-center text-foreground/85">
        {visual.kind === "icon" && <visual.Icon className="h-12 w-12" aria-hidden />}
        {visual.kind === "mark" && <PortfolioMark />}
        {visual.kind === "logo" && (
          <img
            src={visual.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              "h-16 w-16 object-contain",
              visual.invertInDark && "dark:invert",
              visual.pixelated && "[image-rendering:pixelated]",
            )}
          />
        )}
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

        <CardContent className="relative z-20 pb-0">
          <AspectRatio ratio={16 / 7} className="overflow-hidden rounded-md border border-border/40">
            <ProjectVisual visual={p.visual} />
          </AspectRatio>
        </CardContent>

        <CardHeader className="relative z-20">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base leading-snug">{p.title}</CardTitle>
            <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
              {p.links.map((link) => {
                const Icon = linkIcons[link.label]
                return (
                  <Button key={link.label} asChild size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                      {link.label}
                      <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
          <CardDescription className="mt-2 text-sm leading-relaxed">{p.desc}</CardDescription>
        </CardHeader>
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
        </div>
      </div>
    </section>
  )
}
