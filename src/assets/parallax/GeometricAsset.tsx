import { forwardRef } from "react"
import type { LayeredSVGProps } from "./LeafAsset"

/**
 * Multi-layered geometric shapes (circles, rings) for parallax animation.
 * Each layer moves at different speeds during scroll.
 */
export const GeometricAsset = forwardRef<SVGSVGElement, LayeredSVGProps>(
    ({ className, layer1Ref, layer2Ref, layer3Ref }, ref) => {
        return (
            <svg
                ref={ref}
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                {/* Layer 1: Outer ring (slowest) */}
                <g ref={layer1Ref}>
                    <circle
                        cx="70"
                        cy="70"
                        r="60"
                        stroke="url(#ringGradient1)"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.4"
                    />
                    <circle
                        cx="70"
                        cy="70"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                        opacity="0.2"
                        strokeDasharray="4 6"
                    />
                </g>

                {/* Layer 2: Middle elements (medium speed) */}
                <g ref={layer2Ref}>
                    <circle
                        cx="70"
                        cy="70"
                        r="35"
                        fill="url(#circleGradient)"
                        opacity="0.15"
                    />
                    <circle
                        cx="70"
                        cy="70"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.3"
                    />
                </g>

                {/* Layer 3: Inner details (fastest, rotates) */}
                <g ref={layer3Ref}>
                    <circle
                        cx="70"
                        cy="70"
                        r="12"
                        fill="hsl(var(--primary))"
                        opacity="0.2"
                    />
                    <circle
                        cx="70"
                        cy="70"
                        r="6"
                        fill="hsl(var(--primary))"
                        opacity="0.4"
                    />
                    {/* Decorative lines */}
                    <line x1="70" y1="45" x2="70" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <line x1="70" y1="85" x2="70" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <line x1="45" y1="70" x2="55" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <line x1="85" y1="70" x2="95" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </g>

                <defs>
                    <linearGradient id="ringGradient1" x1="10" y1="10" x2="130" y2="130">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    </linearGradient>
                    <radialGradient id="circleGradient" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
        )
    }
)
GeometricAsset.displayName = "GeometricAsset"
