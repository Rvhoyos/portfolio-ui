import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PenLine, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Blog() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return

        gsap.fromTo(
            ".blog-content",
            { y: 24, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            }
        )
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} id="blog" className="border-t border-border">
            <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                    <span className="inline-flex items-center gap-2">
                        <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
                        <span className="relative inline-block">
                            Blog
                            <span
                                aria-hidden
                                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
                            />
                        </span>
                    </span>
                </h2>

                <Card className="blog-content border-border/70 bg-muted/40">
                    <CardContent className="p-8 md:p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <PenLine className="h-8 w-8 text-primary/70" aria-hidden />
                        </div>

                        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                            I'm working on articles about software architecture, DevOps practices,
                            and lessons learned from building production systems. Stay tuned!
                        </p>

                        <Button variant="outline" disabled className="gap-2">
                            <Bell className="h-4 w-4" aria-hidden />
                            Notify Me (coming soon)
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
