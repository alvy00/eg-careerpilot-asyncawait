import React from "react";
import { ExpandableGrid } from "./components/ExpandableWrapper";
import { BookOpen, Calendar, RotateCcw, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const QuizzesHistorySection = () => {
    const router = useRouter();

    const mockQuizzes = [
        { _id: "q1", title: "Quantum Mechanics Basics", category: "Science", score: 85, totalQuestions: 15, createdAt: "2026-03-10T10:00:00Z" },
        { _id: "q2", title: "The Roman Empire: Rise & Fall", category: "History", score: 60, totalQuestions: 20, createdAt: "2026-03-12T14:30:00Z" },
        { _id: "q3", title: "Microeconomics 101", category: "Business", score: 100, totalQuestions: 10, createdAt: "2026-03-13T09:15:00Z" },
        { _id: "q4", title: "Renaissance Art History", category: "Arts", score: 40, totalQuestions: 12, createdAt: "2026-03-14T11:00:00Z" },
        { _id: "q5", title: "Stock Market Fundamentals", category: "Business", score: 90, totalQuestions: 15, createdAt: "2026-03-14T16:00:00Z" },
        { _id: "q6", title: "Human Anatomy & Physiology", category: "Science", score: 75, totalQuestions: 25, createdAt: "2026-03-15T08:00:00Z" },
    ];

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Quizzes History</h2>
                    <p className="text-xs text-muted">Track your progress and retake quizzes to improve</p>
                </div>
                <span className="text-[11px] font-medium text-muted bg-body-bg px-2.5 py-1 rounded-md border border-card-border uppercase tracking-wider">
                    {mockQuizzes.length} Completed
                </span>
            </div>

            <ExpandableGrid
                items={mockQuizzes}
                limit={3}
                emptyMessage="You haven't taken any quizzes yet."
                renderItem={(quiz: any) => {
                    const isPassed = quiz.score >= 70;
                    return (
                        <div
                            key={quiz._id}
                            className="group relative flex flex-col bg-card-bg border border-card-border rounded-2xl p-5 hover:border-primary/50 transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <h3 className="text-[15px] font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                        {quiz.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[11px] text-muted font-medium">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(quiz.createdAt)}
                                    </div>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded bg-body-bg border border-card-border text-muted font-bold uppercase tracking-tighter">
                                    {quiz.category}
                                </span>
                            </div>

                            {/* Score */}
                            <div className="flex items-end gap-3 my-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted uppercase font-bold tracking-tight mb-1">Performance</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-2xl font-mono font-bold ${isPassed ? "text-emerald-500" : "text-amber-500"}`}>
                                            {quiz.score}%
                                        </span>
                                        <div className="h-4 w-[1px] bg-card-border" />
                                        <span className="text-xs text-muted font-medium">{quiz.totalQuestions} Questions</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-card-border rounded-full overflow-hidden mb-6">
                                <div
                                    className={`h-full transition-all duration-1000 ${isPassed ? "bg-emerald-500" : "bg-amber-500"}`}
                                    style={{ width: `${quiz.score}%` }}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-card-border">
                                <button
                                    onClick={() => router.push(`/dashboard/quizzes/result/${quiz._id}`)}
                                    className="group/btn flex-1 flex items-center justify-center gap-2 text-[12px] font-bold text-foreground/70 bg-body-bg hover:bg-card-bg py-2 rounded-lg transition-all border border-card-border hover:border-primary/30 cursor-pointer"
                                >
                                    View Results
                                    <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                                </button>
                                <button
                                    className="group/retake flex items-center justify-center w-10 h-9 bg-body-bg border border-card-border rounded-lg transition-all duration-300 hover:bg-primary hover:border-primary cursor-pointer"
                                    title="Retake Quiz"
                                >
                                    <RotateCcw className="w-4 h-4 text-muted transition-all duration-500 group-hover/retake:rotate-[-360deg] group-hover/retake:text-white" />
                                </button>
                            </div>
                        </div>
                    );
                }}
            />
        </section>
    );
};

export default QuizzesHistorySection;
