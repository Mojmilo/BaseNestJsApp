'use client';

import {useDashboardContext} from "@/context/dashboard-context";

export default function TestComponent() {
    const {selectedTeam} = useDashboardContext();

    return (
        <div>
            {selectedTeam?.name}
        </div>
    )
}