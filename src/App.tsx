import { AppShell } from "@/layout/AppShell"
import { Hero } from "@/sections/Hero"
import { PersonalIntro } from "@/sections/PersonalIntro"
import { About } from "@/sections/About"
import { Stack } from "@/sections/Stack"
import { Services } from "@/sections/Services"
import { Projects } from "@/sections/Projects"
import { Blog } from "@/sections/Blog"
import { Contact } from "@/sections/Contact"

export default function App() {
  return (
    <AppShell>
      <Hero />
      <PersonalIntro />
      <About />
      <Stack />
      <Services />
      <Projects />
      <Blog />
      <Contact />
    </AppShell>
  )
}
