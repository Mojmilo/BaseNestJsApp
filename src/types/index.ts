import {Team, User} from "@prisma/client";

export type AuthDataType = {
    user: User | null;
}

export type DashboardLayoutDataType = {
    teams: Team[];
}

export type TeamDataType = {
    team: Team | null;
}