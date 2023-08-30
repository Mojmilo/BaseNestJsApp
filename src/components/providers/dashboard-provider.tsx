'use client';

import {useEffect, useState} from "react";
import {Team} from "@prisma/client";
import {getTeams} from "@/lib/user";
import {DashboardContext} from "@/context/dashboard-context";
import {DashboardLayoutDataType} from "@/types";

type DashboardProviderProps = {
    children: React.ReactNode;
    data: DashboardLayoutDataType;
}

export const DashboardProvider = ({children, data}: DashboardProviderProps) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<Team>({} as Team);

    useEffect(() => {
        setTeams(data.teams);
        setSelectedTeam(data.selectedTeam);
    }, []);

    return (
        <DashboardContext.Provider value={{teams, setTeams, selectedTeam, setSelectedTeam}}>
            {children}
        </DashboardContext.Provider>
    );
}