/**
 * EmptyState — centred layout for empty data states.
 * Props:
 *   - icon: React Icon component
 *   - title: string
 *   - message: string
 *   - actionButton: optional JSX button
 */
function EmptyState({ icon: Icon, title, message, actionButton }) {
  return (
    <div className="flex flex-col items-center py-16 text-center gap-4">
      {Icon && (
        <div className="bg-brand-50 rounded-full p-5 text-brand-400 text-4xl">
          <Icon />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{message}</p>
      {actionButton}
    </div>
  )
}

export default EmptyState