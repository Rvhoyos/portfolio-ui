import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { LoaderCircle, Send, CircleCheck } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { SectionBackdrop } from "@/components/SectionBackdrop"
import bgSmall from "@/assets/photos/bg-sunset-1200.webp"
import bgLarge from "@/assets/photos/bg-sunset-2400.webp"
import { useReveal } from "@/lib/useReveal"

const API_ENDPOINT = "https://portfolioform.raultheta.workers.dev"
const MIN_T_MS = 1500
const MAX_T_MS = 2 * 60 * 60 * 1000

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  useReveal(sectionRef)

  return (
    <section ref={sectionRef} id="contact" className="relative isolate overflow-hidden border-t border-border scroll-mt-28">
      <SectionBackdrop small={bgSmall} large={bgLarge} position="object-[center_60%]" />
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <div data-reveal>
          <SectionHeading>Let's Work Together</SectionHeading>
          <p className="mt-3 text-base text-muted-foreground">
            Have a project or an idea you'd like to talk through? Send me a message and I'll get back to you as soon as I can.
          </p>
        </div>

        <Card data-reveal className="mt-6 border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
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
      const res = await fetch(API_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      if (!res.ok) { const text = await res.text().catch(() => ""); throw new Error(text || `Request failed with ${res.status}`) }
      setSuccess("Message sent! I'll get back to you soon.")
      form.reset()
      setMsg("")
      setRenderedAt(Date.now())
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong."
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {success && (
        <Alert className="mb-4 border-emerald-500/40 bg-emerald-500/10">
          <CircleCheck className="h-4 w-4 text-emerald-500" />
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name<span className="text-destructive">*</span></Label>
            <Input id="name" name="name" placeholder="Your name" autoComplete="name" required disabled={submitting} />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email">Email<span className="text-destructive">*</span></Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required disabled={submitting} />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="msg">Message<span className="text-destructive">*</span></Label>
          <Textarea id="msg" name="message" placeholder="Tell me about your project..." maxLength={MSG_LIMIT} value={msg} onChange={(e) => setMsg(e.target.value)} required disabled={submitting} className="min-h-[120px]" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="self-end text-xs text-muted-foreground sm:self-auto">{msg.length}/{MSG_LIMIT}</div>
          <Button type="submit" disabled={submitting} className="gap-2 w-full sm:w-auto sm:px-8">
            {submitting ? (<><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />Sending...</>) : (<><Send className="h-4 w-4" aria-hidden />Send Message</>)}
          </Button>
        </div>
      </form>
    </>
  )
}
