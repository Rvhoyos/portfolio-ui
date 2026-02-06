import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Interactive gradient orb background that shifts with scroll position.
 * Positioned behind all content with fixed positioning.
 */
export function InteractiveBackground() {
    const containerRef = useRef<HTMLDivElement>(null)
    const orb1Ref = useRef<HTMLDivElement>(null)
    const orb2Ref = useRef<HTMLDivElement>(null)
    const orb3Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return

        // Orb 1: Primary color, top-left, moves down-right on scroll
        gsap.to(orb1Ref.current, {
            x: "10vw",
            y: "30vh",
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
            },
        })

        // Orb 2: Secondary position, moves up-left on scroll
        gsap.to(orb2Ref.current, {
            x: "-15vw",
            y: "-20vh",
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 3,
            },
        })

        // Orb 3: Center-ish, gentle drift
        gsap.to(orb3Ref.current, {
            x: "5vw",
            y: "15vh",
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 4,
            },
        })
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: -10 }}
            aria-hidden="true"
        >
            {/* Orb 1: Top-left, primary glow */}
            <div
                ref={orb1Ref}
                className="absolute rounded-full blur-[100px] will-change-transform"
                style={{
                    top: "5%",
                    left: "5%",
                    width: "40vw",
                    height: "40vw",
                    maxWidth: "600px",
                    maxHeight: "600px",
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                }}
            />

            {/* Orb 2: Bottom-right, softer glow */}
            <div
                ref={orb2Ref}
                className="absolute rounded-full blur-[120px] will-change-transform"
                style={{
                    bottom: "10%",
                    right: "0%",
                    width: "50vw",
                    height: "50vw",
                    maxWidth: "700px",
                    maxHeight: "700px",
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
                }}
            />

            {/* Orb 3: Center accent */}
            <div
                ref={orb3Ref}
                className="absolute rounded-full blur-[80px] will-change-transform"
                style={{
                    top: "40%",
                    left: "30%",
                    width: "30vw",
                    height: "30vw",
                    maxWidth: "400px",
                    maxHeight: "400px",
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
                }}
            />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    )
}
