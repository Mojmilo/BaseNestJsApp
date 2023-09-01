import {CreateAccount} from "@/components/create-account";
import GuestLayout from "@/components/layouts/guest-layout";

export default function Register() {
    return (
        <GuestLayout>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <CreateAccount />
            </main>
        </GuestLayout>
    )
}