import HomeComponent from "@/components/home-component";
import UniversalLayout from "@/components/layouts/auth/universal-layout";

export default function Home() {
    return (
        <UniversalLayout>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <HomeComponent />
            </main>
        </UniversalLayout>
    )
}
