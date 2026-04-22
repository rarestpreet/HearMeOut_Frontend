import { FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useUserContext } from "../../context/userContext"

/**
 * VoteBox — vertical vote column with up/down arrows and score.
 * Props:
 *   - score: number
 *   - hasVoted: boolean (whether the current user has voted)
 *   - onVote: (voteType: "UPVOTE" | "DOWNVOTE") => void
 *   - disabled: boolean (e.g. not logged in)
 */
function VoteBox({ score, hasVoted = false, onVote, disabled }) {
    const { userProfile } = useUserContext()

    return (
        <div className="flex flex-col items-center gap-1 p-2 shrink-0">
            {userProfile?.username && (<button
                type="button"
                onClick={() => onVote?.("UPVOTE")}
                disabled={disabled}
                className={`p-1 rounded transition-colors text-gray-400 hover:text-brand-500 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                aria-label="Upvote"
            >
                <FaArrowUp className="text-lg" />
            </button>
            )}

            <div className="text-on-primary-container p-3 rounded-full text-center flex-1 md:flex-none">
                <div className="text-lg font-black leading-none">{score ?? 0}</div> {/* ?? used for null or undefined (numeric value) */}
            </div>

            {userProfile?.username && (<button
                type="button"
                onClick={() => onVote?.("DOWNVOTE")}
                disabled={disabled}
                className={`p-1 rounded transition-colors text-gray-400 hover:text-danger-400 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                aria-label="Downvote"
            >
                <FaArrowDown className="text-lg" />
            </button>
            )}
        </div>
    )
}

export default VoteBox
