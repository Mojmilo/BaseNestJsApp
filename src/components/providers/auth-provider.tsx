'use client';

import {User} from "@prisma/client";
import {useEffect, useState} from "react";
import {AuthContext} from "@/context/auth-context";
import {getUser} from "@/lib/user";
import {AuthenticatedLayoutDataType} from "@/types";

type AuthProviderProps = {
    children: React.ReactNode;
    data: AuthenticatedLayoutDataType;
}

export const AuthProvider = ({children, data}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(data.user);
    }, [data]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}