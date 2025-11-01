export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Raul Hoyos</span>
          <a href="#contact" className="text-foreground hover:underline">Get in touch</a>
        </div>

        <p className="mt-3 max-w-prose">
          Privacy by design. Compliance baseline: PIPEDA/CASL (Canada). GDPR add-on available.
          Sub-processors documented per engagement.
        </p>
      </div>
    </footer>
  )
}
