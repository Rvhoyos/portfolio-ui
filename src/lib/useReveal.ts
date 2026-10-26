import type { RefObject } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

// One entrance for every section. Kept short and eased out: NN/g puts most UI motion at 100-500 ms,
// and chained multi-second timelines read as sluggish
export function useReveal(scope: RefObject<HTMLElement | null>, selector = "[data-reveal]") {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.fromTo(
      selector,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
      },
    )
  }, { scope })
}
