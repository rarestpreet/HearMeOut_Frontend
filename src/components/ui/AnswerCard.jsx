import VoteBox from "./VoteBox"
import CommentsList from "./CommentsList"
import { useNavigate } from "react-router-dom"

/**
 * AnswerCard — individual answer with vote box, body, and comments.
 * Props:
 *   - answer: FeedAnswerResponseDTO { 
    postId: 0,
    voted: false,
    authorUsername: "",
    body: "",
    updatedAt: "",
    postStatus: "",
    comments: [],
    score: 0,
    operable: false
    }
 *   - onVote: (voteType) => void
 *   - onAddComment: (body) => void
 *   - onDeleteComment: (commentId) => void
 *   - isLoggedIn: boolean
 */
function AnswerCard({ answer, onVote, onAddComment, onDeleteComment, isLoggedIn }) {

    const isAccepted = answer.postStatus === "ACCEPTED"
    const navigate = useNavigate()

    return (
        <div className={`flex gap-4 p-5 rounded-xl border transition-all duration-200 ${isAccepted
            ? "bg-brand-50 border-l-4 border-l-brand-500 border-brand-200"
            : "bg-white border-gray-100 hover:border-brand-300 hover:shadow-sm"
            }`}>
            {/* Vote */}
            <div className="flex flex-col justify-between">
                <VoteBox
                    score={answer.score}
                    hasVoted={answer.voted}
                    onVote={onVote}
                    disabled={!isLoggedIn}
                />
                <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-100
                rounded-xl p-2 shrink-0
                group-hover:bg-brand-50 group-hover:border-brand-100 transition-colors"
                >
                    <span className="text-black group-hover:text-brand-600 font-bold text-xl leading-none mb-1 transition-colors">
                        {answer.postStatus.charAt(0)}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase">
                        Status
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-2 min-w-0">
                {isAccepted && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 mb-2">
                        ✓ Accepted Answer
                    </span>
                )}

                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {answer.body}
                </p>

                <div className="flex items-center justify-end gap-2 text-xs font-medium text-gray-400">
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-gray-500">
                            Author: <span className="text-gray-700 font-semibold">{answer.authorUsername}</span>
                        </span>
                        <span className="text-gray-500">
                            Modified at: <span className="text-gray-700 font-semibold">{answer.updatedAt}</span>
                        </span>
                    </div>
                    <div
                        className="w-8 h-8 bg-black text-white font-medium text-lg rounded-full
                            flex justify-center items-center cursor-pointer shadow select-none
                            hover:ring-2 hover:ring-brand-300 transition-all"
                        onClick={() => navigate(`/profile/${answer.authorUsername}`)}
                    >
                        {answer.authorUsername[0].toUpperCase()}
                    </div>
                </div>

                {/* Comments */}
                <CommentsList
                    comments={answer.comments || []}
                    onAddComment={onAddComment}
                    onDeleteComment={onDeleteComment}
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </div>
    )
}

export default AnswerCard
