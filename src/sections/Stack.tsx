import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const buckets = {
  Languages: ["Java", "TypeScript", "SQL"],
  Backend: ["Spring Boot", "PostgreSQL", "Flyway", "JPA/Hibernate"],
  Frontend: ["React", "Vite", "Tailwind", "shadcn/ui"],
  DevOps: ["Docker", "Caddy", "nginx", "GitHub Actions"],
} as const

export function Stack() {
  return (
    <section id="stack" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Stack</h2>
        <p className="mt-2 text-muted-foreground">Tools I use and recommend.</p>

        <Tabs defaultValue="Languages" className="mt-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4">
            {Object.keys(buckets).map((k) => (
              <TabsTrigger key={k} value={k}>{k}</TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(buckets).map(([k, items]) => (
            <TabsContent key={k} value={k} className="mt-6">
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
