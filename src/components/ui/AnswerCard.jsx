import VoteBox from "./VoteBox"
import CommentsList from "./CommentsList"

/**
 * AnswerCard — individual answer with vote box, body, and comments.
 * Props:
 *   - answer: FeedAnswerResponseDTO (postId, voted, authorId, body, createdAt, status, comments[], score)
 *   - onVote: (voteType) => void
 *   - onAddComment: (body) => void
 *   - onDeleteComment: (commentId) => void
 *   - isLoggedIn: boolean
 */
function AnswerCard({ answer, onVote, onAddComment, onDeleteComment, isLoggedIn }) {

    const isAccepted = answer.status === "ACCEPTED"

    return (
        <div className={`flex gap-4 p-5 rounded-xl border transition-all duration-200 ${isAccepted
            ? "bg-brand-50 border-l-4 border-l-brand-500 border-brand-200"
            : "bg-white border-gray-100 hover:border-brand-300 hover:shadow-sm"
            }`}>
            {/* Vote */}
            <VoteBox
                score={answer.score}
                hasVoted={answer.voted}
                onVote={onVote}
                disabled={!isLoggedIn}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
                {isAccepted && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 mb-2">
                        ✓ Accepted Answer
                    </span>
                )}

                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {answer.body}
                </p>

                <div className="flex justify-end mt-3">
                    <span className="text-xs text-gray-400 font-medium">
                        answered: {answer.createdAt}
                    </span>
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
