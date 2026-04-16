import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTag, FaCheckCircle, FaQuestionCircle, FaLightbulb, FaAlignLeft } from "react-icons/fa";
import PageNavBar from "../../components/ui/PageNavBar";
import apiCall from "../../services/apiCall";
import { useUserContext } from "../../context/userContext";
import TabLoader from "../../components/ui/TabLoader";

function CharCounter({ current, min, max }) {
    const isUnder = current < min;
    const isOver = current > max;
    const color = isOver
        ? "text-red-500"
        : isUnder && current > 0
            ? "text-amber-500"
            : "text-gray-400";

    return (
        <span className={`text-xs font-medium tabular-nums ${color}`}>
            {current} / {max}
        </span>
    );
}

function FieldHint({ icon: Icon, children }) {
    return (
        <div className="flex items-start gap-2 bg-brand-50 border border-brand-100 rounded-xl p-3 text-sm text-brand-800">
            <Icon className="mt-0.5 shrink-0 text-brand-500" />
            <p>{children}</p>
        </div>
    );
}

export default function AskQuestionPage() {
    const navigate = useNavigate();
    const { loading, userProfile, setLoading } = useUserContext();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [errors, setErrors] = useState({});
    const [availableTags, setAvailableTags] = useState([]);
    const [tagsFetched, setTagsFetched] = useState(false);

    useEffect(() => {
        if (loading) return; // Wait for initial user context to load

        if (!userProfile?.username) {
            navigate("/login");
        }
    }, [userProfile, navigate, loading]);

    useEffect(() => {
        if (userProfile?.username && !tagsFetched) {
            const fetchTags = async () => {
                const tags = await apiCall.getAllTags(setLoading);
                setAvailableTags(tags);
                setTagsFetched(true);
            };
            fetchTags();
        }
    }, [userProfile, tagsFetched, setLoading]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <TabLoader rows={3} />
            </div>
        );
    }

    if (!userProfile?.username) return null;

    const validate = () => {
        const errs = {};
        if (!title.trim()) errs.title = "Question title is required.";
        else if (title.length < 15 || title.length > 150)
            errs.title = "Title must be between 15 and 150 characters.";

        if (!body.trim()) errs.body = "Description is required.";
        else if (body.length < 50 || body.length > 500)
            errs.body = "Description must be between 50 and 500 characters.";

        if (selectedTagIds.length === 0)
            errs.tags = "At least one tag is required.";
        else if (selectedTagIds.length > 10)
            errs.tags = "You can select up to 10 tags.";

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        const questionDetails = {
            title: title,
            body: body,
            tagIds: selectedTagIds
        }
        await apiCall.postQuestion(questionDetails, setLoading)
        handleSuccess()
    };

    const handleSuccess = () => {
        setSelectedTagIds([])
        setBody("")
        setTitle("")
        navigate("/")
    }

    const toggleTag = (tagId) => {
        setSelectedTagIds((prev) => {
            if (prev.includes(tagId)) {
                return prev.filter((id) => id !== tagId);
            } else {
                if (prev.length >= 10) return prev;
                return [...prev, tagId];
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ── Top bar ──────────────────────────────────────────────── */}
            <PageNavBar title="Ask a Question" titleIcon={<FaQuestionCircle />} />

            {/* ── Body ──────────────────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>

                    {/* ── Title field ─────────────────────────────────── */}
                    <section className="glass-panel p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-1">
                            <FaQuestionCircle className="text-brand-500" />
                            <h2 className="font-bold text-slate-800 text-lg">Question Title</h2>
                        </div>

                        <FieldHint icon={FaLightbulb}>
                            Be specific and imagine you're asking another person. A good title
                            summarises the problem in a single sentence.
                        </FieldHint>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="question-title" className="text-sm font-semibold text-slate-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <CharCounter current={title.length} min={15} max={150} />
                            </div>
                            <input
                                id="question-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. How do I center a div vertically in CSS?"
                                className={`w-full border ${errors.title ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition`}
                                maxLength={150}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title}</p>
                            )}
                        </div>
                    </section>

                    {/* ── Body field ──────────────────────────────────── */}
                    <section className="glass-panel p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-1">
                            <FaAlignLeft className="text-brand-500" />
                            <h2 className="font-bold text-slate-800 text-lg">Question Details</h2>
                        </div>

                        <FieldHint icon={FaLightbulb}>
                            Include all information someone would need to answer your question —
                            what you've tried, what you expected, and what happened instead.
                        </FieldHint>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="question-body" className="text-sm font-semibold text-slate-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <CharCounter current={body.length} min={50} max={500} />
                            </div>
                            <textarea
                                id="question-body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Describe your problem in detail. What have you tried so far?"
                                rows={7}
                                maxLength={500}
                                className={`w-full border ${errors.body ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-400 transition`}
                            />
                            {errors.body && (
                                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.body}</p>
                            )}
                        </div>
                    </section>

                    {/* ── Tags field ──────────────────────────────────── */}
                    <section className="glass-panel p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-1">
                            <FaTag className="text-brand-500" />
                            <h2 className="font-bold text-slate-800 text-lg">Tags</h2>
                        </div>

                        <FieldHint icon={FaLightbulb}>
                            Select up to 10 tags to describe what your question is about.
                        </FieldHint>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 block">
                                Available Tags <span className="text-slate-400 font-normal">({selectedTagIds.length}/10 selected)</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableTags?.length > 0 ? (
                                    availableTags.map((tag) => {
                                        const isSelected = selectedTagIds.includes(tag.tagId);
                                        return (
                                            <button
                                                key={tag.tagId}
                                                type="button"
                                                onClick={() => toggleTag(tag.tagId)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all border
                                                    ${isSelected
                                                        ? 'bg-brand-50 text-brand-700 border-brand-300 shadow-sm'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}
                                                aria-label={`Toggle tag ${tag.name}`}
                                                title={tag.description}
                                            >
                                                {isSelected ? <FaCheckCircle className="text-brand-500" /> : <FaTag className="text-slate-400" />}
                                                {tag.name}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-slate-500">No tags available.</p>
                                )}
                            </div>
                        </div>

                        {errors.tags && (
                            <p className="text-red-500 text-xs font-medium">{errors.tags}</p>
                        )}
                    </section>

                    {/* ── Submit ──────────────────────────────────────── */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Post Your Question
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
