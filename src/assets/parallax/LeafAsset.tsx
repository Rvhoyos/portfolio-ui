import { forwardRef } from "react"

export interface LayeredSVGProps {
    className?: string
    layer1Ref?: React.Ref<SVGGElement>
    layer2Ref?: React.Ref<SVGGElement>
    layer3Ref?: React.Ref<SVGGElement>
}

/**
 * Multi-layered leaf SVG with 3 depth layers for parallax animation.
 * Each layer can be animated independently via refs.
 */
export const LeafAsset = forwardRef<SVGSVGElement, LayeredSVGProps>(
    ({ className, layer1Ref, layer2Ref, layer3Ref }, ref) => {
        return (
            <svg
                ref={ref}
                viewBox="0 0 120 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                {/* Layer 1: Background glow (slowest movement) */}
                <g ref={layer1Ref}>
                    <ellipse
                        cx="60"
                        cy="80"
                        rx="45"
                        ry="60"
                        fill="url(#leafGlow)"
                        opacity="0.3"
                    />
                </g>

                {/* Layer 2: Leaf body (medium speed) */}
                <g ref={layer2Ref}>
                    <path
                        d="M60 20C35 40 25 70 30 100C35 125 50 145 60 150C70 145 85 125 90 100C95 70 85 40 60 20Z"
                        fill="url(#leafGradient)"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                    />
                </g>

                {/* Layer 3: Vein details (fastest movement, rotates) */}
                <g ref={layer3Ref}>
                    <path
                        d="M60 35V140"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M60 50L45 70M60 70L75 90M60 90L45 110M60 110L75 125"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                        strokeLinecap="round"
                    />
                </g>

                <defs>
                    <radialGradient id="leafGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="leafGradient" x1="60" y1="20" x2="60" y2="150" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
            </svg>
        )
    }
)
LeafAsset.displayName = "LeafAsset"
