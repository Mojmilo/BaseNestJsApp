import {AuthProvider} from "@/components/providers/auth-provider";
import {AuthenticatedLayoutDataType} from "@/types";
import {getUser} from "@/lib/user";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const data: AuthenticatedLayoutDataType = {
        user: await getUser()
    };

    return (
        <AuthProvider data={data}>
            {children}
        </AuthProvider>
    )
}