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
import {useRouter} from "next/navigation";
import {useTeamContext} from "@/context/team-context";

export default function NewTaskDialog({open, setOpen}: {open: boolean, setOpen: (value: boolean) => void}) {
    const {tasks, setTasks, selectedFolder} = useTeamContext();

    const [isPending, startTransition] = useTransition()

    const [data, setData] = useState<TeamDataType>({
        name: ''
    });

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const action = (formData: FormData) => {
        startTransition(async () => {
            /*try {
                const team = await createTeam(data.name);
                setData({
                    name: ''
                })
                setOpen(false);
                setTeams([...teams, team]);
                router.push(`/dashboard/teams/${team.id}`);
            } catch (error: any) {
                setError(error.message);
            }*/

            setTasks((tasks) => [...tasks, {
                id: 1,
                name: data.name,
                folder: selectedFolder,
            }]);
            setData({
                name: ''
            })
            setOpen(false);
        });
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create task</DialogTitle>
                    <DialogDescription>
                        Create a new task.
                    </DialogDescription>
                </DialogHeader>
                <form action={action}>
                    <div>
                        <span className={`${error ? 'block' : 'hidden'} text-sm text-destructive`}>{error}</span>
                        <div className="space-y-4 py-2 pb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Task name</Label>
                                <Input id="name" placeholder="Acme Inc." value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type={'button'} variant="outline" onClick={() => setOpen(false)}>
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