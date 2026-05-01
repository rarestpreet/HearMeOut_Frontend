import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaQuestionCircle, FaCommentDots, FaEdit } from "react-icons/fa"
import { useUserProfileContext } from "../../context/userProfileContext"
import apiCall from "../../services/apiCall"
import ProfileHeader from "./ProfileHeader"
import ProfileTabContent from "./ProfileTabContent"

/**
 * AnswerCard — individual answer with vote box, body, and comments.
 * Props:
 *   - userProfile: UserProfileResponseDTO {
        userId: 0,
        username: "",
        email: "",
        reputation: 0,
        createdAt: "",
        operable: false,
        isAccountVerified: false,
        isAccountTerminated: false
    }
 *   - userQuestions: []
 *   - userAnswers: []
 *   - userComments: []
 */

export default function UserProfilePage() {
    const { username } = useParams()
    const { userProfile, loading } = useUserProfileContext()
    const [activeTab, setActiveTab] = useState("questions")
    const [tabLoading, setTabLoading] = useState()

    const [userQuestions, setUserQuestions] = useState([])
    const [userAnswers, setUserAnswers] = useState([])
    const [userComments, setUserComments] = useState([])

    useEffect(() => {
        fetchUserQuestions()
    }, [username])

    const fetchUserQuestions = async () => {
        const data = await apiCall.getUserQuestion(username, setTabLoading, setUserQuestions)
    }

    const fetchUserAnswers = async () => {
        const data = await apiCall.getUserAnswer(username, setTabLoading, setUserAnswers)
    }

    const fetchUserComments = async () => {
        const data = await apiCall.getUserComment(username, setTabLoading, setUserComments)
    }

    const handleTabChange = (tab) => {
        if (activeTab === tab) return
        setActiveTab(tab)

        if (tab === "questions") fetchUserQuestions()
        else if (tab === "answers") fetchUserAnswers()
        else fetchUserComments()
    }

    const tabConfig = [
        { key: "questions", label: "Questions", icon: FaQuestionCircle },
        { key: "answers", label: "Answers", icon: FaCommentDots },
        { key: "comments", label: "Comments", icon: FaEdit },
    ]

    return (
        <main className="flex-1 h-full bg-surface pb-12 overflow-y-auto">
            <header className="relative">
                <div className="h-48 w-full hero-gradient"></div>
                <div className="max-w-6xl mx-auto px-8 relative">
                    <ProfileHeader
                        profile={userProfile}
                        username={username}
                        onChangePassword={() => { }}
                        onVerifyEmail={() => { }}
                    />
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-8 mt-4">
                <div className="mt-8 flex flex-col md:flex-row gap-8">

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        <div className="flex border-b border-outline-variant gap-8 overflow-x-auto">
                            {tabConfig.map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => handleTabChange(key)}
                                    className={`relative py-4 text-sm font-medium tracking-tight flex items-center gap-2 hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer ${activeTab === key ? "text-primary" : "text-on-surface-variant"
                                        }`}
                                >
                                    <Icon className="text-base" />
                                    <span>{label}</span>
                                    {activeTab === key && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-md" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div className="mt-6">
                            <ProfileTabContent
                                activeTab={activeTab}
                                questions={userQuestions}
                                answers={userAnswers}
                                comments={userComments}
                                loading={tabLoading}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}