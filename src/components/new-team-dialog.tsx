import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useState, useTransition} from "react";
import {TeamDataType} from "@/types/auth";
import {createTeam} from "@/lib/user";
import {useDashboardContext} from "@/context/dashboard-context";

export default function NewTeamDialog({showNewTeamDialog, setShowNewTeamDialog}: {showNewTeamDialog: boolean, setShowNewTeamDialog: (value: boolean) => void}) {
    const {teams, setTeams, selectedTeam, setSelectedTeam} = useDashboardContext();

    const [isPending, startTransition] = useTransition()

    const [data, setData] = useState<TeamDataType>({
        name: ''
    });

    const [error, setError] = useState<string | null>(null);

    const action = (formData: FormData) => {
        startTransition(async () => {
            try {
                const team = await createTeam(data.name);
                setData({
                    name: ''
                })
                setShowNewTeamDialog(false);
                setTeams([...teams, team]);
                setSelectedTeam(team)
            } catch (error: any) {
                setError(error.message);
            }
        });
    }
    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
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
                        <Button type={'button'} variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
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