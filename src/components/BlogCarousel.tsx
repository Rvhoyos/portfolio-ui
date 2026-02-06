import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface BlogCarouselProps {
    posts: any[]
    onPostClick: (post: any) => void
}

export function BlogCarousel({ posts, onPostClick }: BlogCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback((api: any) => {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    if (posts.length === 0) {
        return (
            <div className="w-full h-64 border border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
                No posts found.
            </div>
        )
    }

    return (
        <div className="relative group">
            <div className="overflow-hidden p-1" ref={emblaRef}>
                <div className="flex gap-6">
                    {posts.map((post) => (
                        <div className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0" key={post.slug}>
                            <div
                                onClick={() => onPostClick(post)}
                                className="h-full group/card cursor-pointer"
                            >
                                <Card className="h-full border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                                    <CardContent className="p-6 md:p-8 flex flex-col h-full z-10">
                                        <Badge variant="secondary" className="w-fit mb-4 text-[10px] tracking-wider font-mono">
                                            {new Date(post.publishedAt).getFullYear()}
                                        </Badge>

                                        <div className="space-y-3 mb-6">
                                            <h3 className="text-xl md:text-2xl font-semibold leading-tight group-hover/card:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <CalendarDays className="h-3 w-3" />
                                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-muted-foreground text-sm line-clamp-3">
                                                {post.summary}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300">
                                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </CardContent>

                                    {/* Decorative Gradient Blob */}
                                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover/card:bg-primary/10 transition-colors duration-500" />
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" size="icon" disabled={!canScrollPrev} onClick={scrollPrev} className="rounded-full">
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    <span className="sr-only">Previous slide</span>
                </Button>
                <Button variant="outline" size="icon" disabled={!canScrollNext} onClick={scrollNext} className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next slide</span>
                </Button>
            </div>
        </div>
    )
}
