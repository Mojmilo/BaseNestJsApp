'use client';

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {Team, User} from "@prisma/client";

interface ContextProps {
    teams: Team[];
    setTeams: Dispatch<SetStateAction<Team[]>>;
}

export const DashboardContext = createContext<ContextProps>({
    teams: {} as Team[],
    setTeams: (): Team[] => ({} as Team[]),
});

export const useDashboardContext = () => useContext(DashboardContext);