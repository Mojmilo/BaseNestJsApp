'use client';

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {Team, User} from "@prisma/client";

interface ContextProps {
    team: Team | null
    setTeam: Dispatch<SetStateAction<Team | null>>;
    folders: any[];
    setFolders: Dispatch<SetStateAction<any[]>>;
    selectedFolder: any;
    setSelectedFolder: Dispatch<SetStateAction<any>>;
    tasks: any[];
    setTasks: Dispatch<SetStateAction<any[]>>;
}

export const TeamContext = createContext<ContextProps>({
    team: null,
    setTeam: () => {},
    folders: [],
    setFolders: () => {},
    selectedFolder: null,
    setSelectedFolder: () => {},
    tasks: [],
    setTasks: () => {},
});

export const useTeamContext = () => useContext(TeamContext);