import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface AccessibilityModalProps {
    children: React.ReactNode
}

export function AccessibilityModal({ children }: AccessibilityModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Accessibility Statement</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                        raulhoyos.com is committed to ensuring digital accessibility for people with disabilities.
                        We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                    </p>

                    <div>
                        <h3 className="font-semibold text-foreground mb-1">Conformance status</h3>
                        <p>
                            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
                            This site has been self-assessed and we believe it partially conforms with WCAG 2.1 AA.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-1">Feedback</h3>
                        <p>
                            If you encounter accessibility barriers on this site, please reach out via the contact form below.
                            We aim to respond within 5 business days.
                        </p>
                    </div>

                    <p className="text-xs">Last reviewed on 2026-05-27.</p>
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button asChild className="w-full sm:w-auto">
                            <a href="#contact">
                                <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
                                Go to contact form
                            </a>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
