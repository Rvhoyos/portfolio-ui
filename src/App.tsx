import { AppShell } from "@/layout/AppShell"
import { Hero } from "@/sections/Hero"
import { Author } from "@/sections/Author"
import { About } from "@/sections/About"
import { Stack } from "@/sections/Stack"
import { Projects } from "@/sections/Projects"
import { Contact } from "@/sections/Contact"

export default function App() {
  return (
    <AppShell>
      <Hero />
      <Author />
      <About />
      <Stack />
      <Projects />
      <Contact />
    </AppShell>
  )
}
