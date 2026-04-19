/**
 * PageLoader — full-screen loader with a thin animated green top bar.
 * Props: text (optional message)
 */
function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      {/* Top progress bar */}
      <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-brand-500 rounded-full animate-pulse"
          style={{ width: "60%", animationDuration: "1.2s" }}
        />
      </div>
      <p className="text-sm font-medium text-gray-500">{text}</p>
    </div>
  )
}

export default PageLoader