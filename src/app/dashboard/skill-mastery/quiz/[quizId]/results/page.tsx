"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import ResultsDisplay from "@/components/SkillMastery/ResultsDisplay";

export default function ResultsPage() {
    const router = useRouter();
    const params = useParams();
    const quizId = params.quizId as string;

    const [attempt, setAttempt] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Get results from sessionStorage
                const cachedAttempt = sessionStorage.getItem(`attempt_${quizId}`);
                if (cachedAttempt) {
                    setAttempt(JSON.parse(cachedAttempt));
                    setLoading(false);
                    return;
                }

                setError("Results not found");
                setLoading(false);
            } catch (err) {
                console.error("Error fetching results:", err);
                setError("Failed to load results");
                setLoading(false);
            }
        };

        fetchResults();
    }, [quizId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="space-y-4 text-center">
                    <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto" />
                    <p className="text-gray-400">Loading results...</p>
                </div>
            </div>
        );
    }

    if (error || !attempt) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-red-500 font-medium">{error || "Results not found"}</p>
                    <button
                        onClick={() => router.push("/dashboard/skill-mastery")}
                        className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition"
                    >
                        Back to Skill Mastery
                    </button>
                </div>
            </div>
        );
    }

    return (
        <ResultsDisplay
            score={attempt.score}
            topic={attempt.topic}
            difficulty={attempt.difficulty}
            categoryPerformance={attempt.categoryWisePerformance || {}}
            insights={attempt.insights || { strengths: [], weaknesses: [], recommendedTopics: [] }}
            feedback={attempt.feedback || ""}
            level={attempt.userLevelAfter || "Beginner"}
        />
    );
}
