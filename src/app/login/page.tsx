'use client';

import {ConnectAccount} from "@/components/connect-account";

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <ConnectAccount />
        </main>
    )
}