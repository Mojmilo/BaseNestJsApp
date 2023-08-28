'use client';

import {addUser, getUsers} from "@/lib/users";
import {useEffect, useState} from "react";
import {User} from ".prisma/client";
import {UserType} from "@/types/users";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const action = (e: any) => {
        e.preventDefault();

        const user: UserType = {
            name: e.currentTarget[0].value,
            email: e.currentTarget[1].value,
            password: e.currentTarget[2].value,
            confirm_password: e.currentTarget[3].value,
        }

        const newUser = addUser(user);

        getUsers().then(setUsers);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Users</h1>
            <form onSubmit={action}>
                <input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2"/>
                <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2"/>
                <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2"/>
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Create</button>
            </form>
            <ul className="flex flex-col gap-4">
                {users.map((user) => (
                    <li key={user.id} className="flex flex-col gap-2">
                        <span className="font-bold">{user.name}</span>
                    </li>
                ))}
            </ul>
        </main>
    )
}
