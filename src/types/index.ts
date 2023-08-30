import {Team, User} from "@prisma/client";

export type LayoutDataType = {
    user: User | null;
}

export type DashboardDataType = {
    teams: Team[];
    selectedTeam: Team;
}