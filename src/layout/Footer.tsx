import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog"
import { SiGithub } from "@icons-pack/react-simple-icons"

// Minimal inline LinkedIn brand icon (avoids deprecated import)
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554V14.89c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.943v5.656H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.063 2.063 0 11.001-4.126 2.063 2.063 0 01-.001 4.126zM6.997 20.452H3.675V9h3.322v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer() {
  const [soonOpen, setSoonOpen] = useState(false)
  const year = new Date().getFullYear()

  return (
    <TooltipProvider>
      <footer className="relative border-t border-border">
        {/* subtle gradient hairline for polish */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          {/* Top: brand + socials (compact) */}
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            {/* Brand & Client Area */}
            <div>
              <div className="text-base font-semibold tracking-tight">Raul Hoyos</div>
              <p className="mt-1 text-sm text-muted-foreground max-w-prose">
                Reliable, observable and scalable modern web apps, APIs, and DevOps services.
              </p>
              <div className="mt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" type="button" onClick={() => setSoonOpen(true)}>
                      Client Area
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Socials (right-aligned on md+) */}
            <div className="md:justify-self-end">
              <div className="text-sm font-medium text-foreground/90">Find me</div>
              <div className="mt-2 flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label="GitHub"
                    >
                      <a href="https://github.com/rvhoyos" target="_blank" rel="noreferrer">
                        <SiGithub className="h-4 w-4" aria-hidden />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label="LinkedIn"
                    >
                      <a href="https://www.linkedin.com/in/raulhj/" target="_blank" rel="noreferrer">
                        <LinkedInIcon className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Bottom: small print (standard, compact)      */}
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} Raul Hoyos. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-3">
              <a href="/privacy" className="hover:text-foreground">Privacy</a>
              <span aria-hidden>•</span>
              <a href="/terms" className="hover:text-foreground">Terms</a>
              <span aria-hidden>•</span>
              <a href="/cookies" className="hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>

        {/* Coming soon dialog */}
        <Dialog open={soonOpen} onOpenChange={setSoonOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Client Area</DialogTitle>
              <DialogDescription>
                Private sign-in and project portal are on the roadmap.
              </DialogDescription>
            </DialogHeader>
            <div className="text-sm text-muted-foreground">
              You’ll be able to review proposals, track deployments, and manage billing.
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setSoonOpen(false)}>Okay</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </footer>
    </TooltipProvider>
  )
}
