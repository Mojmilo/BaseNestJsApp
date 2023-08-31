'use client';

import {useTeamContext} from "@/context/team-context";

export default function TasksComponent() {
    const {tasks, setTasks, selectedFolder} = useTeamContext();

    return (
        <div className={'flex flex-col items-center justify-center w-full h-full bg-muted'}>
            {
                selectedFolder ? (
                    tasks.filter((task) => task.folder === selectedFolder).length > 0 ? (
                        <div className={'flex flex-col items-center justify-start w-full h-full gap-2 p-2'}>
                            {
                                tasks.filter((task) => task.folder === selectedFolder).map((task, index) => (
                                    <div key={index} className={'flex flex-col items-center justify-center w-full gap-2 p-2 rounded-lg bg-white'}>
                                        {task.name}
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className={'flex flex-col items-center justify-center w-full h-full gap-5'}>
                            <span className={'text-2xl font-semibold'}>No tasks</span>
                            <span className={'text-sm font-extralight'}>Create a new task.</span>
                        </div>
                    )
                ) : (
                    <div className={'flex flex-col items-center justify-center h-full'}>
                        <span className={'px-4 py-2 rounded-lg border border-dashed text-muted-foreground'}>No team selected</span>
                    </div>
                )
            }
        </div>
    )
}