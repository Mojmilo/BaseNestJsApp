'use client';

import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/context/auth-context";

export default function HomeComponent() {
    const {user} = useAuthContext();
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    const action = () => {
        startTransition(async () => {
            router.push('/dashboard');
        });
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            {
                user ? (
                    <span>Connected : {user?.name}</span>
                ) : (
                    <span>Not connected</span>
                )
            }
            <Button onClick={action} disabled={isPending}>
                {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Dashboard access
            </Button>
        </div>
    )
}