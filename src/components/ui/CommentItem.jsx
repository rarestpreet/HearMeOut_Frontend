import { FaTrash } from "react-icons/fa"

/**
 * CommentItem — single comment row.
 * Props:
 *   - comment: { commentId, body, authorId, postId, updatedAt, isEditable }
 *   - onDelete: (commentId) => void
 */
function CommentItem({ comment, onDelete }) {
    return (
        <div className="flex items-start gap-3 py-2 group">
            <p className="text-sm text-gray-700 border-l-2 border-gray-200 pl-3 flex-1 leading-relaxed">
                {comment.body}
            </p>

            <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-gray-400 font-medium">
                    {comment.updatedAt}
                </span>

                {comment.isEditable && onDelete && (
                    <button
                        type="button"
                        onClick={() => onDelete(comment.commentId)}
                        className="text-gray-300 hover:text-danger-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label="Delete comment"
                    >
                        <FaTrash className="text-xs" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default CommentItem
