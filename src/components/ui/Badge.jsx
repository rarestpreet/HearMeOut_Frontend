/**
 * Badge — status indicator.
 * Props: status ("OPEN" | "ANSWERED" | "CLOSED" | "ADMIN"), children (optional override text)
 */
function Badge({ status, children }) {
    const statusLower = (status || "").toLowerCase()

    const classMap = {
        open: "badge-open",
        answered: "badge-answered",
        closed: "badge-closed",
        admin: "badge-admin",
    }

    const className = classMap[statusLower] || "badge-open"

    return (
        <span className={className}>
            {children || status}
        </span>
    )
}

export default Badge