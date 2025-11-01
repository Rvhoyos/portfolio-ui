import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="text-xl font-medium">Services</h2>
      <p className="mt-2 text-muted-foreground">What I can help with.</p>

      <Accordion type="single" collapsible className="mt-4">
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
    </section>
  )
}
