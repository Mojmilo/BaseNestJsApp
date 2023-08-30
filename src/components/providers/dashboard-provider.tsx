'use client';

import {useEffect, useState} from "react";
import {Team} from "@prisma/client";
import {getTeams} from "@/lib/user";
import {DashboardContext} from "@/context/dashboard-context";
import {DashboardDataType} from "@/types";

type DashboardProviderProps = {
    children: React.ReactNode;
    data: DashboardDataType;
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