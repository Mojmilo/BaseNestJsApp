'use server'

import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import {decodeJwt} from "jose";
import {Team, UserRole} from "@prisma/client";
import {verifyToken} from "@/lib/auth";

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
    const verifiedToken = await verifyToken().catch((err) => {
        console.error(err.message);
    });

    if (!verifiedToken) {
        return null;
    }

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