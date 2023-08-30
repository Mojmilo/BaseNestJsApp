import DashboardLayout from "@/components/layouts/dashboard-layout";
import TestComponent from "@/components/test-component";
import AuthenticatedLayout from "@/components/layouts/authenticated-layout";


export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <TestComponent />
            </DashboardLayout>
        </AuthenticatedLayout>
    )
}