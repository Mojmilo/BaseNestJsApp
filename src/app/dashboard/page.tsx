'use client';

import Navbar from "@/components/navbar";
import {useSessionContext} from "@/components/session-context-provider";

export default function Dashboard() {
    const {user, setUser} = useSessionContext();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            <div className="flex flex-col items-center justify-center gap-5">
                <span>{user?.name}</span>
                <span>{user?.email}</span>
                <span>{user?.password}</span>
            </div>
        </main>
    )
}
