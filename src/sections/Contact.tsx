import { useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const API_ENDPOINT = "/api/contact/lead"

// Human-tempo guardrails
const MIN_T_MS = 1500
const MAX_T_MS = 2 * 60 * 60 * 1000

export function Contact() {
  const [msg, setMsg] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [renderedAt, setRenderedAt] = useState<number>(() => Date.now())
  const MSG_LIMIT = 500

  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setRenderedAt(Date.now())
  }, [])

  // GSAP entrance animation
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    })

    // Heading draws in
    tl.fromTo(
      ".contact-heading",
      { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" }
    )

    // Subtext fades
    tl.fromTo(
      ".contact-subtext",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    )

    // Form fields stagger in with a subtle scale
    tl.fromTo(
      ".form-field",
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" },
      "-=0.3"
    )

    // Button elastic pop
    tl.fromTo(
      ".submit-btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" },
      "-=0.2"
    )
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const form = e.currentTarget
    const fd = new FormData(form)

    // Honeypot
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

    if (tookMs < MIN_T_MS) {
      setError("That was too fast. Please review and try again.")
      return
    }
    if (tookMs > MAX_T_MS) {
      setError("Form expired. Please refresh and try again.")
      return
    }

    const payload = {
      name: (fd.get("name") as string)?.trim(),
      email: (fd.get("email") as string)?.trim(),
      message: msg.trim(),
      meta: {
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
        tookMs,
      },
    }

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in all fields.")
      return
    }

    try {
      setSubmitting(true)

      // Animate button to loading state
      gsap.to(".submit-btn", {
        scale: 0.95,
        duration: 0.2,
      })

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(text || `Request failed with ${res.status}`)
      }

      // Success animation
      gsap.to(".submit-btn", {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
      })

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
    <section ref={sectionRef} id="contact" className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
        <h2 className="contact-heading text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary/70" />
            <span className="relative inline-block">
              Let's Talk
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/50 to-primary/0"
              />
            </span>
          </span>
        </h2>
        <p className="contact-subtext mt-2 text-muted-foreground max-w-prose">
          Have a project in mind? Send me a message and I'll get back to you within 24 hours.
        </p>

        {/* Status messages */}
        {success && (
          <Alert className="mt-4 border-emerald-500/40 bg-emerald-500/10">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <AlertTitle>Sent!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="mt-4 border-destructive/40">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          ref={formRef}
          className="mt-6 grid gap-4 sm:max-w-md"
          method="post"
          onSubmit={handleSubmit}
          aria-busy={submitting}
        >
          {/* Honeypot */}
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden>
            <Label htmlFor="company_website">Website</Label>
            <Input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="form-field grid gap-1.5">
            <Label htmlFor="name">
              Name<span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              required
              disabled={submitting}
              className="transition-all focus:scale-[1.01]"
            />
          </div>

          <div className="form-field grid gap-1.5">
            <Label htmlFor="email">
              Email<span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={submitting}
              className="transition-all focus:scale-[1.01]"
            />
          </div>

          <div className="form-field grid gap-1.5">
            <Label htmlFor="msg">
              Message<span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="msg"
              name="message"
              placeholder="Tell me about your project..."
              maxLength={MSG_LIMIT}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
              disabled={submitting}
              className="min-h-[120px] transition-all focus:scale-[1.005]"
            />
            <div className="text-xs text-muted-foreground text-right" aria-live="polite">
              {msg.length}/{MSG_LIMIT}
            </div>
          </div>

          <div className="form-field mt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="submit-btn gap-2 w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden />
                  Send Message
                </>
              )}
            </Button>
          </div>

          <p className="form-field text-xs text-muted-foreground mt-2">
            Privacy by design. PIPEDA/CASL compliant. GDPR support available.
          </p>
        </form>
      </div>
    </section>
  )
}
