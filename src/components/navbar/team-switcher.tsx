"use client"

import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useDashboardContext} from "@/context/dashboard-context";
import NewTeamDialog from "@/components/new-team-dialog";
import {useRouter} from "next/navigation";
import {useTeamContext} from "@/context/team-context";
import {useTransition} from "react";
import {Team} from "@prisma/client";
import {Icons} from "@/components/icons";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const {teams, setTeams} = useDashboardContext();
    const {team, setTeam} = useTeamContext();
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null)

    const action = (team: Team) => {
        setSelectedTeam(team)
        startTransition(async () => {
            router.push(`/dashboard/teams/${team.id}`)
        });
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    {team ? (
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("w-[200px] justify-between", className)}
                        >
                            <Avatar className="mr-2 h-5 w-5">
                                <AvatarImage
                                    src={`https://avatar.vercel.sh/${team.name}.png`}
                                    alt={team.name}
                                />
                                <AvatarFallback>{team.name?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {team.name}
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("w-[200px] justify-between", className)}
                        >
                            <span className="mr-2">Select a team</span>
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    )}
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search team..." />
                            <CommandGroup heading={'Teams'}>
                                {teams.map((t) => (
                                    <CommandItem
                                        key={t.id}
                                        onSelect={() => action(t)}
                                        className="text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage
                                                src={`https://avatar.vercel.sh/${t.name}.png`}
                                                alt={t.name}
                                                className="grayscale"
                                            />
                                            <AvatarFallback>{t.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {t.name}
                                        {isPending ? selectedTeam?.id === t.id && (
                                            <Icons.spinner className="ml-auto h-4 w-4 animate-spin" />
                                        ) : (
                                            team && (
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        team.id === t.id
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            )
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandEmpty>No team found.</CommandEmpty>
                        </CommandList>
                        <CommandSeparator />
                    </Command>
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() => {
                                        setOpen(false)
                                        setShowNewTeamDialog(true)
                                    }}
                                >
                                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                                    Create Team
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <NewTeamDialog showNewTeamDialog={showNewTeamDialog} setShowNewTeamDialog={setShowNewTeamDialog} />
        </>
    )
}