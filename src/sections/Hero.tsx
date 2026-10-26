import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  SiDocker, SiGithub, SiGithubactions, SiGradle, SiGraphql, SiKubernetes, SiNextdotjs, SiOpenjdk,
  SiPostgresql, SiPython, SiReact, SiRedis, SiSpringboot, SiTailwindcss, SiTypescript, SiVite,
} from "@icons-pack/react-simple-icons"
import { useRef, useEffect, type ComponentType } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { SectionBackdrop } from "@/components/SectionBackdrop"
import heroSmall from "@/assets/photos/hero-fattruck-1200.webp"
import heroLarge from "@/assets/photos/hero-fattruck-2400.webp"

type BrandIcon = ComponentType<{ className?: string; color?: string; role?: string; "aria-label"?: string }>
// brand: draw in the logo's own colour; near-black logos follow the text colour so they show in dark mode
type Tool = { name: string; Icon: BrandIcon; brand: boolean }

const tools: Tool[] = [
  { name: "React", Icon: SiReact, brand: true },
  { name: "Vite", Icon: SiVite, brand: true },
  { name: "TypeScript", Icon: SiTypescript, brand: true },
  { name: "Tailwind CSS", Icon: SiTailwindcss, brand: true },
  { name: "Java", Icon: SiOpenjdk, brand: false },
  { name: "Spring Boot", Icon: SiSpringboot, brand: true },
  { name: "Python", Icon: SiPython, brand: true },
  { name: "PostgreSQL", Icon: SiPostgresql, brand: true },
  { name: "Redis", Icon: SiRedis, brand: true },
  { name: "Docker", Icon: SiDocker, brand: true },
  { name: "Next.js", Icon: SiNextdotjs, brand: false },
  { name: "Kubernetes", Icon: SiKubernetes, brand: true },
  { name: "GitHub", Icon: SiGithub, brand: false },
  { name: "GitHub Actions", Icon: SiGithubactions, brand: true },
  { name: "Gradle", Icon: SiGradle, brand: false },
  { name: "GraphQL", Icon: SiGraphql, brand: true },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(".hero-word, .hero-para, .hero-para-bold, .hero-cta, .hero-tools", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      })
      return
    }

    const master = gsap.timeline({ delay: 0.2 })

    master.fromTo(
      ".hero-word",
      {
        opacity: 0,
        y: 40,
        rotationX: -90,
        filter: "blur(8px)",
        transformOrigin: "50% 50% -20px"
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      }
    )

    master.addLabel("para", "-=0.6")
    master.fromTo(
      ".hero-para",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
      "para"
    )


    // The icon box arrives once and then stays still, so it doesn't compete with the headline
    master.fromTo(
      ".hero-tools",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "opacity,transform" },
      "-=0.5"
    )

    // The bold phrase lands a beat after the rest of the sentence, and each button arrives with
    // the line it pairs with: the first with the sentence, the second with the bold phrase
    master.fromTo(
      ".hero-para-bold",
      { opacity: 0, filter: "blur(4px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
      "para+=0.6"
    )
    const ctaFrom = { opacity: 0, y: 20, filter: "blur(4px)" }
    const ctaTo = { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out", clearProps: "opacity,transform,filter" }
    master.fromTo(".hero-cta-1", ctaFrom, ctaTo, "para")
    master.fromTo(".hero-cta-2", ctaFrom, ctaTo, "para+=0.6")
  }, { scope: sectionRef })

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctaButtons = document.querySelectorAll(".hero-cta")

    const cleanups = Array.from(ctaButtons, (btn) => {
      const handleEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      const handleLeave = () => {
        gsap.to(btn, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)"
        })
      }

      btn.addEventListener("mouseenter", handleEnter)
      btn.addEventListener("mouseleave", handleLeave)
      return () => {
        btn.removeEventListener("mouseenter", handleEnter)
        btn.removeEventListener("mouseleave", handleLeave)
      }
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative isolate perspective-[1000px] min-h-[100vh] flex items-center overflow-hidden">
      <SectionBackdrop small={heroSmall} large={heroLarge} position="object-[center_60%]" priority fadeTop={false} />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mt-0 font-semibold leading-tight tracking-tight preserve-3d"
            >
              <span className="inline-flex flex-wrap items-baseline gap-x-2 md:gap-x-3">
                {["Design.", "Build.", "Ship."].map((word) => (
                  <span
                    key={word}
                    className="hero-word inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero-para mt-4 text-lg text-muted-foreground max-w-prose">
              Modern web apps and platforms{" "}
              <span className="hero-para-bold inline-block text-foreground font-semibold">
                with enterprise-proven infrastructure
              </span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="hero-cta hero-cta-1 will-change-transform transition-[color,background-color,border-color,box-shadow]">
                <a href="#contact">Get in touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hero-cta hero-cta-2 will-change-transform transition-[color,background-color,border-color,box-shadow]">
                <a href="#projects">See my work</a>
              </Button>
            </div>

          </div>

          <div className="md:order-last">
            <TooltipProvider>
              <div
                className="hero-tools rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-sm p-5 md:p-6 shadow-xl"
              >
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {tools.map((t) => (
                    <Tooltip key={t.name}>
                      <TooltipTrigger asChild>
                        <div
                          className="grid place-items-center rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm transition-colors duration-150 hover:border-primary/40 hover:bg-background sm:p-4"
                        >
                          <div>
                            <t.Icon
                              className="h-7 w-7 sm:h-9 sm:w-9"
                              color={t.brand ? "default" : "currentColor"}
                              role="img"
                              aria-label={t.name}
                            />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="font-medium">
                        {t.name}
                      </TooltipContent>
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
