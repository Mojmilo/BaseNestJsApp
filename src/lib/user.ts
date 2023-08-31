'use server'

import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import {decodeJwt} from "jose";
import {Team} from "@prisma/client";

export const getUserId = () => {
    const token = cookies().get('user-token')?.value;
    const payload = token ? decodeJwt(token) : null;
    if (payload) {
        return payload.id as number
    } else {
        return 0;
    }
}

export const getUser = async () => {
    return prisma.user.findUnique({
        where: {
            id: getUserId()
        }
    });
}

export const createTeam = async (name: string) => {
    // verify if name is not empty
    if (!name) {
        throw new Error('Missing name');
    }

    return prisma.team.create({
        data: {
            name: name,
            TeamMember: {
                create: {
                    role: 'OWNER',
                    userId: getUserId()
                }
            }
        }
    });
}