'use client';

import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {User} from "@prisma/client";
import {me} from "@/lib/auth";

interface ContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const SessionContext = createContext<ContextProps>({
    user: {} as User,
    setUser: (): User => ({} as User)
});

export const SessionContextProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        me().then((user) => {
            setUser(user);
        });
    }, []);

    return (
        <SessionContext.Provider value={{user, setUser}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSessionContext = () => useContext(SessionContext);