import {AuthProvider} from "@/components/providers/auth-provider";
import {LayoutDataType} from "@/types";
import {getUser} from "@/lib/user";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const data: LayoutDataType = {
        user: await getUser()
    };

    return (
        <AuthProvider data={data}>
            {children}
        </AuthProvider>
    )
}