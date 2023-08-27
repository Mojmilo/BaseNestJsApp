import {User} from "@prisma/client";
import {UserType} from "@/types/users";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

export const addUser = async (user: UserType): Promise<User> => {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}