'use client';

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {Team, User} from "@prisma/client";

interface ContextProps {
    team: Team | null
    setTeam: Dispatch<SetStateAction<Team | null>>;
}

export const TeamContext = createContext<ContextProps>({
    team: null,
    setTeam: () => {},
});

export const useTeamContext = () => useContext(TeamContext);