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

    return (
        <TeamContext.Provider value={{team, setTeam}}>
            {children}
        </TeamContext.Provider>
    );
}