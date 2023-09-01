import {redirect} from "next/navigation";
import {verifyToken} from "@/lib/auth";

export default async function GuestLayout({ children }: { children: React.ReactNode }) {
    const verifiedToken = await verifyToken().catch((err) => {
        console.error(err.message);
    });

    if (verifiedToken) {
        redirect('/dashboard');
    }

    return (
        <>{children}</>
    )
}