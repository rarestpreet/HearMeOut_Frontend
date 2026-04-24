import AnswerCard from "../../components/ui/AnswerCard"

/**
 * AnswersList — section header + list of AnswerCard components.
 * Props:
 *   - answers: FeedAnswerResponseDTO[]
 *   - onVote: (postId, voteType) => void
 *   - onAddComment: (postId, body) => void
 *   - onDeleteComment: (commentId) => void
 *   - isLoggedIn: boolean
 */
function AnswersList({ answers = [], onVote, onAddComment, onDeleteComment, onToggleStatus, isLoggedIn, commentLoader, operable, canToggle }) {

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </h2>

            <div className="flex flex-col gap-4">
                {answers.map(answer => (
                    <AnswerCard
                        key={answer.postId}
                        answer={answer}
                        onVote={(voteType) => onVote?.(answer.postId, voteType)}
                        onAddComment={(body) => onAddComment?.(answer.postId, body)}
                        onDeleteComment={onDeleteComment}
                        onToggleStatus={() => onToggleStatus?.(answer.postId)}
                        isLoggedIn={isLoggedIn}
                        commentLoader={commentLoader}
                        operable={operable}
                        canToggle={canToggle}
                    />
                ))}
            </div>
        </div>
    )
}

export default AnswersList
