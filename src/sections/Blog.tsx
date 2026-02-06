import { useRef, useState, useEffect } from "react"
import { getAllPosts } from "@/lib/blog"
import { BlogCarousel } from "@/components/BlogCarousel"
import { BlogReader } from "@/components/BlogReader"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Blog() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [posts, setPosts] = useState<any[]>([])
    const [selectedPost, setSelectedPost] = useState<any | null>(null)

    useEffect(() => {
        getAllPosts().then(setPosts)
    }, [])

    useGSAP(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReduced) return

        gsap.fromTo(
            ".blog-header",
            { y: 24, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            }
        )

        gsap.fromTo(
            ".blog-carousel-container",
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            }
        )
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} id="blog" className="border-t border-border overflow-hidden">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 blog-header">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            <span className="inline-flex items-center gap-2">
                                <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
                                <span className="relative inline-block">
                                    Blog
                                    <span
                                        aria-hidden
                                        className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-gradient-to-r from-primary to-primary/0"
                                    />
                                </span>
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="blog-carousel-container">
                    <BlogCarousel posts={posts} onPostClick={setSelectedPost} />
                </div>

                <BlogReader
                    post={selectedPost}
                    isOpen={!!selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            </div>
        </section>
    )
}
