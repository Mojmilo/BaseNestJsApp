'use server'

import prisma from "@/lib/prisma";
import {getUserId} from "@/lib/user";
import {Team} from "@prisma/client";

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

export const getTeam = async (id: number) => {
    return prisma.team.findUnique({
        where: {
            id: id
        }
    });
}

export const deleteTeam = async (team: Team) => {
    // verify if team is not empty
    if (!team) {
        throw new Error('Missing name');
    }

    return prisma.team.delete({
        where: {
            id: team.id
        }
    });
}