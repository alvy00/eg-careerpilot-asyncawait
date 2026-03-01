"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const Progress = () => {
    const { user } = useAuth();
    const interviews = [
        {
            id: 1,
            role: "Frontend Developer",
            difficulty: "Mid-Level",
            date: "12 Feb 2026",
            score: "8.5 / 10",
        },
        {
            id: 2,
            role: "Backend Engineer",
            difficulty: "Senior",
            date: "08 Feb 2026",
            score: "7.8 / 10",
        },
    ];

    const quizzes = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            type: "Quiz",
            date: "05 Feb 2026",
            score: "18 / 20",
        },
        {
            id: 2,
            title: "System Design Basics",
            type: "Challenge",
            date: "02 Feb 2026",
            score: "Completed",
        },
    ];

    const printLog = () => {
        console.log(user?.email);
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
                        <span className="text-sm text-slate-500">
                            {interviews.length} Sessions
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {interviews.map((item) => (
                            <div
                                key={item.id}
                                className="glass-panel bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {item.role}
                                        </h3>
                                        <p className="text-slate-400 text-sm mt-1">
                                            {item.difficulty} • {item.date}
                                        </p>
                                    </div>
                                    <span className="text-primary font-bold text-lg">
                                        {item.score}
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <button className="px-5 py-2 text-sm rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300">
                                        View Feedback
                                    </button>

                                    <button className="px-5 py-2 text-sm rounded-lg bg-primary/80 text-black font-medium hover:bg-primary transition-all duration-300">
                                        Retake
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={printLog}
                        className="border p-3 cursor-pointer bg-gray-500"
                    >
                        Print log
                    </button>
                </section>

                {/* ================= QUIZ & CHALLENGES HISTORY ================= */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Quizzes & Challenges
                        </h2>
                        <span className="text-sm text-slate-500">
                            {quizzes.length} Attempts
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {quizzes.map((item) => (
                            <div
                                key={item.id}
                                className="glass-panel bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm mt-1">
                                            {item.type} • {item.date}
                                        </p>
                                    </div>
                                    <span className="text-primary font-bold text-lg">
                                        {item.score}
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <button className="px-5 py-2 text-sm rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300">
                                        View Feedback
                                    </button>

                                    <button className="px-5 py-2 text-sm rounded-lg bg-primary/80 text-black font-medium hover:bg-primary transition-all duration-300">
                                        Retake
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Progress;
