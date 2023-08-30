'use server'

import prisma from "@/lib/prisma";
import {getUserId} from "@/lib/user";

export const getTeams = async () => {
    return prisma.team.findMany({
        where: {
            TeamMember: {
                some: {
                    userId: getUserId()
                }
            }
        }
    });
}

export const getTeam = async (id: number) => {
    return prisma.team.findUnique({
        where: {
            id: id
        }
    });
}