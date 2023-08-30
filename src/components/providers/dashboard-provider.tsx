'use client';

import {useEffect, useState} from "react";
import {Team} from "@prisma/client";
import {DashboardContext} from "@/context/dashboard-context";
import {DashboardLayoutDataType} from "@/types";

type DashboardProviderProps = {
    children: React.ReactNode;
    data: DashboardLayoutDataType;
}

export const DashboardProvider = ({children, data}: DashboardProviderProps) => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        setTeams(data.teams);
    }, []);

    return (
        <DashboardContext.Provider value={{teams, setTeams}}>
            {children}
        </DashboardContext.Provider>
    );
}