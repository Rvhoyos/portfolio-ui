import { AppShell } from "@/layout/AppShell"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Stack } from "@/sections/Stack"
import { Services } from "@/sections/Services"
import { Projects } from "@/sections/Projects"
import { Contact } from "@/sections/Contact"

export default function App() {
  return (
    <AppShell>
      <Hero />
      <About />
      <Stack />
      <Services />
      <Projects />
      <Contact />
    </AppShell>
  )
}
