"use client";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Progress = () => {
    const { user } = useAuth();
    const router = useRouter();

    const { data: interviews = [], isLoading } = useQuery({
        queryKey: ["interviews", user?.uid],
        queryFn: async () => {
            const res = await axios.get(`/api/interview?userId=${user?.uid}`);
            return res.data;
        },
        enabled: !!user?.uid,
    });
    //console.log(interviews);
    const handleFeedback = async (interviewId: string) => {
        router.push(`/dashboard/interview/feedback?interviewId=${interviewId}`);
    };

    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 px-6 py-16">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* ================= INTERVIEW HISTORY ================= */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Interview History
                        </h2>
                        <span className="text-sm text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {interviews?.length || 0} Sessions
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {[1, 2].map((n) => (
                                <div
                                    key={n}
                                    className="h-48 w-full bg-white/5 animate-pulse rounded-2xl border border-white/10"
                                />
                            ))}
                        </div>
                    ) : interviews.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {interviews.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-primary/5"
                                >
                                    {/* Subtle Gradient Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-semibold">
                                                        {item.roadmapSkill ||
                                                            "Interview"}
                                                    </h3>
                                                    <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                                                        {item.difficulty}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                                    {formatDate(item.createdAt)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-slate-500 block">
                                                    Questions
                                                </span>
                                                <span className="text-xl font-mono font-bold text-white">
                                                    {item.questions?.length ||
                                                        0}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mt-8">
                                            <button
                                                onClick={() =>
                                                    handleFeedback(item._id)
                                                }
                                                className="flex-1 px-5 py-2.5 text-sm rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                                            >
                                                View Feedback
                                            </button>
                                            <button className="flex-1 px-5 py-2.5 text-sm rounded-lg bg-primary text-black font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20">
                                                Retake
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                            <p className="text-slate-500">
                                No interview history yet. Start your first
                                session!
                            </p>
                        </div>
                    )}
                </section>

                {/* Quizzes Section remains as you had it... */}
            </div>
        </div>
    );
};

export default Progress;
