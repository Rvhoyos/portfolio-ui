import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Newspaper, LayoutDashboard, Server, Webhook } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { XCircle, Clock, Wallet, Users } from "lucide-react"
import { GitBranch, Activity, RefreshCw } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

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
      "Pages are prebuilt at deploy and served quickly worldwide. Perfect for product pages, documentation, and blogs. Forms, search, and gated content work without running a full-time app server.",
    bullets: [
      "Fast prebuilt pages",
      "Image optimization and caching",
      "Contact forms and consent-aware analytics",
    ],
    cta: { label: "Start a project", href: "?service=ssg#contact" },
  },
  {
    title: "SaaS Web App",
    tagline: "App-like experience in the browser, backed by your existing or a new API.",
    blurb:
      "A client-rendered app that talks to a secure backend. Great for dashboards, tools, and signed-in experiences. Includes sign-in, roles, and careful validation on every request.",
    bullets: [
      "Protected areas and accounts",
      "Clear API with versioning",
      "Monitoring and safeguards",
    ],
    cta: { label: "Start a project", href: "?service=spa#contact" },
  },
  {
    title: "Personalized Web App (Server-Rendered)",
    tagline: "Personalized pages with a fast first view.",
    blurb:
      "Pages are produced on the server for each request, then become interactive in the browser. Ideal when what you show depends on who’s viewing (accounts, portals, catalogs).",
    bullets: [
      "Server-produced pages, interactive after load",
      "Centralized sessions for signed-in users",
      "Safe forms and security headers",
    ],
    cta: { label: "Start a project", href: "?service=ssr#contact" },
  },
  {
    title: "Platform Integrations and APIs",
    tagline: "Connect systems and expose clean endpoints.",
    blurb:
      "Design and build endpoints with clear contracts. A good fit for adding an API to an existing product or launching a new backend service.",
    bullets: [
      "Human-readable docs",
      "Fair usage limits and clear errors",
      "Logs and tracing to debug issues",
    ],
    cta: { label: "Start a project", href: "?service=apis#contact" },
  },
  {
    title: "Managed Cloud and DevOps",
    tagline: "Run, monitor, and back up your software.",
    blurb:
      "Set up environments, deploy reliably, and keep an eye on health. Backups are tested. I can also install and operate open-source tools your team uses (wikis, monitoring, automation, self-hosted action runner, codeserver..etc).",
    bullets: [
      "Environment setup with secrets and config",
      "Logs, metrics, and alerts",
      "Backup schedule with restore drills",
    ],
    cta: { label: "Start a project", href: "?service=devops#contact" },
  },
  {
    title: "Kubernetes Readiness and Scaling",
    tagline: "Be ready for traffic and safe rollouts.",
    blurb:
      "Run several copies across machines, send requests only to healthy ones, and roll out updates gradually without taking the app down.",
    bullets: [
      "Two copies by default with health checks",
      "Graceful shutdown during deploys",
      "Resource limits to avoid noisy neighbors",
    ],
    cta: { label: "Start a project", href: "?service=kubernetes#contact" },
  },
]

/** Reveal-on-scroll helper:
 * - Triggers later (amount: 0.6 → ~60% of element must be in view)
 * - Slightly stronger lift (y: 16)
 * - A touch longer duration (0.7s)
 */
function Reveal({
  children,
  y = 16,
  delay = 0,
  amount = 0.6,
}: {
  children: ReactNode
  y?: number
  delay?: number
  amount?: number
}) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
            <span className="relative inline-block">
              Services
              <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0" />
            </span>
          </span>
        </h2>

        <p className="mt-2 text-muted-foreground">
          Pick the outcome you need.    
          Choose from the following Dev or IT/Ops services.  
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.title}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                  <CardDescription>{s.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 min-w-0">
                  <p className="text-sm text-muted-foreground">{s.blurb}</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 justify-start">
                    {s.bullets.map((b) => (
                      <Badge key={b} variant="secondary" className="rounded-full whitespace-nowrap">
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
            </Reveal>
          ))}
        </div>

        {/* Included in every build */}
        <div className="mt-10">
          <Card className="border-border/70 bg-muted/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Included in every build</CardTitle>
              <CardDescription>Baseline reliability and automated releases. No extra add-on required.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Staging & production */}
                <Reveal>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full text-left rounded-lg border border-border/60 bg-background p-4 transition
                                  hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        aria-label="Staging & production details"
                      >
                        <div className="flex items-start gap-3">
                          <GitBranch className="mt-0.5 h-4 w-4 opacity-70" aria-hidden />
                          <div>
                            <div className="text-sm font-medium text-foreground">Staging &amp; production</div>
                            <p className="text-xs text-muted-foreground">Test safely in an environment that mirrors live.</p>
                          </div>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-xs">
                      Two environments with a clear promotion path and change history so releases stay predictable.
                    </PopoverContent>
                  </Popover>
                </Reveal>

                {/* Health checks */}
                <Reveal>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full text-left rounded-lg border border-border/60 bg-background p-4 transition
                                  hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        aria-label="Health checks details"
                      >
                        <div className="flex items-start gap-3">
                          <Activity className="mt-0.5 h-4 w-4 opacity-70" aria-hidden />
                          <div>
                            <div className="text-sm font-medium text-foreground">Health checks</div>
                            <p className="text-xs text-muted-foreground">Liveness &amp; readiness endpoints wired into deploys.</p>
                          </div>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-xs">
                      Small HTTP endpoints by default no extra services. Liveness checks the process readiness verifies dependencies so only healthy versions get traffic.
                    </PopoverContent>
                  </Popover>
                </Reveal>

                {/* Zero-downtime releases */}
                <Reveal>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full text-left rounded-lg border border-border/60 bg-background p-4 transition
                                  hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        aria-label="Zero-downtime releases details"
                      >
                        <div className="flex items-start gap-3">
                          <RefreshCw className="mt-0.5 h-4 w-4 opacity-70" aria-hidden />
                          <div>
                            <div className="text-sm font-medium text-foreground">Zero-downtime releases</div>
                            <p className="text-xs text-muted-foreground">Swap versions behind health gates with rollback ready.</p>
                          </div>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-xs">
                      Bring up the new version alongside the current one, verify health, switch over, and keep instant rollback on standby. On Kubernetes this uses rolling updates.
                    </PopoverContent>
                  </Popover>
                </Reveal>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular add-ons */}
        <div className="mt-6">
          <Card className="border-border/70 bg-muted/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Popular Add-Ons</CardTitle>
              <CardDescription>Optional capabilities grouped by dev and ops.</CardDescription>
            </CardHeader>

            <CardContent>
              {(() => {
                type AddOn = {
                  label: string
                  short: string
                  detail: string
                  category: "dev" | "ops"
                }

                const popularAddOns: AddOn[] = [
                  // Product & Dev
                  {
                    label: "User accounts with MFA and audit log",
                    short: "Secure sign-in & activity trails.",
                    detail:
                      "Extra sign-in step (e.g., TOTP/WebAuthn) and a tamper-resistant record of key actions (sign-ins, role changes).",
                    category: "dev",
                  },
                  {
                    label: "Feature flags & experiments",
                    short: "Ship safely & test ideas.",
                    detail:
                      "Turn features on/off per user or percentage. Safely A/B test variants without redeploying the app.",
                    category: "dev",
                  },
                  {
                    label: "Data export / import & retention",
                    short: "Onboarding & compliance friendly.",
                    detail:
                      "Built for legacy onboarding and compliance: users can export (CSV/JSON), admins can bulk-import, and retention rules support PIPEDA/GDPR.",
                    category: "dev",
                  },
                  {
                    label: "Editorial workflow (draft, review, publish)",
                    short: "Non-dev friendly content changes.",
                    detail:
                      "Draft → review → approve → publish with roles, history, and rollback for safe content operations.",
                    category: "dev",
                  },

                  // Ops & Quality
                  {
                    label: "API keys & rate limits",
                    short: "Control access & prevent abuse.",
                    detail:
                      "Per-client tokens with quotas/rotation. Prevent abuse with request limits and structured request IDs.",
                    category: "ops",
                  },
                  {
                    label: "SLO dashboards & error budgets",
                    short: "Track reliability and pace releases.",
                    detail:
                      "Monitor latency/availability against targets. Error budgets guide release velocity vs reliability.",
                    category: "ops",
                  },
                  {
                    label: "Load test & capacity plan",
                    short: "Know limits before launch.",
                    detail:
                      "Simulate traffic to locate bottlenecks and estimate headroom (instances needed) before growth.",
                    category: "ops",
                  },
                ]

                const dev = popularAddOns.filter(a => a.category === "dev")
                const ops = popularAddOns.filter(a => a.category === "ops")

                const Tile = ({ item }: { item: AddOn }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full text-left rounded-lg border border-border/60 bg-background p-4 transition
                                  hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        aria-label={`${item.label} details`}
                      >
                        <div className="text-sm font-medium">{item.label}</div>
                        <p className="mt-1 text-xs text-muted-foreground">{item.short}</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-xs">{item.detail}</PopoverContent>
                  </Popover>
                )

                return (
                  <Tabs defaultValue="dev" className="mt-1">
                    <TabsList className="h-auto flex-wrap gap-2 justify-start max-w-full md:flex-wrap lg:h-10 lg:flex-nowrap">
                      <TabsTrigger value="dev" className="rounded-full">Dev</TabsTrigger>
                      <TabsTrigger value="ops" className="rounded-full">Ops</TabsTrigger>
                    </TabsList>

                    {/* Product & Dev */}
                    <TabsContent value="dev" className="mt-4">
                      {(() => {
                        const hasMore = dev.length > 3
                        return (
                          <Collapsible>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {dev.slice(0, 3).map(item => (
                                <Reveal key={item.label}>
                                  <Tile item={item} />
                                </Reveal>
                              ))}
                            </div>

                            {hasMore && (
                              <>
                                <CollapsibleContent>
                                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {dev.slice(3).map(item => (
                                      <Reveal key={item.label}>
                                        <Tile item={item} />
                                      </Reveal>
                                    ))}
                                  </div>
                                </CollapsibleContent>

                                <div className="mt-3">
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="group inline-flex items-center gap-1">
                                      <span>Show all ({dev.length})</span>
                                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                    </Button>
                                  </CollapsibleTrigger>
                                </div>
                              </>
                            )}
                          </Collapsible>
                        )
                      })()}
                    </TabsContent>

                    {/* Ops & Quality */}
                    <TabsContent value="ops" className="mt-4">
                      {(() => {
                        const hasMore = ops.length > 3
                        return (
                          <Collapsible>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {ops.slice(0, 3).map(item => (
                                <Reveal key={item.label}>
                                  <Tile item={item} />
                                </Reveal>
                              ))}
                            </div>

                            {hasMore && (
                              <>
                                <CollapsibleContent>
                                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {ops.slice(3).map(item => (
                                      <Reveal key={item.label}>
                                        <Tile item={item} />
                                      </Reveal>
                                    ))}
                                  </div>
                                </CollapsibleContent>

                                <div className="mt-3">
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="group inline-flex items-center gap-1">
                                      <span>Show all ({ops.length})</span>
                                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                    </Button>
                                  </CollapsibleTrigger>
                                </div>
                              </>
                            )}
                          </Collapsible>
                        )
                      })()}
                    </TabsContent>
                  </Tabs>
                )
              })()}
            </CardContent>
          </Card>
        </div>

        {/* Which service is right for you? */}
        <Reveal>
          <div className="mt-6 rounded-2xl border border-border/70 bg-background p-0 shadow-sm">
            <div className="border-b border-border/60 px-5 py-4">
              <h3 className="text-lg font-medium">Which service is right for you?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A quick chooser written for non-technical buyers. Expand to see typical fits, what you’ll get, and trade-offs.
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
                      Heavy personalization, real-time dashboards, or complex user accounts need an app and API, this option isn’t built for that.
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
                        <li>SEO for public pages is <em>not</em> a priority most value is in authenticated app views.</li>
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
                    <strong>Server-Rendered SPA:</strong> strong SEO and fast first view with hydration for interactivity.
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
                        <li>Fast fast first view for public routes.</li>
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
        </Reveal>

        {/* Compliance note */}
        <p className="mt-6 text-xs text-muted-foreground">
          Privacy by design is included. Canada PIPEDA and CASL are observed. GDPR support is available when your audience includes the EU. Sub processors are disclosed in contracts. Consent is captured for non essential trackers.
        </p>
      </div>
    </section>
  )
}
