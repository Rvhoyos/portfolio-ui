import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(Flip, ScrollTrigger)

export { gsap, Flip, ScrollTrigger, useGSAP }
