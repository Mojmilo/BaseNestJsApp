'use client';

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {User} from "@prisma/client";

interface ContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<ContextProps>({
    user: {} as User,
    setUser: (): User => ({} as User)
});

export const useAuthContext = () => useContext(AuthContext);