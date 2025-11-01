import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Newspaper, LayoutDashboard, Server, Webhook } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { XCircle, Clock, Wallet, Users } from "lucide-react"
import { GitBranch, Activity, RefreshCw } from "lucide-react"

type Service = {
  title: string
  tagline: string
  blurb: string
  bullets: string[]
  cta: { label: string; href: string }
}

const services: Service[] = [
  {
    title: "Marketing Sites and Landing Pages",
    tagline: "Publish fast, rank well, and keep costs low.",
    blurb:
      "Static or prebuilt pages rendered ahead of time and cached at the edge. Ideal for product pages, documentation, and blogs. Forms, search, and gated content are integrated without a long running application server.",
    bullets: [
      "Prebuilt pages with search engine friendly markup",
      "Edge caching and image optimization",
      "Contact forms and consent aware analytics",
    ],
    cta: { label: "Start a project", href: "?service=ssg#contact" },
  },
  {
    title: "SaaS Web App",
    tagline: "App-like experience in the browser, powered by your existing backend or a new platform API.",
    blurb:
      "Client-rendered single-page application that communicates with a secure API—either your current backend or a new one we build. Stateless token authentication with short-lived access tokens and a refresh token stored in an HttpOnly, Secure cookie. Role-based access. Strict validation on every request.",
    bullets: [
      "Client rendered app with protected routes",
      "REST or GraphQL API with schema and versioning",
      "Automated tests, logging with request IDs, rate limits",
    ],
    cta: { label: "Start a project", href: "?service=spa#contact" },
  },
  {
    title: "Personalized Web App (Server-Rendered)",
    tagline: "Strong SEO with server-rendered pages.",
    blurb:
      "Server-rendered single-page app. The server returns HTML for each request, then hydrates client interactions. Sessions live in a shared store so any replica can serve any user. Content Security Policy with per-request nonces. Forms use server-generated anti-CSRF tokens.",
    bullets: [
      "Server rendered routes with hydration",
      "Session storage in Redis or equivalent shared store",
      "Security headers including CSP, HSTS, and Referrer Policy",
    ],
    cta: { label: "Start a project", href: "?service=ssr#contact" },
  },
  {
    title: "Platform Integrations and APIs",
    tagline: "Clean endpoints with documentation and clear SLAs.",
    blurb:
      "Design and build REST or GraphQL endpoints with typed contracts and a plan for schema changes. Auth via tokens or signed requests with strong validation and idempotency where needed. Great fit when adding an API to an existing product or launching a new backend service.",
    bullets: [
      "OpenAPI or GraphQL schema and human readable docs",
      "Rate limits and error taxonomy",
      "Observability with traces and logs",
    ],
    cta: { label: "Start a project", href: "?service=apis#contact" },
  },
  {
    title: "Managed Cloud and DevOps",
    tagline: "Provisioning, monitoring, backups, and release management.",
    blurb:
      "Cloud-agnostic deployment with containers and scripted infrastructure. Centralized logging and metrics. Backups with tested restore. I can also install and operate open-source tools your team relies on (wikis, monitoring, automation, dashboards).",
    bullets: [
      "Environment setup with secrets and configuration",
      "Log and metric collection with alerts",
      "Backup schedule and restore drill",
    ],
    cta: { label: "Start a project", href: "?service=devops#contact" },
  },
  {
    title: "Kubernetes Readiness and Scaling",
    tagline: "Run multiple copies across machines with safe rollouts.",
    blurb:
      "Production setup for apps that need multiple copies. Ingress handles public traffic, Services balance requests, and Deployments keep the right number of replicas up. Readiness checks only send traffic when ready; liveness checks auto-restart stuck copies. Rolling updates swap versions without downtime.",
    bullets: [
      "Two replicas standard with readiness and liveness",
      "Graceful shutdown and connection draining",
      "Resource requests and limits to prevent noisy neighbors",
    ],
    cta: { label: "Start a project", href: "?service=kubernetes#contact" },
  },
]



export function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Services</h2>
        <p className="mt-2 text-muted-foreground">
          Pick the outcome you need. Every build includes staging and production environments, health checks, and a zero downtime release plan.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="h-full">
              <CardHeader>
                <CardTitle className="text-base">{s.title}</CardTitle>
                <CardDescription>{s.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{s.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <Badge key={b} variant="secondary">
                      {b}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild size="sm">
                  <a href={s.cta.href}>{s.cta.label}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      {/* Included in every build */}
      <div className="mt-10">
        <Card className="border-border/70 bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Included in every build</CardTitle>
            <CardDescription>Baseline reliability and safe releases—no extra add-on required.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Staging & production */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-help rounded-lg border border-border/60 bg-background p-4">
                    <div className="flex items-start gap-3">
                      <GitBranch className="mt-0.5 h-4 w-4 opacity-70" aria-hidden />
                      <div>
                        <div className="text-sm font-medium text-foreground">Staging &amp; production</div>
                        <p className="text-xs text-muted-foreground">Test safely in an environment that mirrors live.</p>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 text-xs">
                  Two environments with a clear promotion path and change history so releases stay predictable.
                </HoverCardContent>
              </HoverCard>

              {/* Health checks */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-help rounded-lg border border-border/60 bg-background p-4">
                    <div className="flex items-start gap-3">
                      <Activity className="mt-0.5 h-4 w-4 opacity-70" aria-hidden />
                      <div>
                        <div className="text-sm font-medium text-foreground">Health checks</div>
                        <p className="text-xs text-muted-foreground">Liveness &amp; readiness endpoints wired into deploys.</p>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 text-xs">
                  Small HTTP endpoints by default—no extra services. Liveness checks the process; readiness verifies dependencies so only healthy versions get traffic.
                </HoverCardContent>
              </HoverCard>

              {/* Zero-downtime release plan */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-help rounded-lg border border-border/60 bg-background p-4">
                    <div className="flex items-start gap-3">
                      <RefreshCw className="mt-0.5 h-4 w-4 opacity-70" aria-hidden />
                      <div>
                        <div className="text-sm font-medium text-foreground">Zero-downtime releases</div>
                        <p className="text-xs text-muted-foreground">Swap versions behind health gates with rollback ready.</p>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 text-xs">
                  Bring up the new version alongside the current one, verify health, switch over, and keep instant rollback on standby. On Kubernetes this uses rolling updates.
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Popular add-ons */}
      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
        <h3 className="text-lg font-medium">Popular Add-Ons</h3>
        <ul className="mt-3 grid list-disc gap-1 pl-5 text-sm text-muted-foreground sm:grid-cols-2">
          {/* SaaS bundle — first four */}
          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  User accounts with MFA and audit log
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Extra sign-in step (e.g., TOTP/WebAuthn) and a tamper-resistant record of key actions (sign-ins, role changes).
              </HoverCardContent>
            </HoverCard>
          </li>

          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  Feature flags &amp; experiments
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Turn features on/off per user or percentage. Safely A/B test variants without redeploying the app.
              </HoverCardContent>
            </HoverCard>
          </li>

          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  SLO dashboards &amp; error budgets
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Track reliability and latency against targets. The “error budget” is how much failure you can afford before slowing releases.
              </HoverCardContent>
            </HoverCard>
          </li>

          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  Data export / import &amp; retention
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Built for legacy onboarding and compliance: users can get their data out (CSV/JSON), admins can
                bulk-import and retention rules meet portability/erasure expectations (PIPEDA/GDPR..etc).
              </HoverCardContent>
            </HoverCard>
          </li>


          {/* Additional add-ons you control */}
          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  API keys &amp; rate limits
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Per-client tokens with quotas and rotation. Prevent abuse with request limits and structured request IDs.
              </HoverCardContent>
            </HoverCard>
          </li>

          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  Editorial workflow (draft, review, publish)
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Non-developers can edit content safely: draft → review → approve → publish, with roles, history, and rollback.
              </HoverCardContent>
            </HoverCard>
          </li>

          <li>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted underline-offset-4">
                  Load test &amp; capacity plan
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-xs">
                Simulate traffic to find bottlenecks and estimate headroom (instances needed) before launch or growth.
              </HoverCardContent>
            </HoverCard>
          </li>
        </ul>

        {/* Optional note (kept small and non-promotional) */}
        <p className="mt-3 text-xs text-muted-foreground">
          Rolling updates are included for Kubernetes builds.
        </p>
      </div>



{/* Which service is right for you? */}
<div className="mt-6 rounded-2xl border border-border/70 bg-background p-0 shadow-sm">
  <div className="border-b border-border/60 px-5 py-4">
    <h3 className="text-lg font-medium">Which service is right for you?</h3>
    <p className="mt-1 text-sm text-muted-foreground">
      A quick chooser—written for non-technical buyers. Expand to see typical fits, what you’ll get, and trade-offs.
    </p>
  </div>

  <Accordion type="single" collapsible>
    {/* Static / Prebuilt */}
    <AccordionItem value="ssg" className="border-b border-border/60">
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <span className="flex items-center gap-2 text-left">
          <Newspaper className="h-4 w-4 opacity-70" aria-hidden />
          <span className="font-medium">Static/Prebuilt</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5 text-sm text-muted-foreground">
        <p>
          <strong>Static/Prebuilt:</strong> rendered ahead of time and cached at the edge (product pages, documentation, blogs).
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Fast launch</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" /> Low ongoing cost</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> Small team friendly</Badge>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 font-medium text-foreground/90">Best when</div>
            <ul className="list-disc pl-4">
              <li>You need a fast, searchable marketing site or docs.</li>
              <li>Content changes weekly or monthly (not minute-to-minute).</li>
              <li>You want great SEO and quick page loads worldwide.</li>
            </ul>
          </div>
          <div>
            <div className="mb-1 font-medium text-foreground/90">You’ll get</div>
            <ul className="list-disc pl-4">
              <li>Clean pages, mobile-ready, and easy to update.</li>
              <li>Contact forms and simple content workflows.</li>
              <li>Analytics that respect consent and privacy.</li>
            </ul>
          </div>
        </div>

        <Alert className="mt-4">
          <AlertTitle className="flex items-center gap-2 text-foreground">
            <XCircle className="h-4 w-4" /> Trade-offs
          </AlertTitle>
          <AlertDescription>
            Heavy personalization, real-time dashboards, or complex user accounts need an app and API—this option isn’t built for that.
          </AlertDescription>
        </Alert>

        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Examples:</span> product/launch pages, documentation, blog, pricing.
        </div>
      </AccordionContent>
    </AccordionItem>

    {/* Client SPA */}
    <AccordionItem value="spa" className="border-b border-border/60">
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <span className="flex items-center gap-2 text-left">
          <LayoutDashboard className="h-4 w-4 opacity-70" aria-hidden />
          <span className="font-medium">Client-Rendered SPA</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5 text-sm text-muted-foreground">
        <p>
          <strong>Client-Rendered SPA:</strong> app-like dashboards and product UIs with a secure API.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Moderate build time</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" /> Medium cost</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> Suits growing teams</Badge>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 font-medium text-foreground/90">Best when</div>
            <ul className="list-disc pl-4">
              <li>Interactive product UIs or internal tools are the core value.</li>
              <li>SEO for public pages is <em>not</em> a priority; most value is in authenticated app views.</li>
              <li>You need roles, protected routes, and a clean API.</li>
            </ul>
          </div>
          <div>
            <div className="mb-1 font-medium text-foreground/90">You’ll get</div>
            <ul className="list-disc pl-4">
              <li>Smooth, app-like interactions in the browser.</li>
              <li>Authentication, roles, and audit-friendly logs.</li>
              <li>CI/CD to staging then production with safe rollouts.</li>
            </ul>
          </div>
        </div>

        <Alert className="mt-4">
          <AlertTitle className="flex items-center gap-2 text-foreground">
            <XCircle className="h-4 w-4" /> Trade-offs
          </AlertTitle>
          <AlertDescription>
            SEO for public content can be weaker than server-rendered pages. If search is critical, consider the server-rendered option below.
          </AlertDescription>
        </Alert>

        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Examples:</span> admin portals, customer dashboards, analytics.
        </div>
      </AccordionContent>
    </AccordionItem>

    {/* Server-rendered SPA */}
    <AccordionItem value="ssr" className="border-b border-border/60">
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <span className="flex items-center gap-2 text-left">
          <Server className="h-4 w-4 opacity-70" aria-hidden />
          <span className="font-medium">Server-Rendered SPA</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5 text-sm text-muted-foreground">
        <p>
          <strong>Server-Rendered SPA:</strong> strong SEO and great first paint with hydration for interactivity.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Moderate build time</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" /> Medium–higher cost</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> Product + content teams</Badge>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 font-medium text-foreground/90">Best when</div>
            <ul className="list-disc pl-4">
              <li>You need public pages that rank well <em>and</em>  logged-in experiences.</li>
              <li>Personalized content or geo-aware rules are required.</li>
              <li>Security headers and session management matter.</li>
            </ul>
          </div>
          <div>
            <div className="mb-1 font-medium text-foreground/90">You’ll get</div>
            <ul className="list-disc pl-4">
              <li>Fast first paint for public routes.</li>
              <li>Server-generated pages with safe, stateful actions.</li>
              <li>Caching options for speed (full pages or fragments).</li>
            </ul>
          </div>
        </div>

        <Alert className="mt-4">
          <AlertTitle className="flex items-center gap-2 text-foreground">
            <XCircle className="h-4 w-4" /> Trade-offs
          </AlertTitle>
          <AlertDescription>
            Slightly more infrastructure than pure static sites. If you don’t need SEO or personalization, a client-rendered app may be simpler.
          </AlertDescription>
        </Alert>

        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Examples:</span> marketing + account portal, marketplaces, multi-region sites.
        </div>
      </AccordionContent>
    </AccordionItem>

    {/* APIs & Integrations */}
    <AccordionItem value="apis">
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <span className="flex items-center gap-2 text-left">
          <Webhook className="h-4 w-4 opacity-70" aria-hidden />
          <span className="font-medium">APIs &amp; Integrations</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5 text-sm text-muted-foreground">
        <p>
          <strong>APIs &amp; Integrations:</strong> typed contracts and schema evolution for shared services.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Varies by scope</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" /> Cost depends on partners</Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> Dev & ops stakeholders</Badge>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 font-medium text-foreground/90">Best when</div>
             <ul className="list-disc pl-4">
              <li>You’re adding an API to an existing product or launching a new backend service.</li>
              <li>Your app needs to power mobile clients or third-party integrations.</li>
              <li>You want clean docs and keys with sensible rate limits for partners.</li>
             </ul>
          </div>
          <div>
            <div className="mb-1 font-medium text-foreground/90">You’ll get</div>
            <ul className="list-disc pl-4">
              <li>Clear, versioned endpoints with examples.</li>
              <li>Usage analytics and key management.</li>
              <li>Retries and signatures for reliable webhooks.</li>
            </ul>
          </div>
        </div>

        <Alert className="mt-4">
          <AlertTitle className="flex items-center gap-2 text-foreground">
            <XCircle className="h-4 w-4" /> Trade-offs
          </AlertTitle>
          <AlertDescription>
            APIs don’t include a full UI. If you need a customer-facing site now, pair with a Static/Prebuilt or SPA/SSR build.
          </AlertDescription>
        </Alert>

        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Examples:</span> partner webhooks, data sync, public developer API, mobile backend.
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>



        {/* Compliance note */}
        <p className="mt-6 text-xs text-muted-foreground">
          Privacy by design is included. Canada PIPEDA and CASL are observed. GDPR support is available when your audience includes the EU. Sub processors are disclosed in contracts. Consent is captured for non essential trackers.
        </p>
      </div>
    </section>
  )
}
