import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SiGradle } from "@icons-pack/react-simple-icons"
import { useRef, useEffect, type SVGProps, type ComponentType } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Tool = { name: string; src?: string; Icon?: ComponentType<SVGProps<SVGSVGElement>> }

const tools: Tool[] = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GitHub Actions", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
  { name: "Gradle", Icon: SiGradle },
  { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
]

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const iconsContainerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  // Master timeline for orchestrated entrance
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      // Show everything immediately for reduced motion
      gsap.set(".hero-word, .hero-para, .hero-cta, .hero-badge, .tool-icon-wrapper", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)"
      })
      return
    }

    const master = gsap.timeline({ delay: 0.2 })

    // Phase 1: Headline words - Split text animation with stagger and blur
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

    // Phase 2: Paragraph - Smooth fade with slight movement
    master.fromTo(
      ".hero-para",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )

    // Phase 3: CTAs - Elastic entrance with stagger
    master.fromTo(
      ".hero-cta",
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)"
      },
      "-=0.4"
    )

    // Phase 4: Badge - Pop in
    master.fromTo(
      ".hero-badge",
      { opacity: 0, scale: 0.5, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" },
      "-=0.3"
    )

    // Phase 5: Tech icons - Cascade in with 3D rotation
    master.fromTo(
      ".tool-icon-wrapper",
      {
        opacity: 0,
        scale: 0.6,
        y: 30,
        rotationY: -45
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.6,
        stagger: {
          each: 0.04,
          from: "start",
          grid: "auto",
          ease: "power2.out"
        },
        ease: "back.out(1.4)"
      },
      "-=0.5"
    )

  }, { scope: sectionRef })

  // Floating & Magnetic icons animation (persistent)
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const wrappers = gsap.utils.toArray<HTMLElement>(".tool-icon-wrapper")

    wrappers.forEach((wrapper, i) => {
      // Delayed start for floating (after entrance)
      const floatAnim = gsap.to(wrapper, {
        y: -6,
        duration: 2.5 + Math.random() * 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5 + i * 0.08,
      })

      const inner = wrapper.querySelector(".tool-icon-inner") as HTMLElement
      if (!inner) return

      // Magnetic pull effect
      const xTo = gsap.quickTo(inner, "x", { duration: 0.4, ease: "power3.out" })
      const yTo = gsap.quickTo(inner, "y", { duration: 0.4, ease: "power3.out" })
      const scaleTo = gsap.quickTo(inner, "scale", { duration: 0.3, ease: "power2.out" })
      const rotationTo = gsap.quickTo(inner, "rotation", { duration: 0.4, ease: "power2.out" })

      const handleMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = e.clientX - centerX
        const y = e.clientY - centerY

        // Magnetic pull + slight tilt based on mouse position
        xTo(x * 0.5)
        yTo(y * 0.5)
        rotationTo(x * 0.1)
      }

      const handleMouseEnter = () => {
        floatAnim.pause()
        scaleTo(1.15)
        gsap.to(wrapper, {
          boxShadow: "0 8px 30px -8px hsl(var(--primary) / 0.3)",
          borderColor: "hsl(var(--primary) / 0.4)",
          duration: 0.3,
        })
      }

      const handleMouseLeave = () => {
        // Elastic snap-back
        gsap.to(inner, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)"
        })
        scaleTo(1)
        gsap.to(wrapper, {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          borderColor: "hsl(var(--border) / 0.6)",
          duration: 0.3,
        })
        floatAnim.play()
      }

      wrapper.addEventListener("mousemove", handleMouseMove)
      wrapper.addEventListener("mouseenter", handleMouseEnter)
      wrapper.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        wrapper.removeEventListener("mousemove", handleMouseMove)
        wrapper.removeEventListener("mouseenter", handleMouseEnter)
        wrapper.removeEventListener("mouseleave", handleMouseLeave)
      }
    })
  }, { scope: iconsContainerRef })

  // CTA button hover effects
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctaButtons = document.querySelectorAll(".hero-cta")

    ctaButtons.forEach((btn) => {
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
    })
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="perspective-[1000px] min-h-[100vh] flex items-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left: copy */}
          <div>
            {/* Headline with 3D flip-in words */}
            <h1
              ref={headlineRef}
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

            {/* Paragraph */}
            <p className="hero-para mt-4 text-lg text-muted-foreground max-w-prose">
              Modern web apps and platforms with{" "}
              <span className="text-foreground font-semibold">
                enterprise-proven infrastructure
              </span>.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="hero-cta will-change-transform">
                <a href="https://clients.raulhoyos.com" target="_blank" rel="noreferrer">Start a project</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hero-cta will-change-transform">
                <a href="#contact">Get in touch</a>
              </Button>
            </div>

          </div>

          {/* Right: Tech stack grid with magnetic hover */}
          <div className="md:order-last">
            <TooltipProvider>
              <div
                ref={iconsContainerRef}
                className="rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-sm p-5 md:p-6 shadow-xl"
              >
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {tools.map((t) => (
                    <Tooltip key={t.name}>
                      <TooltipTrigger asChild>
                        <div
                          className="tool-icon-wrapper group grid place-items-center rounded-xl border border-border/60 bg-background/80 p-3 sm:p-4 shadow-sm transition-colors cursor-pointer will-change-transform"
                          aria-label={t.name}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="tool-icon-inner relative z-10 will-change-transform">
                            {t.Icon ? (
                              <t.Icon className="h-7 w-7 sm:h-9 sm:w-9 opacity-85" aria-hidden />
                            ) : (
                              <img
                                src={t.src!}
                                alt={t.name}
                                className="h-7 w-7 sm:h-9 sm:w-9 opacity-85"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            )}
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
