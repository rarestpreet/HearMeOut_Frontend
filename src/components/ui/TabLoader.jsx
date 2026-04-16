/**
 * TabLoader — animated skeleton placeholder used while tab data is loading.
 *
 * Props:
 *   rows  — number of skeleton cards to render (default 3)
 */
export default function TabLoader({ rows = 3 }) {
    return (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3"
                >
                    {/* Title line */}
                    <div className="h-4 bg-gray-200 rounded-full w-3/4" />

                    {/* Sub-line */}
                    <div className="h-3 bg-gray-100 rounded-full w-1/2" />

                    {/* Meta chips */}
                    <div className="flex gap-3 mt-1">
                        <div className="h-5 w-16 bg-green-100 rounded-md" />
                        <div className="h-5 w-20 bg-gray-100 rounded-md" />
                        <div className="h-5 w-24 bg-gray-100 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}
