import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="text-xl font-medium">Contact</h2>
      <p className="mt-2 text-muted-foreground">For now this is a static form—wire later.</p>

      <form className="mt-4 grid gap-4 sm:max-w-xl">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="msg">Message</Label>
          <Textarea id="msg" placeholder="Tell me a bit about the project…" />
        </div>
        <Button type="button">Send</Button>
      </form>
    </section>
  )
}
