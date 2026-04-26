import type React from "react"

interface MdxModule {
    default: React.ComponentType
    frontmatter?: {
        title?: string
        summary?: string
        publishedAt?: string
        author?: string
    }
}

export interface BlogPost {
    slug: string
    title: string
    summary: string
    publishedAt: string
    author: string
    content: React.ComponentType
}

export async function getAllPosts(): Promise<BlogPost[]> {
    // Import all .mdx files from the content/blog directory
    const modules = import.meta.glob('/src/content/blog/*.mdx')

    const posts: BlogPost[] = []

    for (const path in modules) {
        // Fetch the module (the MDX file)
        const mod = await modules[path]() as MdxModule

        // Extract slug from filename (e.g., /src/content/blog/hello-world.mdx -> hello-world)
        const slug = path.split('/').pop()?.replace('.mdx', '') || ''

        // The MDX module exports 'frontmatter' (if configured) or we can export it manually
        // Usually, MDX plugins expose frontmatter as named export or property on default export
        const metadata = mod.frontmatter || {}

        posts.push({
            slug,
            title: metadata.title || 'Untitled',
            summary: metadata.summary || '',
            publishedAt: metadata.publishedAt || new Date().toISOString(),
            author: metadata.author || 'Anonymous',
            content: mod.default, // The React component
        })
    }

    // Sort by date descending
    return posts.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}
