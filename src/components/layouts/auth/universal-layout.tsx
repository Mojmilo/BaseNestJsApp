import {verifyToken} from "@/lib/auth";
import {getUser} from "@/lib/user";
import {AuthDataType} from "@/types";
import {AuthProvider} from "@/components/providers/auth-provider";

type UniversalLayoutProps = {
    children: React.ReactNode,
}

export default async function UniversalLayout({ children }: UniversalLayoutProps) {
    const verifiedToken = await verifyToken().catch((err) => {
        console.error(err.message);
    });

    const data: AuthDataType = {
        user: null
    };

    if (verifiedToken) {
        data.user = await getUser();
    }

    return (
        <AuthProvider data={data}>
            {children}
        </AuthProvider>
    )
}