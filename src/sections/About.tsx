import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { SectionHeading } from "@/components/SectionHeading"

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

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

    tl.fromTo(
      ".about-heading",
      { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" }
    )

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
      <SectionHeading className="about-heading">About</SectionHeading>

      <div className="mt-5 space-y-3">
        <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
          I build <strong className="text-foreground">user-friendly</strong> web apps that are simple to run.
        </p>
        <p className="about-para text-base md:text-lg text-muted-foreground/90 leading-relaxed">
          <strong className="text-foreground">One day</strong> I'd like to build software for devices that interact
          with the real world, like the EM survey equipment I work with in the field.
        </p>
      </div>
    </div>
  )
}

