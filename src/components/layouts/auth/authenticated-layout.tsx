import {redirect} from "next/navigation";
import {verifyToken} from "@/lib/auth";
import {getUser} from "@/lib/user";
import {UserRole} from "@prisma/client";
import {AuthDataType} from "@/types";
import {AuthProvider} from "@/components/providers/auth-provider";

type AuthenticatedLayoutProps = {
    children: React.ReactNode,
    redirectURL?: string, // Redirect to this URL if the user is not authenticated (default: '/auth/login')
    roles?: UserRole[], // Roles that are allowed to access this page (example: ['USER', 'ADMIN'])
    rolesRedirectURL?: string // Redirect to this URL if the user is not allowed to access this page (default: '/')
}

export default async function AuthenticatedLayout({ children, redirectURL, roles, rolesRedirectURL }: AuthenticatedLayoutProps) {
    const verifiedToken = await verifyToken().catch((err) => {
        console.error(err.message);
    });

    if (!verifiedToken) {
        redirect(redirectURL || '/auth/login');
    }

    const user = await getUser();

    if (!user) {
        redirect(redirectURL || '/auth/login');
    }

    if (roles) {
        if (!roles.every((role) => user.roles.includes(role))) {
            redirect(rolesRedirectURL || '/');
        }
    }

    const data: AuthDataType = {
        user: user
    };

    return (
        <AuthProvider data={data}>
            {children}
        </AuthProvider>
    )
}