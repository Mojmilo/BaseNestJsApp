import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthenticatedLayout from "@/components/layouts/auth/authenticated-layout";
import {getTeam} from "@/lib/teams";
import {redirect} from "next/navigation";
import {TeamProvider} from "@/components/providers/team-provider";
import {TeamDataType} from "@/types";
import FoldersComponent from "@/components/folders-component";
import TasksComponent from "@/components/tasks-component";
import TeamComponent from "@/components/team-component";

type Props = {
    slug: string
}
export default async function Team({params: {slug}}: {params: Props}) {
    const data: TeamDataType = {
        team: await getTeam(parseInt(slug))
    }

    if (!data.team) {
        redirect('/dashboard')
    }

    return (
        <AuthenticatedLayout>
            <TeamProvider data={data}>
                <DashboardLayout>
                    <div className={'flex flex-col items-center justify-start w-full h-full gap-10'}>
                        <TeamComponent />

                        <div className={'flex flex-flex justify-start items-center w-full h-full gap-10'}>
                            <FoldersComponent />
                            <TasksComponent />
                        </div>
                    </div>
                </DashboardLayout>
            </TeamProvider>
        </AuthenticatedLayout>
    )
}