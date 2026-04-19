import { Link } from "react-router-dom"

function BrandContainer() {
    return (
        <Link to="/" className="flex items-center gap-1.5 no-underline">
            <span className="text-2xl font-extrabold text-black tracking-tight">
                HearMe<span className="text-brand-500">Out</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        </Link>
    )
}

export default BrandContainer