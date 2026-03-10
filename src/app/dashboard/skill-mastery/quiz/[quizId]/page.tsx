"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader } from "lucide-react";
import QuizPlayer from "@/components/SkillMastery/QuizPlayer";
import { useAuth } from "@/context/AuthContext";

export default function QuizPage() {
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();
    const quizId = params.quizId as string;

    const [quizData, setQuizData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // Get quiz data from localStorage or session
                const cachedQuiz = sessionStorage.getItem(`quiz_${quizId}`);
                if (cachedQuiz) {
                    setQuizData(JSON.parse(cachedQuiz));
                    setLoading(false);
                    return;
                }

                // If not in cache, we would need to fetch from API
                setError("Quiz data not found");
                setLoading(false);
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError("Failed to load quiz");
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleSubmit = async (answers: any[]) => {
        try {
            const response = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.email,
                    quizTemplateId: quizId,
                    topic: quizData.topic,
                    difficulty: quizData.difficulty,
                    questionCount: quizData.questions.length,
                    timeLimit: quizData.timeLimit,
                    answers,
                    submittedAt: new Date().toISOString(),
                    actualTimeSpent: (quizData.timeLimit * 60) - 0, // Calculate actual time
                    status: "completed",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit quiz");
            }

            const data = await response.json();

            if (data.success) {
                // Store attempt ID and redirect to results
                sessionStorage.setItem(`attempt_${quizId}`, JSON.stringify(data.attempt));
                router.push(`/dashboard/skill-mastery/quiz/${quizId}/results`);
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="space-y-4 text-center">
                    <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto" />
                    <p className="text-gray-400">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (error || !quizData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-red-500 font-medium">{error || "Quiz not found"}</p>
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

    return <QuizPlayer quizData={quizData} onSubmit={handleSubmit} />;
}
