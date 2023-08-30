'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useTransition} from "react";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useRouter} from "next/navigation";

export default function HomeComponent() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    const action = () => {
        startTransition(async () => {
            router.push('/dashboard');
        });
    }

    return (
        <Button onClick={action} disabled={isPending}>
            {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Dashboard access
        </Button>
    )
}