import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Entrance animation
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(".about-heading, .about-para", {
        opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)"
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      }
    })

    // Phase 1: Heading with clip-path wipe
    tl.fromTo(
      ".about-heading",
      { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" }
    )

    // Phase 2: Paragraphs stagger with blur
    tl.fromTo(
      ".about-para",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out"
      },
      "-=0.6"
    )

  }, { scope: containerRef })

  return (
    <div id="about" ref={containerRef} className="h-full flex flex-col justify-center scroll-mt-28">
      {/* Heading */}
      <h2 className="about-heading text-2xl md:text-3xl font-semibold tracking-tight">
        <span className="inline-flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
          <span className="relative inline-block">
            About
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
            />
          </span>
        </span>
      </h2>

      {/* Paragraphs with emphasis highlights */}
      <div className="mt-5 space-y-3">
        <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
          I build <strong className="text-foreground">reliable</strong> and simple to run web solutions.
        </p>
        <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
          Every project ships with automated deployments and <strong className="text-foreground">observable</strong> systems.
        </p>
        <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
          <strong className="text-foreground">Scalable software</strong> when you need it.
        </p>
      </div>
    </div>
  )
}

