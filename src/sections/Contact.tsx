import { useState, useEffect, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export function Contact() {
  // store the slug, not the human label
  const [interestSlug, setInterestSlug] = useState<string>("")
  const [timeline, setTimeline] = useState<string>("")
  const [budget, setBudget] = useState<string>("")
  const [msg, setMsg] = useState<string>("")
  const MSG_LIMIT = 1000

  // Slug -> human label (must align with Services links)
  const SERVICE_LABELS: Record<string, string> = {
    ssg: "Marketing Sites and Landing Pages",
    spa: "SaaS Web App",
    ssr: "Personalized Web App (Server-Rendered)",
    apis: "Platform Integrations and APIs",
    devops: "Managed Cloud and DevOps",
    kubernetes: "Kubernetes Readiness and Scaling",
  }
  const interestLabel = interestSlug ? SERVICE_LABELS[interestSlug] ?? interestSlug : ""

  const buildTemplate = (serviceTitle: string) =>
    [
      `Project: ${serviceTitle}`,
      `Goals & outcomes:`,
      `Audience & users:`,
      `Current state (site/app, data, integrations):`,
      `Key features (prioritized):`,
      `Constraints (timeline, budget, compliance):`,
      `Success metrics (what “good” looks like):`,
      `Links/refs (optional):`,
    ].join("\n")

  const scrollToContact = useCallback(() => {
    const node = document.getElementById("contact")
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const prefillFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get("service")
    if (!slug) return

    if (SERVICE_LABELS[slug]) {
      setInterestSlug(slug)
      if (!msg) setMsg(buildTemplate(SERVICE_LABELS[slug]).slice(0, MSG_LIMIT))
    }

    // let the browser jump to #contact first, then clean the query
    setTimeout(() => {
      const cleanUrl = window.location.pathname + (window.location.hash || "")
      window.history.replaceState({}, "", cleanUrl)
    }, 0)

    // ensure scroll lands correctly in SPA context
    scrollToContact()
  }, [MSG_LIMIT, msg, scrollToContact])

  // On first mount (e.g., landing on /?service=...#contact)
  useEffect(() => {
    prefillFromUrl()
  }, [prefillFromUrl])

  // Also handle subsequent clicks on service CTAs without a full reload:
  useEffect(() => {
    const clickHandler = () => {
      // wait until the URL updates from the anchor click, then read it
      setTimeout(prefillFromUrl, 0)
    }
    window.addEventListener("click", clickHandler, true)

    // When hash changes (e.g., first jump to #contact), also check
    const hashHandler = () => prefillFromUrl()
    window.addEventListener("hashchange", hashHandler)

    return () => {
      window.removeEventListener("click", clickHandler, true)
      window.removeEventListener("hashchange", hashHandler)
    }
  }, [prefillFromUrl])

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 text-muted-foreground max-w-prose">
          Modern web apps and platforms with enterprise proven infrastructure.
        </p>

        <form className="mt-6 grid gap-4 sm:max-w-xl" method="post">
          {/* basic anti-spam honeypot (ignored when wiring later) */}
          <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-1.5">
            <Label htmlFor="name">
              Name<span className="text-destructive">*</span>
            </Label>
            <Input id="name" name="name" placeholder="Your name" autoComplete="name" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email">
              Email<span className="text-destructive">*</span>
            </Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="org">Company / Org (optional)</Label>
            <Input id="org" name="org" placeholder="Organization or personal" autoComplete="organization" />
          </div>

          {/* Service of interest */}
          <div className="grid gap-1.5">
            <Label>Service of interest (optional)</Label>
            <Select value={interestSlug} onValueChange={setInterestSlug}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a service (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ssg">Marketing Sites and Landing Pages</SelectItem>
                <SelectItem value="spa">SaaS Web App</SelectItem>
                <SelectItem value="ssr">Personalized Web App (Server-Rendered)</SelectItem>
                <SelectItem value="apis">Platform Integrations and APIs</SelectItem>
                <SelectItem value="devops">Managed Cloud and DevOps</SelectItem>
                <SelectItem value="kubernetes">Kubernetes Readiness and Scaling</SelectItem>
                <SelectItem value="exploring">Just exploring</SelectItem>
              </SelectContent>
            </Select>
            {/* mirror human-readable title into POST */}
            <input type="hidden" name="interest" value={interestLabel} />
          </div>

          {/* Timeline */}
          <div className="grid gap-1.5">
            <Label>Timeline (optional)</Label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rough timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASAP">ASAP</SelectItem>
                <SelectItem value="2–4 weeks">2–4 weeks</SelectItem>
                <SelectItem value="4–6 weeks">4–6 weeks</SelectItem>
                <SelectItem value="6–10 weeks">6–10 weeks</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="timeline" value={timeline} />
          </div>

          {/* Budget */}
          <div className="grid gap-1.5">
            <Label>Budget (optional)</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Pick a range (CAD)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<5k">&lt; 5k</SelectItem>
                <SelectItem value="5k–15k">5k–15k</SelectItem>
                <SelectItem value="15k–30k">15k–30k</SelectItem>
                <SelectItem value="30k–60k">30k–60k</SelectItem>
                <SelectItem value="60k+">60k+</SelectItem>
                <SelectItem value="Not sure yet">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="budget" value={budget} />
          </div>

          {/* Project summary with counter */}
          <div className="grid gap-1.5">
            <Label htmlFor="msg">
              Project summary<span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="msg"
              name="message"
              placeholder="Goals, current state, key features, and constraints…"
              maxLength={MSG_LIMIT}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />
            <div className="flex items-center justify-end text-xs text-muted-foreground" aria-live="polite">
              {msg.length}/{MSG_LIMIT}
            </div>
          </div>

          {/* Privacy note as an accordion to reduce visual weight */}
          <Accordion type="single" collapsible className="mt-1">
            <AccordionItem value="privacy">
              <AccordionTrigger className="text-xs text-muted-foreground">
                Privacy & compliance details
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-xs text-muted-foreground">
                  Privacy by design is included. Canada PIPEDA and CASL are observed. GDPR support is available when your
                  audience includes the EU. Sub processors are disclosed in contracts. Consent is captured for non essential
                  trackers.
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-4">
            <Button type="button">Start a project</Button>
          </div>
        </form>
      </div>
    </section>
  )
}
