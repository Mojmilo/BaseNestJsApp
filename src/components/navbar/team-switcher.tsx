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

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const {teams, setTeams, selectedTeam, setSelectedTeam} = useDashboardContext();
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

    return (
        <>
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
                                <AvatarFallback>{selectedTeam.name?.charAt(0).toUpperCase()}</AvatarFallback>
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
                                            <AvatarFallback>{team.name?.charAt(0).toUpperCase()}</AvatarFallback>
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