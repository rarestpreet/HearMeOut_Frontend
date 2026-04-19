import { Outlet } from "react-router-dom"
import SideNavBar from "./components/SideNavBar"

function ProfileLayout() {
    return (
        <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-surface">
            <SideNavBar />
            <Outlet />
        </div>
    )
}

export default ProfileLayout