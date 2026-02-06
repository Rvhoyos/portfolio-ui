import { AppShell } from "@/layout/AppShell"
import { Hero } from "@/sections/Hero"
import { Author } from "@/sections/Author"
import { About } from "@/sections/About"
import { Blog } from "@/sections/Blog"
import { Stack } from "@/sections/Stack"
import { Projects } from "@/sections/Projects"
import { Contact } from "@/sections/Contact"

export default function App() {
  return (
    <AppShell>
      <Hero />
      {/* Author + About side by side */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <About />
            <Author />
          </div>
        </div>
      </section>
      <Blog />
      <Stack />
      <Projects />
      <Contact />
    </AppShell>
  )
}
