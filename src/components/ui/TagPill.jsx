import { FaTag, FaCheckCircle } from "react-icons/fa"

/**
 * TagPill — tag chip in one of three visual variants.
 * Props:
 *   - tag: {
   tagId,
   name,
   description
   }
 *   - variant: "default" | "selected" | "display"
 *   - onToggle: optional click handler
 *   - showTooltip: whether to show description on hover
 */
function TagPill({ tag, variant = "display", onToggle, showTooltip = false }) {
    const classMap = {
        default: "tag-pill",
        selected: "tag-pill-selected",
        display: "tag-pill-display",
    }

    return (
        <button
            type="button"
            onClick={onToggle}
            className={`${classMap[variant] || classMap.display} inline-flex items-center gap-1 transition-all`}
            title={showTooltip ? tag.description : undefined}
            aria-label={`Tag ${tag.name}`}
        >
            {variant === "selected" ? (
                <FaCheckCircle className="text-white text-[10px]" />
            ) : variant === "default" ? (
                <FaTag className="text-gray-400 text-[10px]" />
            ) : null}
            {tag.name}
        </button>
    )
}

export default TagPill
