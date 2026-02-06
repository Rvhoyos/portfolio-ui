import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Author() {
    const cardRef = useRef<HTMLDivElement>(null)

    // Card entrance animation
    useGSAP(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) {
            gsap.set(".author-avatar, .author-content", {
                opacity: 1, y: 0, scale: 1
            })
            return
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 75%",
                once: true,
            },
        })

        // Phase 1: Avatar with elastic scale
        tl.fromTo(
            ".author-avatar",
            { scale: 0.5, opacity: 0, rotationY: -30 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.9, ease: "back.out(1.7)" }
        )

        // Phase 2: Author content with clip-path reveal
        tl.fromTo(
            ".author-content",
            { y: 30, opacity: 0, clipPath: "inset(0 100% 0 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" },
            "-=0.5"
        )
    }, { scope: cardRef })

    return (
        <Card ref={cardRef} className="author-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm overflow-hidden h-full will-change-transform" style={{ perspective: "1000px" }}>
            <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {/* Avatar */}
                    <div className="author-avatar flex-shrink-0 relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
                        <img
                            src="/images/headshot.png"
                            alt="Raul Hoyos"
                            className="w-full h-full object-cover object-[center_75%] scale-150"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    </div>

                    {/* Content */}
                    <div className="author-content text-center sm:text-left">
                        <h2 className="text-2xl font-semibold tracking-tight mb-3">
                            <span className="inline-flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                                </span>
                                <span className="relative inline-block">
                                    Hey, I'm Raul
                                    <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0" />
                                </span>
                            </span>
                        </h2>

                        <p className="text-muted-foreground leading-relaxed">
                            Software and Electronics enthusiast
                            <br />
                            with a passion for all things that compute.
                            <br />
                            This obsession began with my first gaming console, a Nintendo 64.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                            The itch continues today as I develop
                            <br />
                            and experiment with new technologies.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
