import { useRef, useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export interface ParallaxAssetProps {
    children: ReactNode
    /** Unique ID for ScrollTrigger */
    id: string
    /** Position from top in viewport units (e.g., "10vh") */
    top?: string
    /** Position from left in viewport units (e.g., "5vw") */
    left?: string
    /** Position from right in viewport units (e.g., "5vw") */
    right?: string
    /** Base size of the asset */
    size?: string
    /** Speed multiplier for parallax (higher = moves more) */
    speed?: number
    /** Whether the innermost layer should rotate */
    rotate?: boolean
    /** Opacity of the asset */
    opacity?: number
    /** Z-index of the asset */
    zIndex?: number
}

/**
 * Wrapper component for parallax SVG assets.
 * Animates the entire asset on scroll with configurable speed and rotation.
 */
export function ParallaxAsset({
    children,
    id,
    top,
    left,
    right,
    size = "80px",
    speed = 0.3,
    rotate = false,
    opacity = 0.6,
    zIndex = 0,
}: ParallaxAssetProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced || !containerRef.current) return

        // Create scroll-linked animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Smooth scrubbing
            },
        })

        // Parallax Y movement (entire asset)
        tl.to(containerRef.current, {
            y: () => window.innerHeight * speed,
            ease: "none",
        }, 0)

        // Optional rotation
        if (rotate) {
            gsap.to(containerRef.current.querySelector(".parallax-inner"), {
                rotation: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                },
            })
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === document.body) {
                    // Only kill triggers we created
                }
            })
        }
    }, [speed, rotate, id])

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed will-change-transform"
            style={{
                top,
                left,
                right,
                width: size,
                height: size,
                opacity,
                zIndex,
            }}
        >
            <div className="parallax-inner w-full h-full">
                {children}
            </div>
        </div>
    )
}

/**
 * Container for all parallax assets, positioned behind content.
 */
export function ParallaxContainer({ children }: { children: ReactNode }) {
    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: -1 }}
            aria-hidden="true"
        >
            {children}
        </div>
    )
}
