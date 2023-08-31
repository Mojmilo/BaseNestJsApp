'use client';

import {useEffect, useState} from "react";
import {Team} from "@prisma/client";
import {TeamDataType} from "@/types";
import {TeamContext} from "@/context/team-context";

type TeamProviderProps = {
    children: React.ReactNode;
    data: TeamDataType;
}

export const TeamProvider = ({children, data}: TeamProviderProps) => {
    const [team, setTeam] = useState<Team | null>(data.team);
    const [folders, setFolders] = useState<any[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>([]);

    return (
        <TeamContext.Provider value={{team, setTeam, folders, setFolders, selectedFolder, setSelectedFolder, tasks, setTasks}}>
            {children}
        </TeamContext.Provider>
    );
}