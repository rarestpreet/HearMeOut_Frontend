import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"

function Layout() {

    return (
        <div className="flex flex-col gap-4">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Layout