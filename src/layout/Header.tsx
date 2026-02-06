import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  Sun, Moon, Info, Boxes, LayoutDashboard, Mail
} from "lucide-react"
import { ClientDashboardModal } from "@/components/ClientDashboardModal"

type LinkItem = { href: `#${string}`; label: string; Icon?: React.ComponentType<{ className?: string }> }

const links: LinkItem[] = [
  { href: "#author", label: "Author", Icon: Info },
  { href: "#about", label: "About", Icon: Info },
  { href: "#stack", label: "Stack", Icon: Boxes },
  { href: "#projects", label: "Projects", Icon: LayoutDashboard },
  { href: "#contact", label: "Contact", Icon: Mail },
]

function useScrollInfo() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0
      setScrolled(y > 8)
      const doc = document.documentElement
      const h = doc.scrollHeight - doc.clientHeight
      setProgress(h > 0 ? Math.min(1, Math.max(0, y / h)) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return { scrolled, progress }
}

function useTheme() {
  const getPreferred = () => {
    if (typeof window === "undefined") return "system" as const
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  const [theme, setTheme] = useState<"light" | "dark" | "system">(getPreferred)

  useEffect(() => {
    if (theme === "system") return
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem("theme")) return
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = (e: MediaQueryListEvent | MediaQueryList) => {
      const dark = "matches" in e ? e.matches : (e as MediaQueryList).matches
      document.documentElement.classList.toggle("dark", dark)
    }
    apply(mql)
    const handler = (e: MediaQueryListEvent) => apply(e)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"))
  return { toggle }
}

function useActiveSection(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? "")
  const activeRef = useRef(active)

  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const handler = () => {
      let current = activeRef.current
      let bestTop = Number.POSITIVE_INFINITY
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = Math.abs(rect.top - offset)
        if (rect.top <= window.innerHeight - 64 && top < bestTop) {
          bestTop = top
          current = id
        }
      }
      if (current !== activeRef.current) {
        setActive(current)
      }
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler)
    return () => {
      window.removeEventListener("scroll", handler)
      window.removeEventListener("resize", handler)
    }
  }, [ids, offset])
  return active
}

const SECTION_IDS = ["author", "about", "stack", "projects", "contact"]

export function Header() {
  const [open, setOpen] = useState(false)
  const { scrolled, progress } = useScrollInfo()
  const { toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50">
      {/* progress bar */}
      <div
        aria-hidden
        className="pointer-events-none h-0.5 w-full origin-left bg-primary/50 transition-transform duration-75"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* glass header */}
      <div className="relative border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div
          aria-hidden
          className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"
            }`}
        />

        <div className="mx-auto flex h-12 w-full max-w-7xl items-center gap-2 px-4">
          <a href="#" className="group font-semibold tracking-tight text-sm md:text-base transition-all">
            <span
              className="inline-block transition-all duration-200 group-hover:-translate-y-[1.5px]
                         group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-primary/80
                         group-hover:bg-clip-text group-hover:text-transparent"
            >
              Raul Hoyos
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="ml-auto hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((l) => {
                  const isActive = active && l.href === `#${active}`
                  return (
                    <NavigationMenuItem key={l.href}>
                      <NavigationMenuLink
                        href={l.href}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "relative rounded-full px-2 py-1.5 text-sm transition-colors",
                          isActive ? "bg-primary/10 text-foreground dark:bg-primary/15" : "text-foreground/80",
                          "hover:text-foreground",
                        ].join(" ")}
                      >
                        {l.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              type="button"
              aria-label="Toggle theme"
              onClick={toggle}
              className="h-8 w-8"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <ClientDashboardModal>
              <Button size="sm">
                Client Area
              </Button>
            </ClientDashboardModal>
          </div>

          {/* Mobile nav */}
          <div className="ml-auto md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" aria-label="Open navigation">Menu</Button>
              </SheetTrigger>

              {/* Adaptive narrow sheet; box-border avoids clipping from border width */}
              <SheetContent side="right" className="w-[min(92vw,20rem)] box-border p-0">
                <div className="flex h-full flex-col">
                  {/* Body */}
                  <div className="flex-1 overflow-y-auto px-3 pt-2 pb-3 space-y-1">
                    {links.map(({ href, label, Icon }) => {
                      const isActive = active && href === `#${active}`
                      return (
                        <a
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={[
                            "flex items-center gap-2 rounded px-2 py-2 transition-colors",
                            "hover:bg-muted/70 dark:hover:bg-muted/40",
                            isActive ? "bg-primary/10 dark:bg-primary/15" : "",
                          ].join(" ")}
                        >
                          {Icon ? <Icon className="h-4 w-4 opacity-70" aria-hidden /> : null}
                          <span className="min-w-0">{label}</span>
                        </a>
                      )
                    })}

                    <Separator className="my-3" />
                  </div>

                  {/* Footer: resize ONLY the CTA button; add safe-area padding to avoid right-edge cutoffs */}
                  <div
                    className="border-t border-border bg-background/95 px-3 py-2"
                    style={{ paddingRight: "max(env(safe-area-inset-right), 0.75rem)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        className="shrink-0 h-8 w-8"
                        type="button"
                        onClick={toggle}
                        aria-label="Toggle theme"
                      >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>

                      {/* CTA always fits: flex-auto + min-w-0 + tiny text + truncate */}
                      <Button asChild className="flex-auto min-w-0 h-9 px-3 text-[13px] leading-none truncate">
                        <ClientDashboardModal>
                          <Button
                            className="flex-auto min-w-0 h-9 px-3 text-[13px] leading-none truncate"
                            onClick={() => setOpen(false)}
                          >
                            Client Area
                          </Button>
                        </ClientDashboardModal>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </header>
  )
}
