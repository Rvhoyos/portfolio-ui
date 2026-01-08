import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, useReducedMotion } from "framer-motion"
import { SiGradle } from "@icons-pack/react-simple-icons"
import { useRef, type SVGProps, type ComponentType } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

type Tool = { name: string; src?: string; Icon?: ComponentType<SVGProps<SVGSVGElement>> }

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

  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },

  { name: "Kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },

  // DevEx
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GitHub Actions", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
  { name: "Gradle", Icon: SiGradle },

  // APIs / Schema
  { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
]

export function Hero() {
  const prefersReduced = useReducedMotion()
  const iconsContainerRef = useRef<HTMLDivElement>(null)

  // Animation timings
  const WORDS = ["Design.", "Build.", "Ship."]
  const WORD_DUR = 0.9
  const WORD_GAP = 0.05
  const HEADLINE_START = 0.1
  const headlineEnd = HEADLINE_START + WORDS.length * (WORD_DUR + WORD_GAP)

  // Paragraph parts: bold appears first, then the non-bold lead
  const PARA_BOLD_DELAY = headlineEnd + 0.2
  const PARA_LEAD_DELAY = PARA_BOLD_DELAY + 0.45
  const EASE = [0.22, 1, 0.36, 1] as const

  // Floating & Magnetic icons animation
  useGSAP(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isReduced) return

    const wrappers = gsap.utils.toArray<HTMLElement>(".tool-icon-wrapper")

    wrappers.forEach((wrapper, i) => {
      // 1. Floating Animation (on wrapper)
      const randomDelay = i * 0.12
      const floatAnim = gsap.to(wrapper, {
        y: -6,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: randomDelay,
      })

      const inner = wrapper.querySelector(".tool-icon-inner") as HTMLElement
      if (!inner) return

      // 2. Magnetic Interaction (on inner)
      const xTo = gsap.quickTo(inner, "x", { duration: 0.4, ease: "power3.out" })
      const yTo = gsap.quickTo(inner, "y", { duration: 0.4, ease: "power3.out" })

      const handleMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate distance from center
        const x = e.clientX - centerX
        const y = e.clientY - centerY

        // Move inner element towards mouse (magnetic pull)
        // Factor 0.3 means it moves 30% of the distance to the mouse
        xTo(x * 0.6)
        yTo(y * 0.6)
      }

      const handleMouseLeave = () => {
        // Snap back elastically
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        })
        floatAnim.play()
      }

      const handleMouseEnter = () => {
        floatAnim.pause()
      }

      wrapper.addEventListener("mousemove", handleMouseMove)
      wrapper.addEventListener("mouseenter", handleMouseEnter)
      wrapper.addEventListener("mouseleave", handleMouseLeave)

      // Cleanup (optional but good practice in React, though scope handles most GSAP)
      return () => {
        wrapper.removeEventListener("mousemove", handleMouseMove)
        wrapper.removeEventListener("mouseenter", handleMouseEnter)
        wrapper.removeEventListener("mouseleave", handleMouseLeave)
      }
    })
  }, { scope: iconsContainerRef })

  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left: copy */}
          <div>
            {/* Headline: word-by-word fade-in */}
            <h1 className="text-4xl md:text-5xl mt-0 font-semibold leading-tight tracking-tight">
              {prefersReduced ? (
                <span>Design. Build. Ship.</span>
              ) : (
                <span className="inline-flex flex-wrap items-baseline gap-x-2 md:gap-x-3">
                  {WORDS.map((w, i) => (
                    <motion.span
                      key={w}
                      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: WORD_DUR,
                        ease: EASE,
                        delay: HEADLINE_START + i * (WORD_DUR + WORD_GAP),
                      }}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
              )}
            </h1>

            {/* Paragraph: bold part fades in first, then the lead */}
            <p className="mt-3 text-muted-foreground max-w-prose">
              {prefersReduced ? (
                <>
                  Modern web apps and platforms with{" "}
                  <span className="text-foreground font-semibold">enterprise-proven infrastructure</span>.
                </>
              ) : (
                <>
                  {/* Lead (appears second) */}
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: PARA_LEAD_DELAY }}
                  >
                    Modern web apps and platforms with{" "}
                  </motion.span>

                  {/* Bold tail (appears first) */}
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: PARA_BOLD_DELAY }}
                    className="text-foreground font-semibold"
                  >
                    enterprise-proven infrastructure.
                  </motion.span>
                </>
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><a href="#contact">Start a project</a></Button>
              <Button asChild variant="outline"><a href="#services">View services</a></Button>
            </div>

            <div className="mt-6 inline-flex">
              <Badge variant="secondary" className="rounded-full">Consulting &amp; Engineering</Badge>
            </div>
          </div>

          {/* Right: logo wall (low-interaction, animated) */}
          <div className="md:order-last">
            <TooltipProvider>
              <div ref={iconsContainerRef} className="rounded-xl border border-border bg-muted/50 p-5 shadow-sm">
                {/* quilted responsive grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-5">
                  {tools.map((t) => (
                    <Tooltip key={t.name}>
                      <TooltipTrigger asChild>
                        <div
                          className="tool-icon-wrapper group grid place-items-center rounded-lg border border-border/60 bg-background p-3 sm:p-4 shadow-sm transition-transform cursor-pointer"
                          aria-label={t.name}
                        >
                          <div className="tool-icon-inner relative z-10 will-change-transform">
                            {t.Icon ? (
                              <t.Icon className="h-8 w-8 sm:h-10 sm:w-10 opacity-90" aria-hidden />
                            ) : (
                              <img
                                src={t.src!}
                                alt={t.name}
                                className="h-8 w-8 sm:h-10 sm:w-10 opacity-90 transition-opacity group-hover:opacity-100"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>
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
