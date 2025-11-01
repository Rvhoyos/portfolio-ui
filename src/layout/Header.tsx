import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

const links = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 h-14 flex items-center gap-3">
        <a href="#" className="font-semibold tracking-tight">Raul Hoyos</a>

        {/* Desktop nav */}
        <nav className="ml-auto hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map(l => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink href={l.href} className="px-3 py-2">
                    {l.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="#contact">Get in touch</a>
          </Button>
        </div>

        {/* Mobile nav */}
        <div className="ml-auto md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Open navigation">Menu</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="px-2 py-2">
                {links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded hover:bg-accent"
                  >
                    {l.label}
                  </a>
                ))}
                <Separator className="my-3" />
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <a href="#contact">Get in touch</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
