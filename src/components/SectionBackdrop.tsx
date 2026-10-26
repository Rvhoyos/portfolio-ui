import { cn } from "@/lib/utils"

// Decorative photo behind a section. The parent needs `relative isolate overflow-hidden`.
// Faded low so body text keeps its contrast, and feathered top and bottom so neighbouring
// sections blend instead of meeting at a hard photo edge
export function SectionBackdrop({
  small,
  large,
  position = "object-center",
  priority = false,
  fadeTop = true,
}: {
  small: string
  large: string
  position?: string
  priority?: boolean
  fadeTop?: boolean
}) {
  return (
    <>
      <img
        src={small}
        srcSet={`${small} 1200w, ${large} 2400w`}
        sizes="100vw"
        alt=""
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover opacity-20 dark:opacity-25",
          position,
        )}
      />
      {fadeTop && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/4 bg-gradient-to-b from-background to-transparent" />
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </>
  )
}
