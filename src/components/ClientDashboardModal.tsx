import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ClientDashboardModalProps {
    children: React.ReactNode
}

export function ClientDashboardModal({ children }: ClientDashboardModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Launching Soon</DialogTitle>
                    <DialogDescription className="pt-2 space-y-2">
                        <p>
                            Expected late February: <strong>Client Dashboard & Portal</strong>.
                        </p>
                        <p>
                            Featuring a custom proposals system with flexible payment plans (Stripe integrated), website templates, shop items, and other Dev/Ops services!
                        </p>
                        <p className="text-muted-foreground text-xs pt-2">
                            The site is currently under active development.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <Button asChild className="w-full sm:w-auto">
                        <a href="https://clients.raulhoyos.com" target="_blank" rel="noreferrer">
                            Proceed with Caution <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
