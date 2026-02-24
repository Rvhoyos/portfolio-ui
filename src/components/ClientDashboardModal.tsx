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
                    <DialogTitle>Client Dashboard & Portal</DialogTitle>
                    <DialogDescription className="pt-2 space-y-2">
                        <p>
                            Expected launch in <strong>March</strong>.
                        </p>
                        <p>
                            Featuring a custom proposals system with flexible payment plans (Stripe integrated), website templates, shop items, and other Dev/Ops services!
                        </p>
                        <p className="text-muted-foreground text-xs pt-2">
                            The client area is currently under active development and private testing. Proceeding will take you to a password-protected staging environment.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <Button asChild className="w-full sm:w-auto">
                        <a href="https://clients-staging.raulhoyos.com" target="_blank" rel="noreferrer">
                            Proceed to Staging <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
