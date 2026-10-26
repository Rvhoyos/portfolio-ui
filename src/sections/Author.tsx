import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap, useGSAP } from "@/lib/gsap"
import headshot from "@/assets/photos/headshot.webp"

const facts = [
    { label: "Role", value: "Software developer and geophysics technician" },
    { label: "Education", value: "B.Eng in Software Engineering" },
    { label: "Focus", value: "Building towards hardware" },
    { label: "Based in", value: "Ontario, often in remote northern and eastern Canada" },
]

export function Author() {
    const cardRef = useRef<HTMLDivElement>(null)

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

        tl.fromTo(
            ".author-avatar",
            { scale: 0.5, opacity: 0, rotationY: -30 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.9, ease: "back.out(1.7)" }
        )

        tl.fromTo(
            ".author-content",
            { y: 30, opacity: 0, clipPath: "inset(0 100% 0 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" },
            "-=0.5"
        )
    }, { scope: cardRef })

    return (
        <Card id="author" ref={cardRef} className="author-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm overflow-hidden h-full will-change-transform scroll-mt-28" style={{ perspective: "1000px" }}>
            <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="author-avatar relative mx-auto w-36 shrink-0 overflow-hidden rounded-2xl ring-1 ring-primary/30 sm:mx-0">
                        <img
                            src={headshot}
                            alt="Raul Hoyos standing on a city street at dusk"
                            width={269}
                            height={439}
                            className="h-auto w-full object-cover"
                        />
                    </div>

                    <div className="author-content min-w-0">
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
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

                        <dl className="space-y-2.5">
                            {facts.map((fact) => (
                                <div key={fact.label}>
                                    <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                                    <dd className="text-sm text-foreground/90">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="author-content mt-6 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                        I've been hooked on all things that compute since my first gaming console, a Nintendo 64.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        These days I travel for field surveys, troubleshooting specialized EM equipment, and I still
                        develop web apps and open source projects in my free time.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
