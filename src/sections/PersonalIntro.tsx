import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Snowflake, Dumbbell, Cpu } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const interests = [
    { icon: Snowflake, label: "Snowboarding" },
    { icon: Dumbbell, label: "Working Out" },
    { icon: Cpu, label: "Hardware & Software" },
]

export function PersonalIntro() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const avatarRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
            },
        })

        // Avatar scales in
        tl.fromTo(
            avatarRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
        )

        // Content fades up
        tl.fromTo(
            contentRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
        )

        // Interests stagger in
        tl.fromTo(
            ".interest-item",
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
        )
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} id="personal" className="border-t border-border">
            <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
                <Card className="border-border/70 bg-muted/40 overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-8 items-center">
                            {/* Placeholder Avatar */}
                            <div
                                ref={avatarRef}
                                className="mx-auto md:mx-0 relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center ring-4 ring-primary/20 ring-offset-2 ring-offset-background"
                            >
                                {/* Placeholder initials or icon - swap with real headshot later */}
                                <span className="text-4xl md:text-5xl font-bold text-primary/60">RH</span>
                                {/* Subtle animated ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
                            </div>

                            {/* Content */}
                            <div ref={contentRef}>
                                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                                    <span className="inline-flex items-center gap-2">
                                        <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
                                        <span className="relative inline-block">
                                            Hey, I'm Raul
                                            <span
                                                aria-hidden
                                                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
                                            />
                                        </span>
                                    </span>
                                </h2>

                                <p className="text-muted-foreground leading-relaxed max-w-xl mb-4">
                                    When I'm not building software, you'll find me on the slopes or at the gym.
                                    I'm passionate about everything from low-level hardware to high-level systems architecture—and
                                    all the interesting problems in between.
                                </p>

                                {/* Interest badges */}
                                <div className="flex flex-wrap gap-3">
                                    {interests.map(({ icon: Icon, label }) => (
                                        <div
                                            key={label}
                                            className="interest-item inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-muted-foreground"
                                        >
                                            <Icon className="h-4 w-4 text-primary/70" aria-hidden />
                                            <span>{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
