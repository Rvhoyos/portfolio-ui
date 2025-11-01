import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">Raul Hoyos</a>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink href={l.href} className="px-3 py-2">
                    {l.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Open navigation">Menu</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="py-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded hover:bg-accent"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <Separator className="my-2" />
              <a href="#contact" onClick={() => setOpen(false)} className="block px-2 py-2">
                Contact
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
