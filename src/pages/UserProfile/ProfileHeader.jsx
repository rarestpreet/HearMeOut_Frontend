import { FaUserShield, FaCheckCircle, FaExclamationTriangle, FaKey } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

/**
 * ProfileHeader — avatar, user info, reputation, and action buttons.
 * Props:
 *   - profile: UserProfileResponseDTO { id, username, email, reputation, createdAt, isOperable, isAccountVerified }
 *   - username: string (from route params)
 *   - onChangePassword: () => void
 *   - onVerifyEmail: () => void
 */
function ProfileHeader({ profile, username, onChangePassword, onVerifyEmail }) {
    const navigate = useNavigate()

    return (
        <div className="flex items-end -mt-16 gap-8 mb-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-[6px] border-surface bg-surface-container-lowest flex items-center justify-center text-primary-container font-black text-4xl shadow-sm">
                {username?.charAt(0)?.toUpperCase()}
            </div>

            {/* Info */}
            <div className="pb-2 flex-1">
                <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-1">
                    {profile.username}
                </h1>
                <p className="text-on-surface-variant flex items-center gap-2 font-medium text-sm">
                    {profile.email}
                    {profile.isAccountVerified === false && (
                        <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <FaExclamationTriangle /> Unverified
                        </span>
                    )}
                    {profile.isAccountVerified && (
                        <FaCheckCircle className="text-primary text-sm" title="Verified Account" />
                    )}
                </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pb-2">
                <div className="text-center">
                    <div className="text-2xl font-black text-primary">{profile.reputation ?? "—"}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Reputation</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-black text-on-surface">{profile.createdAt ?? "—"}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Joined</div>
                </div>
            </div>

            {/* Action buttons (only for own profile — isOperable) */}
            {profile.isOperable && (
                <div className="pb-2 flex flex-col gap-2">
                    {profile.role === "ADMIN" && (
                        <button
                            onClick={() => navigate("/admin")}
                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-on-primary rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                            <FaUserShield /> Admin Dashboard
                        </button>
                    )}
                    <button
                        onClick={onChangePassword}
                        className="flex items-center gap-2 px-4 py-2 bg-inverse-surface hover:bg-on-surface text-inverse-on-surface rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
                        disabled
                    >
                        <FaKey /> Change Password
                    </button>
                    {!profile.isAccountVerified && (
                        <button
                            onClick={onVerifyEmail}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
                            disabled
                        >
                            <FaCheckCircle /> Verify Email
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileHeader
