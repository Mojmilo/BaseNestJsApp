'use client';

import {useTeamContext} from "@/context/team-context";
import {Button} from "@/components/ui/button";

export default function FoldersComponent() {
    const {folders, setFolders, selectedFolder, setSelectedFolder} = useTeamContext();

    return (
        <div className={'flex flex-col items-center justify-center w-96 h-full bg-muted'}>
            {
                folders.length > 0 ? (
                    <div className={'flex flex-col items-center justify-start w-full h-full gap-2 p-2'}>
                        {folders.map((folder, index) => (
                            <Button
                                key={index}
                                variant={folder === selectedFolder ? 'default' : 'link'}
                                onClick={() => setSelectedFolder(folder)}
                                className={'flex flex-row items-center justify-center w-full h-10 px-5 gap-5'}
                            >
                                {folder.name}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <div className={'flex flex-col items-center justify-center w-full h-full gap-5'}>
                        <span className={'text-2xl font-semibold'}>No folders</span>
                        <span className={'text-sm font-extralight'}>Create a new folder to organize your tasks.</span>
                    </div>
                )
            }
        </div>
    )
}