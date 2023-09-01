import {ConnectAccount} from "@/components/connect-account";
import GuestLayout from "@/components/layouts/auth/guest-layout";

export default function Login() {
    return (
        <GuestLayout>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <ConnectAccount />
            </main>
        </GuestLayout>
    )
}