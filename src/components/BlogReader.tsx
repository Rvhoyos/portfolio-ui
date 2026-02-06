import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, User } from "lucide-react"

interface BlogReaderProps {
    post: any | null
    isOpen: boolean
    onClose: () => void
}

export function BlogReader({ post, isOpen, onClose }: BlogReaderProps) {
    if (!post) return null

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-[95vw] !max-w-7xl h-[85vh] bg-background/95 backdrop-blur-md border-border p-0 gap-0 overflow-hidden flex flex-col md:flex-row shadow-2xl">

                {/* Sidebar / Header Info */}
                <div className="md:w-[350px] lg:w-[400px] shrink-0 bg-muted/30 p-8 md:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-start">
                    <div className="mb-6">
                        <Badge variant="outline" className="mb-4 text-xs font-mono uppercase tracking-widest text-primary/80 border-primary/20">
                            Blog Post
                        </Badge>
                        <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-foreground leading-tight">
                            {post.title}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm leading-relaxed mb-6">
                            {post.summary}
                        </DialogDescription>

                        <div className="flex flex-col gap-3 text-sm text-muted-foreground/80 mt-auto pt-8 border-t border-border/50">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-primary/70" />
                                <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary/70" />
                                <span>{post.author}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 h-full relative bg-background">
                    <ScrollArea className="h-full w-full p-8 md:p-12 lg:p-16">
                        <div className="prose dark:prose-invert prose-lg max-w-3xl mx-auto prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-8 prose-blockquote:border-l-primary/50 prose-img:rounded-xl">
                            <post.content />
                        </div>
                        <div className="h-32" /> {/* Spacer */}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
