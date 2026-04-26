import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, CheckCircle2, MessageSquare, ShoppingBag } from "lucide-react"
import { gsap, useGSAP } from "@/lib/gsap"

const API_ENDPOINT = "https://portfolioform.raultheta.workers.dev"
const MIN_T_MS = 1500
const MAX_T_MS = 2 * 60 * 60 * 1000

const workPaths = [
  {
    title: "Consultations & Proposals",
    description: "Book a consultation to discuss your project. We'll define scope together and I'll send a proposal with milestones and pricing.",
    icon: MessageSquare,
  },
  {
    title: "Shop Catalog",
    description: "Browse productized offerings on the Client Dashboard. Pick something from the catalog for faster turnaround on common deliverables.",
    icon: ShoppingBag,
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    })

    tl.fromTo(".contact-heading", { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" })
    tl.fromTo(".contact-card", { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }, "-=0.5")
    tl.fromTo(".form-field", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.3")
    tl.fromTo(".work-path", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.3")
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="contact" className="border-t border-border min-h-[100vh] flex items-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
        <h2 className="contact-heading text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          <span className="inline-flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="relative inline-block">
              Let's Work Together
              <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0" />
            </span>
          </span>
        </h2>

        {/* Two column layout */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left: Contact Form */}
          <Card className="contact-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Send a Message</CardTitle>
              <p className="text-sm text-muted-foreground">I'll get back to you within 24 hours.</p>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Right: How I Work */}
          <Card className="contact-card border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">How I Work</CardTitle>
              <p className="text-sm text-muted-foreground">Two ways to start a project with me.</p>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
              {workPaths.map((path) => (
                <div key={path.title} className="work-path group rounded-xl border border-border/60 bg-background/50 p-4 transition-all hover:border-primary/30 hover:bg-background/80">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-primary/10 p-2.5">
                      <path.icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <h3 className="font-semibold">{path.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{path.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [msg, setMsg] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [renderedAt, setRenderedAt] = useState<number>(() => Date.now())
  const MSG_LIMIT = 500

  // Refresh timestamp on mount
  useEffect(() => { setRenderedAt(Date.now()) }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const form = e.currentTarget
    const fd = new FormData(form)

    const honey = (fd.get("company_website") as string) || ""
    if (honey.trim().length > 0) {
      setSuccess("Thanks! Message received.")
      form.reset()
      setMsg("")
      setRenderedAt(Date.now())
      return
    }

    const clientSubmittedAt = Date.now()
    const tookMs = clientSubmittedAt - renderedAt

    if (tookMs < MIN_T_MS) { setError("That was too fast. Please review and try again."); return }
    if (tookMs > MAX_T_MS) { setError("Form expired. Please refresh and try again."); return }

    const payload = {
      name: (fd.get("name") as string)?.trim(),
      email: (fd.get("email") as string)?.trim(),
      message: msg.trim(),
    }

    if (!payload.name || !payload.email || !payload.message) { setError("Please fill in all fields."); return }

    try {
      setSubmitting(true)
      gsap.to(".submit-btn", { scale: 0.95, duration: 0.2 })
      const res = await fetch(API_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      if (!res.ok) { const text = await res.text().catch(() => ""); throw new Error(text || `Request failed with ${res.status}`) }
      gsap.to(".submit-btn", { scale: 1, duration: 0.3, ease: "back.out(2)" })
      setSuccess("Message sent! I'll get back to you soon.")
      form.reset()
      setMsg("")
      setRenderedAt(Date.now())
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong."
      setError(message)
      gsap.to(".submit-btn", { scale: 1, duration: 0.2 })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {success && (
        <Alert className="mb-4 border-emerald-500/40 bg-emerald-500/10">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <AlertTitle>Sent!</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="mb-4 border-destructive/40">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className="grid gap-4" method="post" onSubmit={handleSubmit} aria-busy={submitting}>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <Label htmlFor="company_website">Website</Label>
          <Input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-field grid gap-1.5">
          <Label htmlFor="name">Name<span className="text-destructive">*</span></Label>
          <Input id="name" name="name" placeholder="Your name" autoComplete="name" required disabled={submitting} />
        </div>

        <div className="form-field grid gap-1.5">
          <Label htmlFor="email">Email<span className="text-destructive">*</span></Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required disabled={submitting} />
        </div>

        <div className="form-field grid gap-1.5">
          <Label htmlFor="msg">Message<span className="text-destructive">*</span></Label>
          <Textarea id="msg" name="message" placeholder="Tell me about your project..." maxLength={MSG_LIMIT} value={msg} onChange={(e) => setMsg(e.target.value)} required disabled={submitting} className="min-h-[100px]" />
          <div className="text-xs text-muted-foreground text-right">{msg.length}/{MSG_LIMIT}</div>
        </div>

        <Button type="submit" disabled={submitting} className="submit-btn gap-2 w-full">
          {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Sending...</>) : (<><Send className="h-4 w-4" aria-hidden />Send Message</>)}
        </Button>
      </form>
    </>
  )
}
