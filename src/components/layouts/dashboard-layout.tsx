import Navbar from "@/components/navbar/navbar";
import {DashboardProvider} from "@/components/providers/dashboard-provider";
import {getTeams} from "@/lib/user";
import {DashboardLayoutDataType} from "@/types";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const teams = await getTeams();

    const data: DashboardLayoutDataType = {
        teams: teams,
        selectedTeam: teams[0]
    }

    return (
        <DashboardProvider data={data}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Navbar />
                {children}
            </main>
        </DashboardProvider>
    )
}