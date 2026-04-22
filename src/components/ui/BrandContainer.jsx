import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BrandContainer() {
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === "/";

    return (
        isHomePage ? (
            <Link
                to="/"
                className="flex items-center gap-1.5 no-underline"
            >
                <span className="text-2xl font-extrabold text-black tracking-tight">
                    HearMe<span className="text-brand-500">Out</span>
                </span>

                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            </Link>
        ) : (
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-surface-container-lowest backdrop-blur-md border border-white/20 text-black px-3 py-2 rounded-xl font-bold shadow-sm select-none hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
                <FaArrowLeft />
                Back
            </button>
        )
    );
}

export default BrandContainer;