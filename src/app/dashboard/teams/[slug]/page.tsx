import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthenticatedLayout from "@/components/layouts/authenticated-layout";
import {getTeam} from "@/lib/teams";
import {redirect} from "next/navigation";
import {TeamProvider} from "@/components/providers/team-provider";
import {TeamDataType} from "@/types";

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
                        <div className={'flex flex-col items-start justify-center w-full gap-5'}>
                            <h2 className={'text-4xl font-semibold'}>{data.team.name}</h2>
                            <span className={'text-sm font-extralight'}>Comment on this team</span>
                        </div>

                        <div className={'flex flex-flex justify-start items-center w-full h-full gap-10'}>
                            <div className={'flex flex-col items-center justify-center w-96 h-full bg-muted'}>
                                Folders
                            </div>

                            <div className={'flex flex-col items-center justify-center w-full h-full bg-muted'}>
                                Tasks
                            </div>
                        </div>
                    </div>
                </DashboardLayout>
            </TeamProvider>
        </AuthenticatedLayout>
    )
}