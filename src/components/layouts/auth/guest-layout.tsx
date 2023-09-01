import {redirect} from "next/navigation";
import {verifyToken} from "@/lib/auth";

type GuestLayoutProps = {
    children: React.ReactNode
    redirectURL?: string // Redirect to this URL if the user is authenticated (default: '/dashboard')
}

export default async function GuestLayout({ children, redirectURL }: GuestLayoutProps) {
    const verifiedToken = await verifyToken().catch((err) => {
        console.error(err.message);
    });

    if (verifiedToken) {
        redirect(redirectURL || '/dashboard');
    }

    return (
        <>{children}</>
    )
}