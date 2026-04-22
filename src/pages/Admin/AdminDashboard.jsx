import { useEffect, useState } from "react"
import { FaPlus, FaTimes, FaChevronDown } from "react-icons/fa"
import apiCall from "../../services/apiCall"
import { useUserContext } from "../../context/userContext"
import PageLoader from "../../components/ui/PageLoader"

export default function AdminDashboard() {
    const { setLoading } = useUserContext()
    const [tags, setTags] = useState([])
    const [tagsLoading, setTagsLoading] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [tagName, setTagName] = useState("")
    const [tagDescription, setTagDescription] = useState("")

    useEffect(() => {
        fetchTags()
    }, [])

    const fetchTags = async () => {
        setTagsLoading(true)
        const data = await apiCall.getAllTags(setLoading, setTags)
        setTagsLoading(false)
    }

    const handleCreateTag = async (e) => {
        e.preventDefault()
        if (!tagName.trim()) return

        await apiCall.createNewTag({ name: tagName, description: tagDescription }, setLoading)
        setTagName("")
        setTagDescription("")
        setIsFormOpen(false)
        await fetchTags()
    }

    return (
        <main className="flex-1 h-full bg-surface-container-low overflow-y-auto w-full">
            <div className="px-12 py-12 max-w-7xl mx-auto">
                {/* Header section */}
                <section className="bg-surface-container-lowest rounded-xl p-8 mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-on-background mb-1">Admin Dashboard</h1>
                        <p className="text-on-surface-variant max-w-xl leading-relaxed">
                            Organize community discourse by auditing, merging, or creating new taxonomy identifiers. High-signal tags improve algorithmic search relevance.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="bg-primary-container text-on-primary-container px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                    >
                        {isFormOpen ? <FaTimes /> : <FaPlus />}
                        {isFormOpen ? "Close" : "New Tag"}
                    </button>
                </section>

                {/* Add tag form */}
                {isFormOpen && (
                    <section className="mb-12 animate-[fadeIn_200ms_ease-out]">
                        <div className="bg-surface rounded-lg p-6 border border-outline-variant/15">
                            <div className="flex items-center gap-2 mb-6">
                                <FaChevronDown className="text-primary" />
                                <h3 className="font-bold tracking-wider text-xs uppercase opacity-70">Add New Community Identifier</h3>
                            </div>
                            <form onSubmit={handleCreateTag} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                <div className="md:col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                                        Tag Name <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={tagName}
                                        onChange={(e) => setTagName(e.target.value)}
                                        placeholder="e.g. typescript"
                                        className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-primary focus:ring-0 rounded-lg py-2 px-4 text-sm text-on-surface outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        value={tagDescription}
                                        onChange={(e) => setTagDescription(e.target.value)}
                                        placeholder="A superset of JavaScript..."
                                        className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-primary focus:ring-0 rounded-lg py-2 px-4 text-sm text-on-surface outline-none"
                                    />
                                </div>
                                <div className="md:col-span-1 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        className="flex-1 bg-surface-container-high text-on-surface font-bold py-2 rounded-lg text-sm border border-outline-variant/20 hover:bg-surface-variant transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-on-primary font-bold py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}

                {/* Tags table */}
                <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.03)]">
                    {tagsLoading ? (
                        <div className="p-8">
                            <PageLoader text="Loading tags..." />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container-high/50 border-b border-transparent">
                                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">ID</th>
                                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Community Tag</th>
                                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Semantic Definition</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-transparent">
                                        {(tags || [])?.length == 0 ? (
                                            <tr>
                                                <td colSpan={3} className="px-8 py-12 text-center text-sm text-on-surface-variant">
                                                    No tags created yet.
                                                </td>
                                            </tr>
                                        ) : (tags || []).map((tag) => (
                                            <tr key={tag.tagId} className="hover:bg-surface-container-low transition-colors group">
                                                <td className="px-8 py-6 font-mono text-xs opacity-40">{tag.tagId}</td>
                                                <td className="px-8 py-6">
                                                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-mono">
                                                        {tag.name}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-on-surface/80 max-w-sm leading-relaxed">
                                                    {tag.description || "—"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-surface-container-high/30 px-8 py-4 flex justify-between items-center">
                                <p className="text-xs text-on-surface-variant">
                                    Showing <span className="font-bold text-on-surface">{(tags || [])?.length ? (tags || [])?.length : 0}</span> tag{(tags || [])?.length ? (tags || [])?.length !== 1 : 0 ? "s" : ""}
                                </p>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </main>
    )
}