import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, GitBranch, RefreshCw, Activity, ShieldCheck } from "lucide-react"

export function About() {
  const focus = [
    { label: "React for client rendered experiences", desc: "Modern UI with fast navigation.", Icon: Code2 },
    { label: "Spring for APIs and services", desc: "Typed contracts, validation, and versioned endpoints.", Icon: Server },
    { label: "Automated CI and CD to staging and production", desc: "Every change rolls out safely with rollbacks ready.", Icon: GitBranch },
  ] as const

  const principles = [
    { label: "Repeatable deployments", desc: "Scripted infrastructure and containers for parity across envs.", Icon: RefreshCw },
    { label: "Observable systems", desc: "Logging, metrics, and alerts by default for clear ops signals.", Icon: Activity },
    { label: "Clear security practices", desc: "Sensible headers (CSP, HSTS) and strict input validation.", Icon: ShieldCheck },
  ] as const

  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        {/* Heading (visual tweaks only) */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
            <span className="relative inline-block">
              About
              <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0" />
            </span>
          </span>
        </h2>

        {/* Paragraph (visual tweaks only) */}
        <div className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground/90 space-y-1.5">
          <p className="leading-relaxed">
            <strong> I build reliable</strong>, and simple to run web solutions.
          </p>
          <p className="leading-relaxed">
            Every project ships with automated deployments <strong>and observable</strong> systems.
          </p>
          <p className="leading-relaxed">
            <strong>Scalable </strong> <strong>software</strong> when you need it.
          </p>
        </div>





        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Focus */}
          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Focus</CardTitle>
                <Badge variant="secondary">Delivery</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {focus.map(({ label, desc, Icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 opacity-70" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Principles */}
          <Card className="border-border/70">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Principles</CardTitle>
                <Badge variant="secondary">Guardrails</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {principles.map(({ label, desc, Icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 opacity-70" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
