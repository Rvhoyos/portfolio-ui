import { Fragment, type ReactNode } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

type Policy = { label: string; title: string; summary: string; body: ReactNode }

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 font-semibold text-foreground">{heading}</h3>
      <p>{children}</p>
    </div>
  )
}

const policies: Policy[] = [
  {
    label: "Privacy",
    title: "Privacy",
    summary: "What I collect when you use this site, and what happens to it.",
    body: (
      <>
        <Section heading="What I collect">
          The name, email address and message you send through the contact form, and basic server logs.
        </Section>
        <Section heading="How I use it">To reply to you and to run the site.</Section>
        <Section heading="How long I keep it">
          Server logs for about 30 to 90 days. Messages for 12 to 24 months, or until you ask me to delete them.
        </Section>
        <Section heading="Who handles it">Contact form messages are delivered through a Cloudflare Worker.</Section>
      </>
    ),
  },
  {
    label: "Terms",
    title: "Terms of use",
    summary: "The few rules for using this site.",
    body: (
      <>
        <Section heading="Using the site">
          Use it lawfully. Don't attack it, abuse it, or scrape it aggressively.
        </Section>
        <Section heading="Content">
          Everything here is provided as is. My liability is limited as far as the law allows.
        </Section>
        <Section heading="Governing law">The laws of Ontario, Canada govern these terms.</Section>
      </>
    ),
  },
  {
    label: "Cookies",
    title: "Cookies",
    summary: "This site doesn't use cookies.",
    body: (
      <Section heading="Theme preference">
        If you switch between light and dark mode, that choice is saved in your browser's local storage so it
        sticks on your next visit. It stays on your device and is never sent to me.
      </Section>
    ),
  },
  {
    label: "Accessibility",
    title: "Accessibility statement",
    summary:
      "I want this site to be usable by everyone, including people with disabilities, and I keep improving it against the relevant accessibility standards.",
    body: (
      <>
        <Section heading="Conformance status">
          I aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. I've self-assessed the
          site, and I believe it partially conforms with WCAG 2.1 AA.
        </Section>
        <Section heading="Feedback">
          If you encounter accessibility barriers on this site, please reach out through the contact form. I'll get
          back to you as soon as I can.
        </Section>
        <p className="text-xs">Last reviewed on 2026-05-27.</p>
      </>
    ),
  },
]

function PolicyDialog({ policy }: { policy: Policy }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="hover:text-foreground focus-visible:outline-none focus-visible:underline">
          {policy.label}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{policy.title}</DialogTitle>
          <DialogDescription>{policy.summary}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">{policy.body}</div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button asChild className="w-full sm:w-auto">
              <a href="#contact">
                <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
                Go to contact form
              </a>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function PolicyLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {policies.map((policy, i) => (
        <Fragment key={policy.label}>
          {i > 0 && <span aria-hidden>•</span>}
          <PolicyDialog policy={policy} />
        </Fragment>
      ))}
    </div>
  )
}
