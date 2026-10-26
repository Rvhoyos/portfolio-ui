import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sun, Moon } from "lucide-react"

type LinkItem = { href: `#${string}`; label: string }

// About and the author card share one section, so they share one link
const links: LinkItem[] = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
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

type Theme = "light" | "dark"

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme")
    return stored === "light" || stored === "dark" ? stored : null
  } catch {
    return null
  }
}

// The system preference is followed until the visitor picks a theme; only an explicit toggle is saved
function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => readStoredTheme() ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      if (!readStoredTheme()) setTheme(e.matches ? "dark" : "light")
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit
    }
    setTheme(next)
  }
  return { toggle }
}

function useActiveSection(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>("")
  const activeRef = useRef(active)

  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const handler = () => {
      // Nothing is active until a section reaches the viewport, so the hero highlights no link
      let current = ""
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

const SECTION_IDS = ["about", "stack", "projects", "contact"]

export function Header() {
  const [open, setOpen] = useState(false)
  const { scrolled, progressRef } = useScrollInfo()
  const { toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          ref={progressRef}
          aria-hidden
          className="pointer-events-none h-0.5 w-full origin-left bg-primary/50"
          style={{ transform: "scaleX(0)" }}
        />

        <div className="relative border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div
            aria-hidden
            className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"
              }`}
          />

          <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4">
            <a href="#" className="group font-semibold tracking-tight text-base md:text-lg transition-all">
              <span
                className="inline-block transition-all duration-200 group-hover:-translate-y-[1.5px]
                           group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-primary/80
                           group-hover:bg-clip-text group-hover:text-transparent"
              >
                Raul Hoyos
              </span>
            </a>

            <nav className="ml-auto hidden md:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {links.map((l) => {
                    const isActive = active && l.href === `#${active}`
                    return (
                      <NavigationMenuItem key={l.href}>
                        <NavigationMenuLink
                          href={l.href}
                          aria-current={isActive ? "page" : undefined}
                          className={[
                            "relative rounded-full px-4 py-2 text-sm transition-colors",
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

            <div className="ml-2 hidden items-center border-l border-border pl-2 md:flex">
              <Button
                size="icon"
                variant="ghost"
                type="button"
                aria-label="Toggle theme"
                onClick={toggle}
                className="h-10 w-10"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>

            <button
              onClick={() => setOpen(o => !o)}
              className="ml-auto flex flex-col justify-center gap-[5px] p-3 md:hidden"
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

      {/* Mobile overlay lives outside <header> to avoid backdrop-filter containing block */}
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
        <nav className="flex flex-col items-center gap-7">
          {links.map(({ href, label }) => {
            const isActive = active && href === `#${active}`
            return (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={[
                  "text-2xl font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                ].join(" ")}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div className="mt-10 w-48 border-t border-border pt-6">
          <Button variant="outline" type="button" onClick={toggle} className="w-full gap-2">
            <Moon className="h-4 w-4 dark:hidden" aria-hidden />
            <Sun className="hidden h-4 w-4 dark:block" aria-hidden />
            <span className="dark:hidden">Dark mode</span>
            <span className="hidden dark:inline">Light mode</span>
          </Button>
        </div>
      </div>
    </>
  )
}
