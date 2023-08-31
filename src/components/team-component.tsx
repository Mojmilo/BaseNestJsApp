'use client';

import {useDashboardContext} from "@/context/dashboard-context";
import {useTeamContext} from "@/context/team-context";
import {Button} from "@/components/ui/button";
import {Team} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {Icons} from "@/components/icons";
import * as React from "react";
import {deleteTeam} from "@/lib/teams";

export default function TeamComponent() {
    const {team, setTeam} = useTeamContext();
    const {teams, setTeams} = useDashboardContext();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const action = () => {
        startTransition(async () => {
            await deleteTeam(team!);
            setTeams(teams.filter((t: Team) => t.id !== team?.id));
            router.push(`/dashboard`)
        });
    }

    return (
        <div className={'flex flex-row justify-between items-center w-full gap-5'}>
            <div className={'flex flex-col items-start justify-center gap-5'}>
                <h2 className={'text-4xl font-semibold'}>{team?.name}</h2>
                <span className={'text-sm font-extralight'}>Comment on this team</span>
            </div>

            <Button disabled={isPending} onClick={action}>
                {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Delete
            </Button>
        </div>
    )
}