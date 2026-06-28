import { useState, useEffect } from "react"
import { marked } from "marked"
import api from "./services/api"

marked.setOptions({
    breaks: true,
    gfm: true
})

function App() {
    const [problem, setProblem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [activeFeature, setActiveFeature] = useState(null)
    const [initialLoad, setInitialLoad] = useState(true)

    const features = [
        {
            id: "hint",
            label: "Hint",
            subtitle: "Get a nudge",
            icon: "💡",
            accent: "hover:border-yellow-500/50",
            endpoint: "/ai/hint"
        },
        {
            id: "debug",
            label: "Debug",
            subtitle: "Find bugs",
            icon: "🐞",
            accent: "hover:border-red-500/50",
            endpoint: "/ai/debug"
        },
        {
            id: "explain",
            label: "Explain",
            subtitle: "Understand",
            icon: "📖",
            accent: "hover:border-blue-500/50",
            endpoint: "/ai/explain"
        },
        {
            id: "complexity",
            label: "Complexity",
            subtitle: "Analyze",
            icon: "⚡",
            accent: "hover:border-purple-500/50",
            endpoint: "/ai/complexity"
        },
        {
            id: "pattern",
            label: "Pattern",
            subtitle: "Identify",
            icon: "🧠",
            accent: "hover:border-green-500/50",
            endpoint: "/ai/pattern"
        }
    ]

    const getProblem = async () => {
        try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            })

            if (!tab.url?.includes("leetcode.com/problems/")) {
                setInitialLoad(false)
                return
            }

            chrome.tabs.sendMessage(
                tab.id,
                { type: "GET_PROBLEM" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        setInitialLoad(false)
                        return
                    }

                    if (response?.success) {
                        setProblem(response.data)
                    }
                    setInitialLoad(false)
                }
            )
        } catch (error) {
            console.error("Error:", error)
            setInitialLoad(false)
        }
    }

    useEffect(() => {
        getProblem()
    }, [])

    const handleFeatureClick = async (feature) => {
        if (!problem) return

        setLoading(true)
        setActiveFeature(feature.id)
        setResult(null)

        try {
            const response = await api.post(feature.endpoint, {
                title: problem.title,
                description: problem.description,
                examples: problem.examples || "",
                constraints: problem.constraints || "",
                language: problem.language || "JavaScript",
                code: problem.code || ""
            })

            setResult(response.data.data)
        } catch (error) {
            setResult("Error: " + (error.response?.data?.message || error.message))
        } finally {
            setLoading(false)
        }
    }

    if (initialLoad) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-zinc-500 text-sm">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col bg-black">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="CodeMitra" className="w-6 h-6 rounded-lg" />
                    <span className="text-white text-sm font-semibold">CodeMitra</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                {!result && !loading && (
                    <div className="grid grid-cols-2 gap-2">
                        {features.map((feature) => (
                            <button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature)}
                                disabled={!problem}
                                className={`bg-zinc-950 border border-zinc-900 rounded-lg p-2.5 text-left transition-all duration-200 hover:bg-zinc-900 ${feature.accent} active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-950`}
                            >
                                <div className="text-xl mb-0.5">{feature.icon}</div>
                                <div className="text-white text-sm font-medium mb-0.5">{feature.label}</div>
                                <div className="text-zinc-500 text-xs">{feature.subtitle}</div>
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="bg-zinc-950 rounded-lg p-5 border border-zinc-900 text-center">
                        <div className="w-8 h-8 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-zinc-500 text-sm">Thinking<span className="animate-pulse-slow">...</span></p>
                    </div>
                )}

                {result && !loading && (
                    <div className="bg-zinc-950 rounded-lg border border-zinc-900 overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-900">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{features.find(f => f.id === activeFeature)?.icon}</span>
                                <span className="text-white text-sm font-medium">
                                    {features.find(f => f.id === activeFeature)?.label}
                                </span>
                            </div>
                            <button
                                onClick={() => { setResult(null); setActiveFeature(null); }}
                                className="text-zinc-500 hover:text-white text-xs"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-3 max-h-105ok  overflow-y-auto">
                            <div
                                className="text-xs text-white leading-relaxed prose prose-invert prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: marked(result) }}
                            />
                        </div>
                    </div>
                )}

                {!problem && !initialLoad && (
                    <div className="bg-zinc-950 rounded-lg p-6 border border-zinc-900 text-center">
                        <div className="text-3xl mb-2">👨‍💻</div>
                        <p className="text-white text-sm font-medium mb-0.5">No Problem Detected</p>
                        <p className="text-zinc-500 text-xs">Open a LeetCode problem</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
