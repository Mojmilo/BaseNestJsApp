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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect, useState, useTransition} from "react";
import {TeamDataType} from "@/types/auth";
import {createTeam, getTeams} from "@/lib/user";
import {Icons} from "@/components/icons";
import {Team} from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<Team>()

    const [isPending, startTransition] = useTransition()

    const [data, setData] = useState<TeamDataType>({
        name: ''
    });

    const [error, setError] = useState<string | null>(null);

    const getTeamsData = () => {
        startTransition(async () => {
            try {
                const teams = await getTeams();
                setTeams(teams);
                setSelectedTeam(teams[0])
            } catch (error: any) {
                console.log(error.message);
            }
        });
    }

    useEffect(() => {
        getTeamsData();
    }, [])

    const action = (formData: FormData) => {
        startTransition(async () => {
            try {
                const team = await createTeam(data.name);
                setData({
                    name: ''
                })
                setShowNewTeamDialog(false);
                getTeamsData();
                setSelectedTeam(team)
            } catch (error: any) {
                setError(error.message);
            }
        });
    }

    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    {selectedTeam ? (
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("w-[200px] justify-between", className)}
                        >
                            <Avatar className="mr-2 h-5 w-5">
                                <AvatarImage
                                    src={`https://avatar.vercel.sh/${selectedTeam.name}.png`}
                                    alt={selectedTeam.name}
                                />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            {selectedTeam.name}
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
                            <PlusCircledIcon className="mr-2 h-5 w-5" />
                            Create Team
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    )}
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search team..." />
                            <CommandGroup heading={'Teams'}>
                                {teams.map((team) => (
                                    <CommandItem
                                        key={team.id}
                                        onSelect={() => {
                                            setSelectedTeam(team)
                                            setOpen(false)
                                        }}
                                        className="text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage
                                                src={`https://avatar.vercel.sh/${team.name}.png`}
                                                alt={team.name}
                                                className="grayscale"
                                            />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        {team.name}
                                        {selectedTeam && (
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedTeam.id === team.id
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
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
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Team
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create team</DialogTitle>
                    <DialogDescription>
                        Add a new team to manage products and customers.
                    </DialogDescription>
                </DialogHeader>
                <form action={action}>
                    <div>
                        <span className={`${error ? 'block' : 'hidden'} text-sm text-destructive`}>{error}</span>
                        <div className="space-y-4 py-2 pb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Team name</Label>
                                <Input id="name" placeholder="Acme Inc." value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isPending && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}{" "}
                            Continue
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}