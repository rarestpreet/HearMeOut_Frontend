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
function ProfileHeader({ profile, username }) {
    const navigate = useNavigate()


    return (
        <div className="flex items-end -mt-16 gap-8 mb-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-[6px] border-surface-container-low bg-surface-container-lowest flex items-center justify-center text-brand-400 font-black text-4xl shadow-sm">
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
        </div>
    )
}

export default ProfileHeader
