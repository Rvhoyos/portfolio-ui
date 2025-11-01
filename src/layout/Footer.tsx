export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground flex items-center justify-between">
        <span>© {new Date().getFullYear()} Raul Hoyos</span>
        <a href="#contact" className="hover:underline">Get in touch</a>
      </div>
    </footer>
  )
}
