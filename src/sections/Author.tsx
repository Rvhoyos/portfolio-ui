import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PenLine, Calendar, Clock, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Blog entries - empty for now, add real entries here when ready
export interface BlogEntry {
    id: string
    title: string
    excerpt: string
    date: string
    readTime: string
    tags: string[]
    content: string
}

const blogEntries: BlogEntry[] = [
    // Add entries like this when you have real content:
    // {
    //   id: "1",
    //   title: "Article Title",
    //   excerpt: "Short description...",
    //   date: "Feb 2026",
    //   readTime: "8 min read",
    //   tags: ["Tag1", "Tag2"],
    //   content: "Full article content...",
    // },
]

export function Author() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const modalContentRef = useRef<HTMLDivElement>(null)
    const [selectedEntry, setSelectedEntry] = useState<BlogEntry | null>(null)

    // Section entrance animation
    useGSAP(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) {
            gsap.set(".author-avatar, .author-content, .interest-item, .blog-entry, .blog-empty", {
                opacity: 1, y: 0, scale: 1
            })
            return
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
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

        // Phase 3: Author card 3D flip
        tl.fromTo(
            ".author-card",
            { opacity: 0, y: 40, rotationX: -15, scale: 0.95, transformOrigin: "50% 0%" },
            { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.7, ease: "power3.out" },
            "-=0.4"
        )

        // Phase 4: Blog card 3D flip (staggered)
        tl.fromTo(
            ".blog-card",
            { opacity: 0, y: 40, rotationX: -15, scale: 0.95, transformOrigin: "50% 0%" },
            { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.7, ease: "power3.out" },
            "-=0.5"
        )

        // Phase 5: Interest items cascade
        tl.fromTo(
            ".interest-item",
            { y: 15, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" },
            "-=0.4"
        )

        // Phase 6: Blog entries or empty state
        if (blogEntries.length > 0) {
            tl.fromTo(
                ".blog-entry",
                { y: 30, opacity: 0, scale: 0.9, rotationX: -10 },
                { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                "-=0.2"
            )
        } else {
            tl.fromTo(
                ".blog-empty",
                { y: 20, opacity: 0, filter: "blur(4px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
                "-=0.2"
            )
        }
    }, { scope: sectionRef })

    // Blog card hover effects
    useGSAP(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced || blogEntries.length === 0) return

        const entries = document.querySelectorAll(".blog-entry")
        entries.forEach((entry) => {
            const arrow = entry.querySelector(".blog-arrow")

            const onEnter = () => {
                gsap.to(entry, {
                    y: -6,
                    scale: 1.02,
                    boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.2)",
                    borderColor: "hsl(var(--primary) / 0.4)",
                    duration: 0.35,
                    ease: "power2.out"
                })
                if (arrow) {
                    gsap.to(arrow, { x: 4, scale: 1.2, duration: 0.3, ease: "power2.out" })
                }
            }

            const onLeave = () => {
                gsap.to(entry, {
                    y: 0,
                    scale: 1,
                    boxShadow: "none",
                    borderColor: "hsl(var(--border) / 0.6)",
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)"
                })
                if (arrow) {
                    gsap.to(arrow, { x: 0, scale: 1, duration: 0.25, ease: "power2.out" })
                }
            }

            entry.addEventListener("mouseenter", onEnter)
            entry.addEventListener("mouseleave", onLeave)
        })
    }, { scope: sectionRef })

    // Modal open/close
    const openModal = (entry: BlogEntry) => setSelectedEntry(entry)

    const closeModal = () => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        if (prefersReduced) {
            setSelectedEntry(null)
            return
        }

        const tl = gsap.timeline({ onComplete: () => setSelectedEntry(null) })
        tl.to(modalContentRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.25, ease: "power2.in" })
        tl.to(modalRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, "-=0.1")
    }

    // Modal open animation
    useEffect(() => {
        if (!selectedEntry || !modalRef.current || !modalContentRef.current) return

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return

        gsap.set(modalRef.current, { opacity: 0 })
        gsap.set(modalContentRef.current, { scale: 0.85, opacity: 0, y: 30 })

        const tl = gsap.timeline()
        tl.to(modalRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
        tl.to(modalContentRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.15")
        tl.fromTo(".modal-element", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.2")
    }, [selectedEntry])

    // Close on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedEntry) closeModal()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [selectedEntry])

    return (
        <>
            <section ref={sectionRef} id="author" className="border-t border-border">
                <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">

                    {/* Author intro + Blog side by side on desktop */}
                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* Author Card */}
                        <Card className="author-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm overflow-hidden h-full will-change-transform" style={{ perspective: "1000px" }}>
                            <CardContent className="p-6 md:p-8 h-full flex flex-col">
                                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start flex-1">
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
                                            Software and Electronics enthusiast with a passion for all things that compute.
                                            This obsession began as a child with my first gaming console, a Nintendo 64.
                                            The itch continues today as I develop enterprise applications and experiment with new technologies.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Blog Card */}
                        <Card className="blog-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm overflow-hidden h-full will-change-transform" style={{ perspective: "1000px" }}>
                            <CardContent className="p-6 md:p-8 h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <PenLine className="h-5 w-5 text-primary" aria-hidden />
                                    </div>
                                    <h3 className="text-xl font-semibold">Blog</h3>
                                </div>

                                {/* Content */}
                                {blogEntries.length > 0 ? (
                                    <div className="flex-1 space-y-3 overflow-y-auto">
                                        {blogEntries.map((entry) => (
                                            <div
                                                key={entry.id}
                                                className="blog-entry p-4 rounded-lg border border-border/40 bg-background/50 cursor-pointer transition-all hover:border-primary/30"
                                                onClick={() => openModal(entry)}
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {entry.tags.map((tag) => (
                                                            <span key={tag} className="text-xs bg-primary/10 text-primary/80 px-2 py-0.5 rounded-full">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <ArrowRight className="blog-arrow h-4 w-4 text-muted-foreground/50 flex-shrink-0" aria-hidden />
                                                </div>
                                                <h4 className="font-medium text-sm mb-1">{entry.title}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2">{entry.excerpt}</p>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground/60 mt-2">
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" aria-hidden />
                                                        {entry.date}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock className="h-3 w-3" aria-hidden />
                                                        {entry.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="blog-empty flex-1 flex flex-col items-center justify-center text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                                            <PenLine className="h-8 w-8 text-muted-foreground/40" aria-hidden />
                                        </div>
                                        <p className="text-muted-foreground mb-2">No posts yet</p>
                                        <p className="text-sm text-muted-foreground/60">Check back soon for articles on software architecture and DevOps.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Blog Modal */}
            {selectedEntry && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={(e) => e.target === modalRef.current && closeModal()}
                >
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

                    <div
                        ref={modalContentRef}
                        className="relative w-full max-w-2xl max-h-[80vh] bg-background border border-border/60 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="modal-element sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/40 p-6 pb-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {selectedEntry.tags.map((tag) => (
                                            <span key={tag} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">{selectedEntry.title}</h2>
                                </div>
                                <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full" onClick={closeModal}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="modal-element flex items-center gap-4 text-sm text-muted-foreground mt-3">
                                <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" aria-hidden />
                                    {selectedEntry.date}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" aria-hidden />
                                    {selectedEntry.readTime}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                            <p className="modal-element text-lg text-muted-foreground leading-relaxed mb-6">{selectedEntry.excerpt}</p>
                            <div className="modal-element prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-muted-foreground whitespace-pre-wrap">{selectedEntry.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
