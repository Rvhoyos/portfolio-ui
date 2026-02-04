import type { ReactNode } from 'react'
import { Header } from '@/layout/Header'
import { Footer } from '@/layout/Footer'
import { InteractiveBackground } from '@/components/InteractiveBackground'
import { ParallaxAsset, ParallaxContainer } from '@/components/ParallaxAsset'
import { LeafAsset } from '@/assets/parallax/LeafAsset'
import { GeometricAsset } from '@/assets/parallax/GeometricAsset'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/8 text-foreground">
      {/* Interactive gradient background */}
      <InteractiveBackground />

      {/* Parallax floating assets */}
      <ParallaxContainer>
        {/* Top-right leaf */}
        <ParallaxAsset
          id="leaf-1"
          top="15vh"
          right="8vw"
          size="100px"
          speed={0.2}
          rotate
          opacity={0.5}
        >
          <LeafAsset className="w-full h-full text-primary" />
        </ParallaxAsset>

        {/* Left-side geometric */}
        <ParallaxAsset
          id="geo-1"
          top="40vh"
          left="3vw"
          size="120px"
          speed={0.35}
          opacity={0.4}
        >
          <GeometricAsset className="w-full h-full text-primary" />
        </ParallaxAsset>

        {/* Bottom-right leaf */}
        <ParallaxAsset
          id="leaf-2"
          top="70vh"
          right="5vw"
          size="80px"
          speed={0.25}
          rotate
          opacity={0.35}
        >
          <LeafAsset className="w-full h-full text-primary" />
        </ParallaxAsset>

        {/* Middle-left geometric */}
        <ParallaxAsset
          id="geo-2"
          top="85vh"
          left="10vw"
          size="90px"
          speed={0.4}
          rotate
          opacity={0.3}
        >
          <GeometricAsset className="w-full h-full text-primary" />
        </ParallaxAsset>
      </ParallaxContainer>

      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
