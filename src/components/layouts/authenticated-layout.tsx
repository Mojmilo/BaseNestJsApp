import {redirect} from "next/navigation";
import {verifyToken} from "@/lib/auth";
import {getUser} from "@/lib/user";
import {UserRole} from "@prisma/client";

export default async function AuthenticatedLayout({ children, roles, rolesRedirect }: { children: React.ReactNode, roles?: UserRole[], rolesRedirect?: string }) {
    const verifiedToken = await verifyToken().catch((err) => {
        console.error(err.message);
    });

    if (!verifiedToken) {
        redirect('/auth/login');
    }

    if (roles) {
        const user = await getUser();

        if (!roles.every((role) => user?.roles.includes(role))) {
            redirect(rolesRedirect || '/');
        }
    }

    // roles={['USER', 'ADMIN']} rolesRedirect={'/dashboard'}

    return (
        <>{children}</>
    )
}