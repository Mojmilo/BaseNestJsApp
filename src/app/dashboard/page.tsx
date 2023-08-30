import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthenticatedLayout from "@/components/layouts/authenticated-layout";


export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <div className={'flex flex-col items-center justify-center h-full'}>
                    <span className={'px-4 py-2 rounded-lg border border-dashed text-muted-foreground'}>No team selected</span>
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    )
}