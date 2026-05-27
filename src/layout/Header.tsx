import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
} from "@/components/ui/navigation-menu"
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
  const progressRef = useRef<HTMLDivElement>(null)
  const scrolledRef = useRef(false)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0
      // Update progress bar via DOM directly to avoid re-renders
      const doc = document.documentElement
      const h = doc.scrollHeight - doc.clientHeight
      const p = h > 0 ? Math.min(1, Math.max(0, y / h)) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`
      }
      // Only trigger re-render when scrolled state actually changes
      const nowScrolled = y > 8
      if (nowScrolled !== scrolledRef.current) {
        scrolledRef.current = nowScrolled
        setScrolled(nowScrolled)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return { scrolled, progressRef }
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
  const { scrolled, progressRef } = useScrollInfo()
  const { toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)

  // Escape key closes mobile overlay
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* progress bar */}
        <div
          ref={progressRef}
          aria-hidden
          className="pointer-events-none h-0.5 w-full origin-left bg-primary/50"
          style={{ transform: "scaleX(0)" }}
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              className="ml-auto flex flex-col justify-center gap-[5px] p-2 md:hidden"
              style={{ position: "relative", zIndex: 100 }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              type="button"
            >
              <span className={`block h-[2px] w-5 rounded-full bg-foreground transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-3.5 rounded-full bg-primary transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-[2px] w-5 rounded-full bg-foreground transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay — outside header to avoid backdrop-filter containing block */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <nav className="flex flex-col items-center gap-6">
          {links.map(({ href, label, Icon }) => {
            const isActive = active && href === `#${active}`
            return (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center gap-3 text-xl font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                ].join(" ")}
              >
                {Icon ? <Icon className="h-5 w-5 opacity-60" aria-hidden /> : null}
                {label}
              </a>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="mt-10 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <ClientDashboardModal>
            <Button onClick={() => setOpen(false)}>
              Client Area
            </Button>
          </ClientDashboardModal>
        </div>
      </div>
    </>
  )
}
