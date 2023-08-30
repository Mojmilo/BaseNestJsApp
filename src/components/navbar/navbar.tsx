"use client";

import TeamSwitcher from "@/components/navbar/team-switcher";
import LayoutMenubar from "@/components/navbar/layout-menubar";
import ThemeSwitcher from "@/components/navbar/theme-switcher";
import DropdownMenuNavbar from "@/components/navbar/dropdown-menu-navbar";
import NavbarTitle from "@/components/navbar/navbar-title";
import {useTeamContext} from "@/context/team-context";

export default function Navbar() {
    const {team, setTeam} = useTeamContext();

    return (
        <div className={'fixed top-0 left-0 flex flex-row justify-between items-center w-full z-40 border-b px-20 py-2'}>
            <div className="flex flex-row justify-center items-center gap-5">
                <NavbarTitle />
                <TeamSwitcher />
                {team && <LayoutMenubar />}
            </div>

            <div className="flex flex-row justify-center items-center gap-3">
                <ThemeSwitcher />
                <DropdownMenuNavbar />
            </div>
        </div>
    )
}