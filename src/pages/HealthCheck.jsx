import { useState } from "react"
import { FaHeart, FaBolt, FaCookie, FaShieldAlt } from "react-icons/fa"
import apiCall from "../services/apiCall"

export default function HealthCheck() {
    const [response, setResponse] = useState(null)
    const [requestType, setRequestType] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [statusOk, setStatusOk] = useState(null)

    const runCheck = async (label, apiFunction) => {
        setIsLoading(true)
        setRequestType(label)
        setResponse(null)
        setStatusOk(null)

        try {
            const res = await apiFunction()
            setResponse(JSON.stringify(res.data, null, 2))
            setStatusOk(true)
        } catch (ex) {
            setResponse(JSON.stringify(ex?.response?.data || ex.message || "Request failed", null, 2))
            setStatusOk(false)
        } finally {
            setIsLoading(false)
        }
    }

    const checks = [
        { label: "Health Ping", endpoint: "GET /api/v1/health", icon: FaBolt, fn: apiCall.checkHealthPing },
        { label: "Send Cookie", endpoint: "POST SET-COOKIE: corsCheck", icon: FaCookie, fn: apiCall.checkHealthSendCookie },
        { label: "CORS Check", endpoint: "GET /api/v1/health/cors", icon: FaShieldAlt, fn: apiCall.checkHealthCors },
    ]

    return (
        <main className="flex-1 h-full bg-surface p-12 overflow-y-auto w-full">
            <section className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-surface-container-low rounded-xl flex items-center justify-center text-primary">
                            <FaHeart className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">System Health Check</h1>
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${statusOk === false ? "bg-error" : "bg-primary-container"} ${statusOk !== false ? "pulse-glow" : ""}`}></span>
                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${statusOk === false ? "bg-error" : "bg-primary-container"}`}></span>
                                </span>
                                <span className={`text-sm font-bold tracking-widest uppercase ${statusOk === false ? "text-error" : "text-primary"}`}>
                                    {statusOk === false ? "Check Failed" : "All Systems Operational"}
                                </span>
                            </div>
                        </div>
                    </div>
                    {requestType && (
                        <div className="text-right">
                            <span className="block text-xs font-bold text-secondary uppercase tracking-widest mb-1">Last Check</span>
                            <span className="mono-code text-sm font-medium text-on-surface">{requestType}</span>
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    {checks.map(({ label, endpoint, icon: Icon, fn }) => (
                        <button
                            key={label}
                            onClick={() => runCheck(label, fn)}
                            disabled={isLoading}
                            className="group flex items-center justify-between p-6 bg-surface-container-high text-on-surface rounded-xl hover:bg-secondary-container transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <div className="text-left">
                                <span className="block font-bold text-lg">{label}</span>
                                <span className="text-xs text-secondary mono-code">{endpoint}</span>
                            </div>
                            <Icon className="text-xl text-primary group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </div>

                {/* Response terminal */}
                <div className="bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-zinc-900 px-6 py-3 flex items-center justify-between border-b border-zinc-800">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                            </div>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mono-code">Response Terminal</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {statusOk !== null && (
                                <span className={`text-[10px] mono-code px-2 py-0.5 rounded ${statusOk ? "text-primary bg-primary/10" : "text-error bg-error/10"}`}>
                                    {statusOk ? "200 OK" : "ERROR"}
                                </span>
                            )}
                            {isLoading && (
                                <span className="text-[10px] mono-code text-zinc-500 animate-pulse">Running...</span>
                            )}
                        </div>
                    </div>
                    <div className="p-8 mono-code text-sm leading-relaxed h-96 overflow-y-auto custom-scrollbar">
                        {isLoading ? (
                            <span className="text-zinc-500 animate-pulse">Running check...</span>
                        ) : response ? (
                            <pre className={statusOk ? "text-green-400" : "text-red-400"}>{response}</pre>
                        ) : (
                            <span className="text-zinc-600">Select a check above to run diagnostics against the backend...</span>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}