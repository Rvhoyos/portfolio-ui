import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Services</h2>
        <p className="mt-2 text-muted-foreground">What I can help with.</p>

        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="backend">
            <AccordionTrigger>Backend (Java / Spring)</AccordionTrigger>
            <AccordionContent>
              REST APIs, data models, migrations (Flyway), testing, and CI/CD. PostgreSQL-first; queues/workers when needed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="frontend">
            <AccordionTrigger>Frontend (React / Tailwind)</AccordionTrigger>
            <AccordionContent>
              SPA or static builds with clean components (shadcn/ui), accessibility and responsive layouts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="devops">
            <AccordionTrigger>DevOps & Deploy</AccordionTrigger>
            <AccordionContent>
              Dockerized apps behind Caddy/nginx, environment split (staging/prod), monitoring basics, zero-downtime updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
