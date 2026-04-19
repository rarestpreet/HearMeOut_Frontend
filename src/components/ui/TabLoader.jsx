/**
 * TabLoader — skeleton pulse rows for tab content loading state.
 * Props: rows (number of skeleton rows)
 */
function TabLoader({ rows = 3 }) {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-5 flex flex-col gap-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-lg w-1/2" />
                    <div className="h-3 bg-gray-200 rounded-lg w-1/3" />
                </div>
            ))}
        </div>
    )
}

export default TabLoader